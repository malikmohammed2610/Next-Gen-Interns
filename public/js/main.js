(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Subtle pointer parallax for the decorative hero illustration.
  const visual = document.querySelector(".hero-visual");
  const panel = document.querySelector(".panel-main");
  if (visual && panel && window.matchMedia("(pointer:fine)").matches) {
    visual.addEventListener("pointermove", (event) => {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      panel.style.transform = `rotateY(${-13 + x * 7}deg) rotateX(${7 - y * 5}deg)`;
    });
    visual.addEventListener("pointerleave", () => {
      panel.style.transform = "";
    });
  }
})();
