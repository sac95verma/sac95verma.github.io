/* ==========================================================================
   js/skills.js — Skill bar fill animation & intersection observer
   Terminal Portfolio — Sachin Verma
   ========================================================================== */

/**
 * Animate all .skill-bar__fill elements to their data-width value.
 * Called whenever the skills section becomes visible.
 */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-bar__fill');
  fills.forEach((fill, i) => {
    const target = fill.dataset.width || '0';
    // Stagger each bar slightly
    setTimeout(() => {
      fill.style.width = target + '%';
    }, i * 55);
  });
}

/**
 * Reset skill bars (called when leaving skills section so
 * they re-animate on next visit).
 */
function resetSkillBars() {
  document.querySelectorAll('.skill-bar__fill').forEach((fill) => {
    fill.style.width = '0%';
  });
}