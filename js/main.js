/* ==========================================================================
   js/main.js — Application entry point
   Orchestrates: boot → render → nav → terminal input
   Terminal Portfolio — Sachin Verma
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    const bootContainer = document.getElementById('boot-container');
    const aboutContent  = document.getElementById('about-hero-content');
    const welcomeBanner = document.getElementById('term-welcome-banner');

    /* 1. Render all section HTML from RESUME data ────────────────────────── */
    renderAll(RESUME);

    /* 2. Boot sequence → reveal about → show welcome banner ──────────────── */
    runBootSequence(bootContainer, function () {
      bootContainer.style.display = 'none';

      aboutContent.style.display   = 'block';
      aboutContent.style.animation = 'fadeIn 0.5s ease';

      // Show the one-time welcome hint in the input bar
      if (welcomeBanner) {
        welcomeBanner.style.display = 'block';
        // Fade out after 8 s so it doesn't clutter the UI forever
        setTimeout(() => {
          welcomeBanner.style.transition = 'opacity 1s ease';
          welcomeBanner.style.opacity    = '0';
          setTimeout(() => { welcomeBanner.style.display = 'none'; }, 1000);
        }, 8000);
      }

      // Init terminal input after boot so it doesn't steal focus during boot
      TerminalInput.init();
    });

    /* 3. Init navigation (tabs + mobile nav + hash routing) ──────────────── */
    initNav();

    /* 4. Patch showSection to also update the prompt path + TerminalInput ── */
    const _originalShowSection = showSection;
    window.showSection = function (id) {
      _originalShowSection(id);
      updatePromptPath(id);
      TerminalInput.updateSection(id);
    };

    /* 5. Titlebar live clock ─────────────────────────────────────────────── */
    updateClock();
    setInterval(updateClock, 1000);
  });

  /* ── Helpers ───────────────────────────────────────────────────────────── */

  function updateClock() {
    const el = document.getElementById('titlebar-time');
    if (!el) return;
    el.textContent = new Date().toTimeString().slice(0, 8);
  }

  function updatePromptPath(section) {
    const pathEl = document.getElementById('input-path');
    if (pathEl) pathEl.textContent = '~/' + section;
  }

})();