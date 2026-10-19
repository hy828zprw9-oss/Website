(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const M = window.Motion;
  const motionOn = root.classList.contains("has-motion") && M && !reduceMotion.matches;
  if (!motionOn) root.classList.remove("has-motion");

  // Startszene: der LKW löst sich aus der Reihe und fährt auf den Betrachter zu
  const scene = document.querySelector(".scene");
  if (motionOn && scene) {
    const { animate, scroll } = M;
    const bind = (el, keyframes, times) => {
      if (!el) return;
      const options = { ease: "linear", duration: 1 };
      if (times) options.times = times;
      scroll(animate(el, keyframes, options), { target: scene, offset: ["start start", "end end"] });
    };

    const photo = scene.querySelector(".scene__photo");
    const truck = scene.querySelector(".scene__truck");

    // Startpunkt des LKW: vor der Reihe auf dem Hof-Foto (Punkt im Foto, 1440 × 1080)
    const START_POINT = { x: 905, y: 760, truckHeight: 300 };
    const startPose = () => {
      const img = photo.querySelector("img");
      const box = photo.getBoundingClientRect();
      const stage = scene.querySelector(".scene__stage").getBoundingClientRect();
      const iw = img.naturalWidth || 1440;
      const ih = img.naturalHeight || 1080;
      const s = Math.max(box.width / iw, box.height / ih);
      const [px, py] = getComputedStyle(img).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
      const pointX = box.left - stage.left + (box.width - iw * s) * px + START_POINT.x * (iw / 1440) * s;
      const pointY = box.top - stage.top + (box.height - ih * s) * py + START_POINT.y * (ih / 1080) * s;
      const w = truck.offsetWidth;
      const h = truck.offsetHeight;
      const baseX = truck.offsetLeft + w / 2;
      const baseY = truck.offsetTop + h;
      return {
        x: pointX - baseX,
        y: pointY - baseY,
        scale: Math.min(0.6, (START_POINT.truckHeight * (ih / 1080) * s) / h),
      };
    };

    bind(photo, { transform: ["scale(1)", "scale(1.12)"] });

    bind(scene.querySelector(".scene__copy"), {
      opacity: [1, 1, 0, 0],
      transform: ["translateY(0)", "translateY(0)", "translateY(-6vh)", "translateY(-6vh)"],
    }, [0, 0.06, 0.28, 1]);

    let truckScroll;
    const bindTruck = () => {
      if (truckScroll) truckScroll();
      const p = startPose();
      const at = (f) => `translate(${(p.x * (1 - f)).toFixed(1)}px, ${(p.y * (1 - f)).toFixed(1)}px) scale(${(p.scale + (1 - p.scale) * f).toFixed(3)})`;
      const anim = animate(truck, {
        opacity: [0, 1, 1, 1, 1],
        transform: [at(0), at(0), at(0.55), at(1), "translate(0px, 75vh) scale(2.7)"],
        filter: ["blur(1px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(3px)"],
      }, { ease: "linear", duration: 1, times: [0, 0.1, 0.4, 0.66, 1] });
      truckScroll = scroll(anim, { target: scene, offset: ["start start", "end end"] });
    };
    const img = photo.querySelector("img");
    if (img.complete) bindTruck(); else img.addEventListener("load", bindTruck, { once: true });
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(bindTruck, 150);
    });

    bind(scene.querySelector(".scene__claim"), {
      opacity: [0, 0, 1, 1, 1],
      transform: ["translateY(3vh)", "translateY(3vh)", "translateY(0)", "translateY(0)", "translateY(-2vh)"],
    }, [0, 0.36, 0.5, 0.9, 1]);
  }

  // Aussage: Wörter werden beim Scrollen hell
  const statement = document.querySelector("[data-reveal]");
  if (motionOn && statement) {
    const words = statement.textContent.trim().split(/\s+/);
    statement.textContent = "";
    const spans = words.map((word, i) => {
      const span = document.createElement("span");
      span.className = "w";
      span.textContent = word;
      statement.append(span, i < words.length - 1 ? " " : "");
      return span;
    });
    M.scroll((progress) => {
      const lit = Math.round(progress * spans.length);
      spans.forEach((span, i) => span.classList.toggle("is-on", i < lit));
    }, { target: statement, offset: ["start 0.8", "end 0.45"] });
  }

  // Fuhrpark-Foto zoomt beim Hereinscrollen leicht heraus
  const fleetImg = document.querySelector(".fleet__hero img");
  if (motionOn && fleetImg) {
    M.scroll(
      M.animate(fleetImg, { transform: ["scale(1.18)", "scale(1)"] }, { ease: "linear", duration: 1 }),
      { target: fleetImg.parentElement, offset: ["start end", "end end"] }
    );
  }

  // Pendelverkehr läuft nur, solange er zu sehen ist
  const shuttle = document.querySelector(".shuttle");
  if (shuttle && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      for (const entry of entries) shuttle.classList.toggle("is-running", entry.isIntersecting);
    }, { threshold: 0.4 }).observe(shuttle);
  }

  // Anfrage: fertige E-Mail im Mailprogramm öffnen
  const form = document.getElementById("anfrage");
  if (form) {
    const fields = [
      [form.elements.name, document.getElementById("f-name-err")],
      [form.elements.msg, document.getElementById("f-msg-err")],
    ];

    const check = (input, err) => {
      const ok = input.value.trim() !== "";
      input.setAttribute("aria-invalid", ok ? "false" : "true");
      err.hidden = ok;
      return ok;
    };

    for (const [input, err] of fields) {
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") check(input, err);
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const invalid = fields.filter(([input, err]) => !check(input, err));
      if (invalid.length) {
        invalid[0][0].focus();
        return;
      }
      const name = form.elements.name.value.trim();
      const tel = form.elements.tel.value.trim();
      const msg = form.elements.msg.value.trim();
      const body = [msg, "", `Name/Firma: ${name}`, tel ? `Rückruf: ${tel}` : ""]
        .filter((line, i, all) => line !== "" || i < all.length - 1)
        .join("\n");
      const subject = `Transportanfrage von ${name}`;
      window.location.href =
        `mailto:spn-transporte@t-online.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
