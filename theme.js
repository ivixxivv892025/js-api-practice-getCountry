// theme.js — only handles theme toggle & persistence (no fetch logic)
(function () {
  const body = document.body;
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const label = document.getElementById("themeLabel");

  // Determine initial theme:
  // - if user preference saved in localStorage: use it
  // - otherwise, use system preference
  function getInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("light"); // light styles assigned when .light on body
      toggle.setAttribute("aria-pressed", "true");
      icon.textContent = "☀️";
      label.textContent = "Light";
    } else {
      body.classList.remove("light");
      toggle.setAttribute("aria-pressed", "false");
      icon.textContent = "🌙";
      label.textContent = "Dark";
    }
  }

  // initialize
  const current = getInitialTheme();
  applyTheme(current);

  // toggle handler
  toggle.addEventListener("click", () => {
    const now = body.classList.contains("light") ? "dark" : "light";
    localStorage.setItem("theme", now);
    applyTheme(now);
  });

  // Optional: respond to system changes if user hasn't explicitly chosen
  window.matchMedia &&
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches ? "light" : "dark");
        }
      });
})();
