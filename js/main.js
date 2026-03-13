/* ==========================================================================
   js/main.js — Application entry point, orchestrates boot + render + nav
   Terminal Portfolio — Sachin Verma
   ========================================================================== */

(function () {
  'use strict';

  /* ── DOM ready ──────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    const bootContainer  = document.getElementById('boot-container');
    const aboutContent   = document.getElementById('about-hero-content');

    /* 1. Render all section HTML from data */
    renderAll(RESUME);

    /* 2. Run boot sequence, then reveal about content */
    runBootSequence(bootContainer, function () {
      bootContainer.style.display = 'none';
      aboutContent.style.display  = 'block';
      aboutContent.style.animation = 'fadeIn 0.5s ease';
    });

    /* 3. Init navigation */
    initNav();

    /* 4. Keyboard shortcut: number keys 1–5 switch sections */
    document.addEventListener('keydown', function (e) {
      const map = { '1': 'about', '2': 'experience', '3': 'skills', '4': 'education', '5': 'contact' };
      if (map[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
        showSection(map[e.key]);
      }
    });

    /* 5. Update titlebar clock */
    updateClock();
    setInterval(updateClock, 1000);
  });

  function updateClock() {
    const el = document.getElementById('titlebar-time');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toTimeString().slice(0, 8);
  }

})();