/* ==========================================================================
   js/render.js — Renders all sections from RESUME data object
   Terminal Portfolio — Sachin Verma
   ========================================================================== */

/* ── Prompt helper ────────────────────────────────────────────────────────── */
function buildPrompt(path, cmd) {
  return `
    <div class="prompt-line">
      <span class="p-user">sachin</span><span class="p-at">@</span><span class="p-host">portfolio</span><span class="p-colon">:</span><span class="p-path">${path}</span><span class="p-dollar">$</span>
      <span class="p-cmd">${cmd}</span>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   ABOUT
   ══════════════════════════════════════════════════════════════════════════ */
function renderAbout(data) {
  const { personal, stats, summary } = data;

  const statsHtml = stats.map(s => `
    <div class="stat-card">
      <div class="stat-card__num">${s.num}</div>
      <div class="stat-card__label">${s.label}</div>
    </div>`).join('');

  const infoRows = [
    { key: 'location', val: personal.location },
    { key: 'email',    val: `<a href="mailto:${personal.email}">${personal.email}</a>` },
    { key: 'status',   val: `<span class="text-green">●</span> ${personal.status}` },
    { key: 'linkedin', val: `<a href="${personal.linkedinUrl}" target="_blank" rel="noopener">${personal.linkedin}</a>` },
    { key: 'phone',    val: personal.phone },
    { key: 'domains',  val: personal.domains.join(' · ') },
  ].map(r => `
    <div class="info-row">
      <span class="info-key">${r.key}</span>
      <span class="info-val">${r.val}</span>
    </div>`).join('');

  const lsItems = ['experience/', 'skills/', 'education/', 'contact/']
    .map(i => `<span class="ls-output__item">📁 ${i}</span>`).join('');

  return `
    ${buildPrompt('~', 'whoami --verbose')}

    <div class="cmd-output">
      <div class="hero__name">${personal.name}</div>
      <div class="hero__title">// ${personal.title.toUpperCase()} //</div>

      <div class="stats-grid">${statsHtml}</div>

      <div class="info-grid">${infoRows}</div>

      <div class="summary-box">${summary}</div>

      <hr class="divider" />

      ${buildPrompt('~', 'ls sections/')}
      <div class="ls-output">${lsItems}</div>

      <div class="prompt-line" style="margin-top:var(--space-4)">
        <span class="p-user">sachin</span><span class="p-at">@</span><span class="p-host">portfolio</span><span class="p-colon">:</span><span class="p-path">~</span><span class="p-dollar"> $ </span><span class="cursor"></span>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   EXPERIENCE
   ══════════════════════════════════════════════════════════════════════════ */
function renderExperience(data) {
  const jobs = data.experience.map(job => {
    const bullets = job.bullets.map(b => `<li>${b}</li>`).join('');
    const tags    = job.stack.map(t => `<span class="tag">${t}</span>`).join('');
    const noteHtml = job.note ? `<span class="job-company__note">(${job.note})</span>` : '';

    return `
      <div class="job-entry">
        <div class="job-header">
          <div>
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company} ${noteHtml}</div>
          </div>
          <div class="job-date">${job.start} — ${job.end}</div>
        </div>
        <ul class="job-bullets">${bullets}</ul>
        <div class="tag-list">${tags}</div>
      </div>`;
  }).join('');

  return `
    ${buildPrompt('~/experience', 'cat jobs.log | sort -r')}
    <div class="cmd-output">
      <div class="section-header">Work History</div>
      <div class="job-list">${jobs}</div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   SKILLS
   ══════════════════════════════════════════════════════════════════════════ */
function renderSkills(data) {
  const groups = data.skills.map(group => {
    const items = group.items.map(item => `
      <div class="skill-item">
        <span class="skill-item__name">${item.name}</span>
        <div class="skill-bar">
          <div class="skill-bar__fill" data-width="${item.pct}"></div>
        </div>
        <span class="skill-bar__pct">${item.pct}%</span>
      </div>`).join('');

    return `
      <div class="skill-group">
        <div class="skill-group__title">${group.group}</div>
        ${items}
      </div>`;
  }).join('');

  const domainTags = data.domains.map(d =>
    `<span class="tag tag--domain">${d}</span>`
  ).join('');

  return `
    ${buildPrompt('~/skills', 'cat /proc/skills | grep -E "level|stack"')}
    <div class="cmd-output">
      <div class="section-header">Technical Arsenal</div>
      <div class="skills-grid">${groups}</div>
      <hr class="divider" />
      <div class="section-header">Domain Expertise</div>
      <div class="tag-list">${domainTags}</div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   EDUCATION
   ══════════════════════════════════════════════════════════════════════════ */
function renderEducation(data) {
  const entries = data.education.map(edu => `
    <div class="edu-entry">
      <div>
        <div class="edu-entry__degree">${edu.degree}</div>
        <div class="edu-entry__school">${edu.school}</div>
        ${edu.note ? `<div class="edu-entry__note">${edu.note}</div>` : ''}
      </div>
      <div class="edu-entry__date">${edu.start} — ${edu.end}</div>
    </div>`).join('');

  return `
    ${buildPrompt('~/education', 'cat credentials.json | jq .')}
    <div class="cmd-output">
      <div class="section-header">Academic Background</div>
      <div class="edu-list">${entries}</div>
      <hr class="divider" />
      <p class="text-muted text-sm" style="line-height:1.9">
        <span class="text-green">// </span>
        Fun fact: DTU was formerly Delhi College of Engineering (DCE), one of India's premier engineering institutions.
      </p>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   CONTACT
   ══════════════════════════════════════════════════════════════════════════ */
function renderContact(data) {
  const { personal } = data;
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

  const cards = [
    { icon: '📧', label: 'EMAIL',     value: personal.email,      href: 'mailto:' + personal.email },
    { icon: '🔗', label: 'LINKEDIN',  value: personal.linkedin,   href: personal.linkedinUrl },
    { icon: '📱', label: 'PHONE',     value: personal.phone,      href: 'tel:' + personal.phone.replace(/\s/g,'') },
    { icon: '💬', label: 'WHATSAPP',  value: personal.whatsapp,   href: personal.whatsappUrl },
    { icon: '📍', label: 'LOCATION',  value: personal.location,   href: null },
  ].map(c => c.href
    ? `<a class="contact-card" href="${c.href}" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
         <div class="contact-card__icon">${c.icon}</div>
         <div><div class="contact-card__label">${c.label}</div><div class="contact-card__value">${c.value}</div></div>
       </a>`
    : `<div class="contact-card">
         <div class="contact-card__icon">${c.icon}</div>
         <div><div class="contact-card__label">${c.label}</div><div class="contact-card__value">${c.value}</div></div>
       </div>`
  ).join('');

  return `
    ${buildPrompt('~/contact', 'ping sachin --all-channels')}
    <div class="cmd-output">
      <div class="section-header">Establish Connection</div>
      <div class="contact-grid">${cards}</div>
      <hr class="divider" />
      <div class="ping-output">
        <span class="ok">PING</span> sachin.verma (${personal.email}): 56 data bytes<br>
        64 bytes: icmp_seq=0 ttl=64 time=<span class="ok">1ms</span><br>
        <span class="ok">// Response guaranteed within 24 hours</span><br>
        <span class="text-muted">// Session: ${timestamp}</span>
      </div>
      <div class="prompt-line" style="margin-top:var(--space-5)">
        <span class="p-user">sachin</span><span class="p-at">@</span><span class="p-host">portfolio</span><span class="p-colon">:</span><span class="p-path">~/contact</span><span class="p-dollar"> $ </span><span class="cursor"></span>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN RENDER
   ══════════════════════════════════════════════════════════════════════════ */
function renderAll(resume) {
  const map = {
    'section-about':      renderAbout(resume),
    'section-experience': renderExperience(resume),
    'section-skills':     renderSkills(resume),
    'section-education':  renderEducation(resume),
    'section-contact':    renderContact(resume),
  };

  Object.entries(map).forEach(([id, html]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}