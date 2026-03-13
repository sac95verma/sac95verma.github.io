/* ==========================================================================
   js/nav.js — Section navigation, tab switching, URL hash routing
   Terminal Portfolio — Sachin Verma

   NOTE: Number key shortcuts (1-5) were intentionally removed — they
   interfere with typing commands in the terminal input bar.
   Navigation is handled via: tab clicks, mobile nav, and terminal commands.
   ========================================================================== */

const SECTIONS = ['about', 'experience', 'skills', 'education', 'contact'];

/**
 * Activate a section by id.
 * Handles tab highlights, section visibility, and URL hash.
 */
function showSection(id) {
  if (!SECTIONS.includes(id)) return;

  // Update section visibility
  SECTIONS.forEach((s) => {
    const el = document.getElementById('section-' + s);
    if (el) el.classList.toggle('is-active', s === id);
  });

  // Update desktop tabs
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.section === id);
  });

  // Update mobile nav
  document.querySelectorAll('.mobile-nav__btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.section === id);
  });

  // Update URL hash
  history.replaceState(null, '', '#' + id);

  // Trigger skill bars if navigating to skills
  if (id === 'skills') {
    requestAnimationFrame(() => animateSkillBars());
  }

  // Scroll content area back to top
  const content = document.getElementById('screen-content');
  if (content) content.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Init — bind click handlers and handle initial hash.
 */
function initNav() {
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => showSection(tab.dataset.section));
  });

  document.querySelectorAll('.mobile-nav__btn').forEach((btn) => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  // Hash-based routing on load
  const hash = window.location.hash.replace('#', '');
  if (SECTIONS.includes(hash)) {
    showSection(hash);
  }
}