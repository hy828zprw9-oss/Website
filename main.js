(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Startbereich: Zugmaschine fährt in die Spur ein
  const heroTruck = document.querySelector(".lane__truck");
  if (heroTruck && window.Motion && !reduceMotion.matches) {
    window.Motion.animate(
      heroTruck,
      { x: ["-115%", "0%"] },
      { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
    );
  }

  // Strecke: der LKW folgt dem Leser und hält an der Haltelinie vor dem Kontakt
  const route = document.querySelector(".route");
  const road = document.querySelector(".road");
  const truck = document.querySelector(".road__truck");
  const contact = document.getElementById("kontakt");
  if (route && road && truck && contact) {
    let minY = 0;
    let maxY = 0;
    let truckL = 0;
    let current = 0;
    let target = 0;
    let frame = 0;

    const measure = () => {
      truckL = truck.getBoundingClientRect().height;
      const stop = contact.offsetTop + 24;
      road.style.setProperty("--stop", `${stop}px`);
      minY = 24;
      maxY = Math.max(minY, stop - truckL - 14);
    };

    const targetFromScroll = () => {
      const routeTop = route.getBoundingClientRect().top + window.scrollY;
      const y = window.scrollY + window.innerHeight * 0.5 - routeTop - truckL / 2;
      return Math.min(maxY, Math.max(minY, y));
    };

    const paint = (y) => truck.style.setProperty("--y", `${y.toFixed(1)}px`);

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.5) {
        current = target;
        paint(current);
        frame = 0;
        return;
      }
      current += delta * 0.09;
      paint(current);
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = targetFromScroll();
      if (reduceMotion.matches) {
        current = target;
        paint(current);
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      target = targetFromScroll();
      current = target;
      paint(current);
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts && document.fonts.ready.then(onResize);
  }

  // Pendelverkehr läuft nur, solange er zu sehen ist
  const shuttle = document.querySelector(".shuttle");
  if (shuttle && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      for (const entry of entries) {
        shuttle.classList.toggle("is-running", entry.isIntersecting);
      }
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
