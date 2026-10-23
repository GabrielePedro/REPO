
document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.querySelector("#site-header");
  if (!headerContainer) return;

  try {
    const response = await fetch("components/header.html");

    if (!response.ok) {
      throw new Error(`Erro ao carregar o header: ${response.status}`);
    }

    headerContainer.innerHTML = await response.text();

    const nav = headerContainer.querySelector(".header-nav");
    if (!nav) return;

    const links = [...nav.querySelectorAll("a")];

    // Identifica a página atual.
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    links.forEach((link) => {
      const linkPage =
        new URL(link.href, window.location.href).pathname.split("/").pop() ||
        "index.html";

      const active = linkPage === currentPage;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Cria uma única barra animada para todos os links.
    const indicator = document.createElement("span");
    indicator.className = "nav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.appendChild(indicator);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationTimer;
    let navigationTimer;

    function positionIndicator(link, animate = true) {
      if (!link) return;

      const left = link.offsetLeft;
      const width = link.offsetWidth;

      if (!animate || reducedMotion) {
        indicator.style.transition = "none";
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;

        requestAnimationFrame(() => {
          indicator.style.removeProperty("transition");
        });

        return;
      }

      indicator.style.left = `${left}px`;
      indicator.style.width = `${width}px`;
    }

    // Posiciona a barra no link ativo ao carregar a página.
    positionIndicator(nav.querySelector("a.active"), false);

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        // Preserva os comportamentos nativos, como abrir em nova aba.
        if (
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0 ||
          link.target === "_blank" ||
          link.hasAttribute("download")
        ) {
          return;
        }

        const current = nav.querySelector("a.active");

        // Não anima novamente se o link já estiver ativo.
        if (!current || current === link) return;

        const currentLeft = current.offsetLeft;
        const currentWidth = current.offsetWidth;
        const targetLeft = link.offsetLeft;
        const targetWidth = link.offsetWidth;

        clearTimeout(animationTimer);
        clearTimeout(navigationTimer);

        // Atualiza o destaque do texto imediatamente.
        links.forEach((item) => {
          item.classList.remove("active");
          item.removeAttribute("aria-current");
        });

        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        // Com movimento reduzido, navega sem animação.
        if (reducedMotion) {
          window.location.href = link.href;
          return;
        }

        // Animação: a barra se estende e depois se ajusta
        // à largura do novo link.
        if (targetLeft > currentLeft) {
          // Indo para a direita.
          indicator.style.left = `${currentLeft}px`;
          indicator.style.width =
            `${targetLeft + targetWidth - currentLeft}px`;

          animationTimer = setTimeout(() => {
            indicator.style.left = `${targetLeft}px`;
            indicator.style.width = `${targetWidth}px`;
          }, 175);
        } else {
          // Indo para a esquerda.
          indicator.style.left = `${targetLeft}px`;
          indicator.style.width =
            `${currentLeft + currentWidth - targetLeft}px`;

          animationTimer = setTimeout(() => {
            indicator.style.width = `${targetWidth}px`;
          }, 175);
        }

        // Aguarda a animação antes de trocar de página.
        event.preventDefault();

        navigationTimer = setTimeout(() => {
          window.location.href = link.href;
        }, 390);
      });
    });

    // Reposiciona a barra quando a janela muda de tamanho.
    window.addEventListener("resize", () => {
      clearTimeout(animationTimer);
      positionIndicator(nav.querySelector("a.active"), false);
    });
  } catch (error) {
    console.error("Não foi possível carregar o header:", error);
  }
});
