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

    // Startpunkt des LKW: unten in der Reihe auf dem Foto
    const small = window.matchMedia("(max-width: 48rem)").matches;
    const startY = small ? "-17vh" : "-24vh";
    const startScale = small ? 0.3 : 0.24;

    bind(scene.querySelector(".scene__photo"), {
      transform: ["scale(1)", "scale(1.14)"],
      filter: ["brightness(0.95)", "brightness(0.55)", "brightness(0.3)"],
    });

    bind(scene.querySelector(".scene__copy"), {
      opacity: [1, 1, 0, 0],
      transform: ["translateY(0)", "translateY(0)", "translateY(-6vh)", "translateY(-6vh)"],
    }, [0, 0.06, 0.28, 1]);

    bind(scene.querySelector(".scene__truck"), {
      opacity: [0, 1, 1, 1, 0],
      transform: [
        `translateY(${startY}) scale(${startScale})`,
        `translateY(${startY}) scale(${startScale})`,
        "translateY(-8vh) scale(0.72)",
        "translateY(0vh) scale(1)",
        "translateY(30vh) scale(1.9)",
      ],
      filter: ["blur(2px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(6px)"],
    }, [0, 0.1, 0.4, 0.66, 1]);

    bind(scene.querySelector(".scene__claim"), {
      opacity: [0, 0, 1, 1, 0],
      transform: ["translateY(3vh)", "translateY(3vh)", "translateY(0)", "translateY(0)", "translateY(-3vh)"],
    }, [0, 0.36, 0.5, 0.84, 0.96]);
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
