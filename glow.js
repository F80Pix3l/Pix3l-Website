/* ── PIX3L GLOWING BORDER EFFECT — glow.js ── */
(function () {
  'use strict';

  const SELECTORS = [
    '.product-card',
    '.service-card',
    '.agent-card',
    '.agent-portrait',
    '.feature-card',
    '.pricing-card',
    '.pipeline-card',
    '.stat-card',
    '.workflow-card',
    '.tech-chip',
    '.cap-card',
    '.lifecycle-step',
    '.agent-thumb',
    '.agent-avatar-img',
    '.aix-card',
    '.principle-card',
    '.step-card',
    '.capture-card',
    '.invoice-mockup',
    '.cta-box',
    '.portrait-ring',
    '.mockup-shell',
  ];

  function fixImageContainerRadius(card) {
    // When the card switches to overflow:visible, inner image containers
    // need their own border-radius to maintain rounded corners on images.
    if (card.classList.contains('product-card')) {
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

    var pos = getComputedStyle(card).position;
    if (pos === 'static') card.style.position = 'relative';

    fixImageContainerRadius(card);

    var glow = document.createElement('div');
    glow.className = 'pix3l-glow';
    glow.setAttribute('aria-hidden', 'true');
    card.insertBefore(glow, card.firstChild);

    // Smooth angle tracking — lerp toward target each animation frame
    // (mirrors Aceternity's motion/animate but in vanilla JS)
    var currentAngle = 0;
    var targetAngle  = 0;
    var isHovered    = false;
    var rafId        = null;

    // Return the shortest angular path to avoid wrap-around spinning
    function shortestDest(from, to) {
      var diff = ((to - from) % 360 + 540) % 360 - 180;
      return from + diff;
    }

    function tick() {
      if (!isHovered) { rafId = null; return; }

      var dest = shortestDest(currentAngle, targetAngle);
      currentAngle += (dest - currentAngle) * 0.09;   // lerp — lower = smoother chase
      glow.style.setProperty('--glow-start', currentAngle.toFixed(2));

      if (Math.abs(dest - currentAngle) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentAngle = targetAngle % 360;
        glow.style.setProperty('--glow-start', currentAngle.toFixed(2));
        rafId = null;
      }
    }

    function updateAngle(e) {
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width  / 2;
      var cy = rect.top  + rect.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      // +90 so angle 0 = top, matching CSS conic-gradient convention
      targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      if (!rafId && isHovered) {
        rafId = requestAnimationFrame(tick);
      }
    }

    card.addEventListener('mouseenter', function (e) {
      isHovered = true;
      glow.classList.add('glow-visible');
      updateAngle(e);
    });

    card.addEventListener('mousemove', updateAngle);

    card.addEventListener('mouseleave', function () {
      isHovered = false;
      glow.classList.remove('glow-visible');
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
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
