/* ══════════════════════════════════════════════════════════════════
   PIX3L — THEME.JS
   Shared theme toggle logic. Call window.initTheme(updateNavFn)
   after the page's own updateNav is defined.
══════════════════════════════════════════════════════════════════ */
(function () {
  window.initTheme = function (updateNavFn) {
    var toggle   = document.getElementById('theme-toggle');
    var iconSun  = document.getElementById('icon-sun');
    var iconMoon = document.getElementById('icon-moon');
    var html     = document.documentElement;

    if (!toggle) return;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('pix3l-theme', theme);
      if (theme === 'light') {
        if (iconSun)  iconSun.style.display  = 'none';
        if (iconMoon) iconMoon.style.display = '';
        toggle.setAttribute('aria-label', 'Switch to dark mode');
      } else {
        if (iconSun)  iconSun.style.display  = '';
        if (iconMoon) iconMoon.style.display = 'none';
        toggle.setAttribute('aria-label', 'Switch to light mode');
      }
      if (updateNavFn) updateNavFn();
    }

    toggle.addEventListener('click', function () {
      applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });

    // Load saved preference (default: dark)
    applyTheme(localStorage.getItem('pix3l-theme') || 'dark');
  };
}());
