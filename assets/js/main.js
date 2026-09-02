const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  revealObserver.observe(el);
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

const path = location.pathname.replace(/index\.html$/, "");
document.querySelectorAll(".nav a[data-path]").forEach((link) => {
  const target = link.dataset.path;
  const isHome = target === "/" && (path === "/" || path === "");
  if (isHome || (target !== "/" && path.startsWith(target))) {
    link.classList.add("active");
  }
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.classList.add("copied");
      setTimeout(() => button.classList.remove("copied"), 1800);
    } catch {
      window.getSelection().selectAllChildren(button.querySelector(".email-value"));
    }
  });
});

const themeButtons = document.querySelectorAll(".theme-switch button[data-theme-set]");
const syncThemeButtons = () => {
  const current = document.documentElement.dataset.theme;
  themeButtons.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.themeSet === current)));
};
themeButtons.forEach((b) => {
  b.addEventListener("click", () => {
    document.documentElement.dataset.theme = b.dataset.themeSet;
    try { localStorage.setItem("theme", b.dataset.themeSet); } catch {}
    syncThemeButtons();
  });
});
syncThemeButtons();
