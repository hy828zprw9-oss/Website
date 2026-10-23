(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const M = window.Motion;
  const motionOn = root.classList.contains("has-motion") && M && !reduceMotion.matches;
  if (!motionOn) root.classList.remove("has-motion");

  // Handy-Menü: Vollbild unter der Leiste, Escape oder Link schließt, der Rest der Seite ist solange inert.
  const header = document.querySelector(".nav");
  const toggle = header && header.querySelector(".nav__toggle");
  if (toggle) {
    const menu = header.querySelector("nav");
    const outside = [document.querySelector("main"), document.querySelector(".foot")];
    const isOpen = () => header.classList.contains("is-open");
    const setOpen = (open, moveFocus = true) => {
      header.classList.toggle("is-open", open);
      root.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      for (const el of outside) if (el) el.inert = open;
      if (moveFocus) (open ? menu.querySelector("a") : toggle).focus();
    };
    toggle.addEventListener("click", () => setOpen(!isOpen()));
    menu.addEventListener("click", (event) => {
      if (isOpen() && event.target.closest("a")) setOpen(false, false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) setOpen(false);
    });
    window.matchMedia("(min-width: 48.0625rem)").addEventListener("change", (event) => {
      if (event.matches && isOpen()) setOpen(false, false);
    });
  }

  // Startszene. Mit 3D (assets/js/truck3d.js) kommt der Actros aus der Ferne auf den Betrachter
  // zu, die Kamera geht um ihn herum, dann fährt er davon. Ohne WebGL löst sich der freigestellte
  // LKW aus der Reihe auf dem Hof-Foto.
  const scene = document.querySelector(".scene");
  const sceneOn = motionOn && scene;
  const bindScene = (el, keyframes, times) => {
    if (!el) return null;
    const options = { ease: "linear", duration: 1 };
    if (times) options.times = times;
    return M.scroll(M.animate(el, keyframes, options), { target: scene, offset: ["start start", "end end"] });
  };

  const textBindings = [];
  const bindSceneText = (road) => {
    while (textBindings.length) textBindings.pop()?.();
    textBindings.push(bindScene(scene.querySelector(".scene__copy"), {
      opacity: [1, 1, 0, 0],
      transform: ["translateY(0)", "translateY(0)", "translateY(-6vh)", "translateY(-6vh)"],
    }, road ? [0, 0.03, 0.2, 1] : [0, 0.06, 0.28, 1]));
    // Mit 3D kommt der Satz, wenn der LKW anfährt (ab 50 % der Szene).
    textBindings.push(bindScene(scene.querySelector(".scene__claim"), {
      opacity: [0, 0, 1, 1, 1],
      transform: ["translateY(3vh)", "translateY(3vh)", "translateY(0)", "translateY(0)", "translateY(-2vh)"],
    }, road ? [0, 0.56, 0.7, 0.96, 1] : [0, 0.36, 0.5, 0.9, 1]));
  };

  const bindPhotoScene = () => {
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

    bindScene(photo, { transform: ["scale(1)", "scale(1.12)"] });

    let truckScroll;
    const bindTruck = () => {
      if (truckScroll) truckScroll();
      const p = startPose();
      const at = (f) => `translate(${(p.x * (1 - f)).toFixed(1)}px, ${(p.y * (1 - f)).toFixed(1)}px) scale(${(p.scale + (1 - p.scale) * f).toFixed(3)})`;
      truckScroll = bindScene(truck, {
        opacity: [0, 1, 1, 1, 1],
        transform: [at(0), at(0), at(0.55), at(1), "translate(0px, 75vh) scale(2.7)"],
        filter: ["blur(1px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(3px)"],
      }, [0, 0.1, 0.4, 0.66, 1]);
    };
    const img = photo.querySelector("img");
    if (img.complete && img.naturalWidth) bindTruck(); else img.addEventListener("load", bindTruck, { once: true });
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(bindTruck, 150);
    });
  };

  // Fällt WebGL doch aus, übernimmt die Foto-Szene.
  const fallBackToPhoto = (error) => {
    if (!root.classList.contains("has-3d")) return;
    console.warn("SPN road: 3D unavailable, using the photo scene", error);
    root.classList.remove("has-3d");
    if (sceneOn) {
      bindSceneText(false);
      bindPhotoScene();
    }
  };

  const with3d = root.classList.contains("has-3d");
  if (sceneOn) bindSceneText(with3d);
  if (with3d) {
    import("./assets/js/truck3d.js")
      .then((road) => road.mountRoad({ onFail: fallBackToPhoto }))
      .catch(fallBackToPhoto);
  } else if (sceneOn) {
    bindPhotoScene();
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

  // Scroll-Kino. Überschriften steigen beim ersten Erscheinen aus einer leichten Unschärfe,
  // die Fotos bekommen je eine Kamerabewegung, die zu ihrem Motiv passt.
  if (motionOn) {
    const linked = (el, keyframes, target, offset) => {
      if (!el) return;
      M.scroll(M.animate(el, keyframes, { ease: "linear", duration: 1 }), { target: target || el, offset });
    };

    const rising = [];
    const rise = (el, delay = 0) => {
      if (!el) return;
      el.classList.add("rise");
      if (delay) el.style.setProperty("--rise-delay", `${delay}ms`);
      rising.push(el);
    };
    document.querySelectorAll(".section-title").forEach((title) => {
      rise(title);
      rise(title.querySelector("span"), 120);
    });
    rise(document.querySelector(".about__lead"));
    document.querySelectorAll(".checks li").forEach((item, i) => rise(item, 70 * i));
    rise(document.querySelector(".contact__phone"));
    rise(document.querySelector(".contact__mail"), 90);
    // A nested span rises with its title, so only top-level risers are tracked. Checked per
    // scroll frame rather than with an IntersectionObserver: a fast fling or an anchor jump can
    // carry an element past the viewport between two frames, and it must still end up shown.
    let pending = rising.filter((el) => !el.parentElement.closest(".rise"));
    root.classList.add("rise-ready");
    let queued = false;
    const reveal = () => {
      queued = false;
      const line = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > line) return true;
        el.classList.add("is-in");
        return false;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(reveal);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reveal();

    // Nahverkehr: die Kamera fährt an der Reihe entlang, während die Karte durchs Bild läuft.
    const cardPhoto = document.querySelector(".card__img");
    linked(cardPhoto, { transform: ["scale(1.16) translateX(3%)", "scale(1.04) translateX(-3%)"] },
      cardPhoto && cardPhoto.closest(".card"), ["start end", "end start"]);

    // Fuhrpark: das Bild öffnet sich aus einem Breitbild-Ausschnitt auf volle Größe.
    const fleetFrame = document.querySelector(".fleet__hero");
    linked(fleetFrame, { clipPath: ["inset(7% 10% 7% 10% round 1.75rem)", "inset(0% 0% 0% 0% round 1.75rem)"] },
      fleetFrame, ["start end", "center center"]);
    linked(fleetFrame && fleetFrame.querySelector("img"), { transform: ["scale(1.22)", "scale(1)"] },
      fleetFrame, ["start end", "center center"]);

    // Die beiden Porträts kippen aus der Perspektive in die Ebene, das zweite einen Takt später.
    document.querySelectorAll(".fleet__pair figure").forEach((figure, i) => {
      linked(figure, {
        transform: [
          "perspective(1200px) rotateX(14deg) translateY(9%) scale(0.95)",
          "perspective(1200px) rotateX(0deg) translateY(0%) scale(1)",
        ],
      }, figure, ["start end", i ? "start 42%" : "start 55%"]);
    });
  }

  // Leistungskarten folgen dem Zeiger mit einer kleinen Neigung (nur Maus/Trackpad).
  const tiltGroup = document.querySelector("[data-tilt]");
  if (motionOn && tiltGroup && window.matchMedia("(pointer: fine)").matches) {
    for (const card of tiltGroup.querySelectorAll(".card")) {
      card.addEventListener("pointermove", (event) => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        card.classList.add("is-tilting");
        card.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    }
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
