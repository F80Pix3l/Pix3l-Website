/* ── PIX3L GLOWING BORDER EFFECT — glow.js ── */
(function () {
  'use strict';

  const SELECTORS = [
    '.product-card',
    '.service-card',
    '.agent-card',
    '.feature-card',
    '.pricing-card',
    '.pipeline-card',
    '.stat-card',
    '.workflow-card',
    '.tech-chip',
  ];

  function fixImageContainerRadius(card) {
    // When the card switches to overflow:visible, inner image containers
    // need their own border-radius to maintain rounded corners on images.
    if (card.classList.contains('product-card')) {
      // First child div is the image area (h-44)
      var imgDiv = card.querySelector('.h-44');
      if (imgDiv) {
        imgDiv.style.borderRadius = '17px 17px 0 0';
        imgDiv.style.overflow = 'hidden';
      }
    } else if (card.classList.contains('agent-card')) {
      var wrap = card.querySelector('.agent-img-wrap');
      if (wrap) {
        wrap.style.borderRadius = '17px 17px 0 0';
        wrap.style.overflow = 'hidden';
      }
    }
  }

  function initCard(card) {
    if (card.dataset.glowInit) return;
    card.dataset.glowInit = '1';

    // Ensure the card has position so absolute children work
    var pos = getComputedStyle(card).position;
    if (pos === 'static') card.style.position = 'relative';

    // Fix inner image container clipping before overflow changes
    fixImageContainerRadius(card);

    // Insert glow element as first child
    var glow = document.createElement('div');
    glow.className = 'pix3l-glow';
    glow.setAttribute('aria-hidden', 'true');
    card.insertBefore(glow, card.firstChild);

    var rafId = null;
    var cursorX = 0;
    var cursorY = 0;

    function applyGlow() {
      var rect = card.getBoundingClientRect();

      // Cursor as % within the card
      var px = ((cursorX - rect.left) / rect.width) * 100;
      var py = ((cursorY - rect.top) / rect.height) * 100;

      // Angle from card center to cursor (controls arc position)
      var dx = cursorX - (rect.left + rect.width / 2);
      var dy = cursorY - (rect.top + rect.height / 2);
      var angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);

      glow.style.setProperty('--glow-x', px.toFixed(2) + '%');
      glow.style.setProperty('--glow-y', py.toFixed(2) + '%');
      glow.style.setProperty('--glow-start', angleDeg.toFixed(2) + 'deg');

      rafId = null;
    }

    card.addEventListener('mouseenter', function (e) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      glow.classList.add('glow-visible');
      if (!rafId) rafId = requestAnimationFrame(applyGlow);
    });

    card.addEventListener('mousemove', function (e) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(applyGlow);
    });

    card.addEventListener('mouseleave', function () {
      glow.classList.remove('glow-visible');
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  }

  function init() {
    document.querySelectorAll(SELECTORS.join(',')).forEach(initCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
