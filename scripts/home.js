/* =========================================
   HOME — SISTEMA DE ANIMAÇÕES
   ========================================= */

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion) {
  // Entradas de conteúdo durante o scroll
  const revealElements = document.querySelectorAll(
    ".banner-meta, .contact-buttons, .case-row, .work-top, .work-card"
  );

  revealElements.forEach((element) => {
    element.setAttribute("data-reveal", "");
  });

  // Alvos visuais: retrato do banner e imagens dos cases em destaque
  const imageRevealElements = document.querySelectorAll(
    ".banner--home .hero-image, .cases-section .case-hero"
  );

  imageRevealElements.forEach((element, index) => {
    element.setAttribute("data-image-reveal", "");
    element.style.setProperty("--image-reveal-delay", `${index * 100}ms`);
  });

  // Ativa o sistema de animações apenas quando o JS está pronto
  document.body.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document
    .querySelectorAll("[data-reveal], [data-image-reveal]")
    .forEach((element) => observer.observe(element));

  // Título: entrada por linha, em vez de palavra por palavra
  const heroLines = document.querySelectorAll(".banner--home .hero-line");

  heroLines.forEach((line, index) => {
    line.style.setProperty("--hero-line-delay", `${180 + index * 90}ms`);
    window.setTimeout(() => line.classList.add("is-visible"), 180 + index * 90);
  });
}

/* =========================================
   ASTERISCO QUE SEGUE O CURSOR
   ========================================= */

const customCursor = document.querySelector(".custom-cursor");

const supportsFinePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (customCursor && supportsFinePointer && !reduceMotion) {
  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let animationFrame = null;

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    mouseX = event.clientX;
    mouseY = event.clientY;
    customCursor.classList.add("is-active");

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(updateCursor);
    }
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    customCursor.style.transform = `
      translate3d(${cursorX}px, ${cursorY}px, 0)
      translate(-50%, -50%)
    `;

    const distance = Math.hypot(mouseX - cursorX, mouseY - cursorY);

    if (distance > 0.5) {
      animationFrame = requestAnimationFrame(updateCursor);
    } else {
      animationFrame = null;
    }
  }

  const interactiveElements = document.querySelectorAll(
    "a, button, [role='button'], .contact-button, .case-hero"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("pointerenter", () => {
      customCursor.classList.add("is-hovering");
    });

    element.addEventListener("pointerleave", () => {
      customCursor.classList.remove("is-hovering");
    });
  });

  document.addEventListener("pointerleave", () => {
    customCursor.classList.remove("is-active");
  });

  document.addEventListener("pointerenter", () => {
    if (mouseX >= 0 && mouseY >= 0) {
      customCursor.classList.add("is-active");
    }
  });
}
