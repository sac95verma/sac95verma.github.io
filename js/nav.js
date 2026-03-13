/* ==========================================================================
   js/nav.js — Section navigation, tab switching, URL hash routing
   Terminal Portfolio — Sachin Verma
   ========================================================================== */

const SECTIONS = ['about', 'experience', 'skills', 'education', 'contact'];

/**
 * Activate a section by id.
 * Handles tab highlights, section visibility, and URL hash.
 */
function showSection(id) {
  if (!SECTIONS.includes(id)) return;

  // Update sections
  SECTIONS.forEach((s) => {
    const el = document.getElementById('section-' + s);
    if (el) el.classList.toggle('is-active', s === id);
  });

  // Update desktop tabs
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.section === id);
  });

  // Update mobile nav buttons
  document.querySelectorAll('.mobile-nav__btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.section === id);
  });

  // Update URL hash (without scrolling)
  history.replaceState(null, '', '#' + id);

  // Trigger section-specific side-effects
  if (id === 'skills') {
    requestAnimationFrame(() => animateSkillBars());
  }

  // Scroll to top of screen
  const screen = document.querySelector('.screen');
  if (screen) screen.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Initialise nav — bind click handlers and handle initial hash.
 */
function initNav() {
  // Desktop tab clicks
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => showSection(tab.dataset.section));
  });

  // Mobile nav clicks
  document.querySelectorAll('.mobile-nav__btn').forEach((btn) => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  // Hash-based routing on load
  const hash = window.location.hash.replace('#', '');
  if (SECTIONS.includes(hash)) {
    showSection(hash);
  }
}