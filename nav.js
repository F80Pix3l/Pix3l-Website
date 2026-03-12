/* ══════════════════════════════════════════════════════
   PIX3L — NAV.JS
   Shared navigation behaviour for all pages.
   Requires theme.js to be loaded before this file.
   Does NOT include scroll-reveal — that differs per page.
══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Navbar scroll transparency + subnav reveal ── */
  var nav    = document.getElementById('navbar');
  var subnav = document.getElementById('subnav');

  function updateNav() {
    var isLight  = document.documentElement.getAttribute('data-theme') === 'light';
    var scrolled = window.scrollY > 64;
    if (subnav) { subnav.classList.toggle('subnav-visible', scrolled); }
    if (scrolled) {
      nav.style.cssText = isLight
        ? 'background:rgba(242,239,255,0.95);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);box-shadow:0 8px 32px rgba(161,0,255,0.08),0 2px 8px rgba(0,0,0,0.08);'
        : 'background:rgba(0,4,22,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 8px 32px rgba(0,0,0,0.3),0 2px 8px rgba(0,4,22,0.25);';
    } else {
      nav.style.cssText = 'background:transparent;';
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  if (window.initTheme) { window.initTheme(updateNav); } else { updateNav(); }

  /* ── Mobile hamburger menu ── */
  var hamburger = document.getElementById('hamburger');
  var drawer    = document.getElementById('mobile-drawer');
  var h1 = document.getElementById('h1');
  var h2 = document.getElementById('h2');
  var h3 = document.getElementById('h3');
  var menuOpen = false;

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      menuOpen = !menuOpen;
      hamburger.setAttribute('aria-expanded', menuOpen);
      drawer.classList.toggle('hidden', !menuOpen);
      drawer.classList.toggle('flex',   menuOpen);
      if (h1) h1.style.transform = menuOpen ? 'rotate(45deg) translate(4px,4px)'  : '';
      if (h2) h2.style.opacity   = menuOpen ? '0' : '1';
      if (h3) h3.style.transform = menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : '';
    });

    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuOpen = false;
        hamburger.setAttribute('aria-expanded', false);
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
        if (h1) h1.style.transform = '';
        if (h2) h2.style.opacity = '1';
        if (h3) h3.style.transform = '';
      });
    });
  }

  /* ── Subnav active section tracking ── */
  var subnavLinks = document.querySelectorAll('.subnav-link[href^="#"]');
  if (subnavLinks.length > 0) {
    subnavLinks[0].classList.add('active');
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          subnavLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0, rootMargin: '-60px 0px -65% 0px' });

    subnavLinks.forEach(function (l) {
      var el = document.getElementById(l.getAttribute('href').slice(1));
      if (el) { sectionObserver.observe(el); }
    });
  }
}());
