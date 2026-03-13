/* ==========================================================================
   js/terminal-input.js — Interactive command-line interpreter
   Terminal Portfolio — Sachin Verma

   Supported commands:
     help                    — show available commands
     ls / ls sections/       — list sections
     cd <section>            — navigate to section
     cat <section>           — same as cd (read a section)
     whoami                  — go to about
     clear / cls             — clear command history
     pwd                     — print working directory
     echo <text>             — echo back text
     skills                  — go to skills section
     history                 — show command history
     uname                   — system info
     uptime                  — session uptime
   ========================================================================== */

const TerminalInput = (function () {
  'use strict';

  /* ── State ──────────────────────────────────────────────────────────────── */
  const state = {
    history:      [],   // command history
    historyIndex: -1,   // for ↑↓ navigation
    currentSection: 'about',
    sessionStart: Date.now(),
  };

  /* ── Section aliases ────────────────────────────────────────────────────── */
  const SECTION_ALIASES = {
    about:      'about',
    home:       'about',
    whoami:     'about',
    '~':        'about',
    experience: 'experience',
    exp:        'experience',
    work:       'experience',
    jobs:       'experience',
    history:    'experience',
    skills:     'skills',
    skill:      'skills',
    stack:      'skills',
    tech:       'skills',
    education:  'education',
    edu:        'education',
    school:     'education',
    contact:    'contact',
    ping:       'contact',
    email:      'contact',
    connect:    'contact',
  };

  const ALL_SECTIONS = ['about', 'experience', 'skills', 'education', 'contact'];

  /* ── Responses ──────────────────────────────────────────────────────────── */
  const RESPONSES = {

    help: () => `
<div class="term-output term-output--info">
  <div class="term-table-title">Available commands</div>
  <div class="term-table">
    <div class="term-row"><span class="term-cmd-name">help</span><span class="term-cmd-desc">Show this help message</span></div>
    <div class="term-row"><span class="term-cmd-name">ls</span><span class="term-cmd-desc">List available sections</span></div>
    <div class="term-row"><span class="term-cmd-name">cd &lt;section&gt;</span><span class="term-cmd-desc">Navigate to a section</span></div>
    <div class="term-row"><span class="term-cmd-name">cat &lt;section&gt;</span><span class="term-cmd-desc">Read a section (alias for cd)</span></div>
    <div class="term-row"><span class="term-cmd-name">whoami</span><span class="term-cmd-desc">Show profile / about</span></div>
    <div class="term-row"><span class="term-cmd-name">skills</span><span class="term-cmd-desc">Jump to skills & tech stack</span></div>
    <div class="term-row"><span class="term-cmd-name">pwd</span><span class="term-cmd-desc">Print current section path</span></div>
    <div class="term-row"><span class="term-cmd-name">echo &lt;text&gt;</span><span class="term-cmd-desc">Echo text to terminal</span></div>
    <div class="term-row"><span class="term-cmd-name">uname</span><span class="term-cmd-desc">Show system information</span></div>
    <div class="term-row"><span class="term-cmd-name">uptime</span><span class="term-cmd-desc">Show session uptime</span></div>
    <div class="term-row"><span class="term-cmd-name">history</span><span class="term-cmd-desc">Show command history</span></div>
    <div class="term-row"><span class="term-cmd-name">clear</span><span class="term-cmd-desc">Clear the command history</span></div>
  </div>
  <div class="term-hint">💡 Tip: Use ↑ / ↓ to navigate command history. Tab to autocomplete.</div>
</div>`,

    ls: (args) => {
      const target = (args[0] || '').replace(/\/$/, '');
      if (target && target !== 'sections' && target !== '~' && target !== '.') {
        const section = SECTION_ALIASES[target];
        if (!section) return RESPONSES.error(`ls: cannot access '${target}': No such file or directory`);
      }
      return `
<div class="term-output term-output--success">
  <div class="term-ls-grid">
    <span class="term-ls-dir" data-section="about">about/</span>
    <span class="term-ls-dir" data-section="experience">experience/</span>
    <span class="term-ls-dir" data-section="skills">skills/</span>
    <span class="term-ls-dir" data-section="education">education/</span>
    <span class="term-ls-dir" data-section="contact">contact/</span>
  </div>
  <div class="term-hint">Click a directory or type <span class="term-inline-cmd">cd &lt;name&gt;</span> to navigate</div>
</div>`;
    },

    cd: (args, raw) => {
      if (!args[0]) {
        showSection('about');
        state.currentSection = 'about';
        return `<div class="term-output term-output--success">Navigated to <span class="text-amber">~/about</span></div>`;
      }
      const target = args[0].replace(/\//g, '').toLowerCase();
      const section = SECTION_ALIASES[target];
      if (!section) {
        return RESPONSES.error(`cd: no such directory: ${args[0]}\nType <span class="term-inline-cmd">ls</span> to see available sections`);
      }
      showSection(section);
      state.currentSection = section;
      return `<div class="term-output term-output--success">Navigated to <span class="text-amber">~/${section}</span></div>`;
    },

    cat: (args) => {
      if (!args[0]) return RESPONSES.error('cat: missing operand\nUsage: cat &lt;section&gt;');
      return RESPONSES.cd(args);
    },

    whoami: () => {
      showSection('about');
      state.currentSection = 'about';
      return `<div class="term-output term-output--success">
  <span class="text-green font-semi">sachin_verma</span> — Senior Software Engineer<br>
  <span class="text-muted">Dubai, UAE · FinTech · Healthcare · AI</span>
</div>`;
    },

    skills: () => {
      showSection('skills');
      state.currentSection = 'skills';
      return `<div class="term-output term-output--success">Loading <span class="text-amber">~/skills</span>...</div>`;
    },

    pwd: () => {
      return `<div class="term-output term-output--success">/home/sachin/${state.currentSection}</div>`;
    },

    echo: (args) => {
      const text = args.join(' ');
      if (!text) return `<div class="term-output"></div>`;
      return `<div class="term-output term-output--echo">${escapeHtml(text)}</div>`;
    },

    uname: (args) => {
      const full = args.includes('-a') || args.includes('--all');
      return `<div class="term-output term-output--info">
  SachinOS 8.0.0-LTS ${full ? '#1 SMP Thu Jan 1 00:00:00 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux' : ''}
  <br><span class="text-muted">Built on: TypeScript · Python · Golang · NodeJS</span>
  <br><span class="text-muted">Cloud:    AWS · Azure · GCP</span>
</div>`;
    },

    uptime: () => {
      const elapsed = Math.floor((Date.now() - state.sessionStart) / 1000);
      const mins  = Math.floor(elapsed / 60);
      const secs  = elapsed % 60;
      const now   = new Date().toTimeString().slice(0, 8);
      return `<div class="term-output term-output--info">
  ${now} up ${mins}m ${secs}s,  1 user,  load average: 0.42, 0.87, 0.99
</div>`;
    },

    history: (args, raw, cmdHistory) => {
      if (!cmdHistory.length) {
        return `<div class="term-output term-output--info text-muted">No commands in history yet.</div>`;
      }
      const lines = cmdHistory.map((cmd, i) =>
        `<div class="term-hist-row"><span class="term-hist-num">${String(i + 1).padStart(3, ' ')}</span>  ${escapeHtml(cmd)}</div>`
      ).join('');
      return `<div class="term-output term-output--info"><div class="term-hist">${lines}</div></div>`;
    },

    clear: () => '__CLEAR__',

    cls: () => '__CLEAR__',

    // Easter eggs
    sudo: (args) => {
      return `<div class="term-output term-output--warn">
  <span class="text-amber">sachin is not in the sudoers file. This incident will be reported.</span><br>
  <span class="text-muted">Just kidding. But there's nothing to sudo here 😄</span>
</div>`;
    },

    vim: () => `<div class="term-output term-output--warn">
  <span class="text-amber">Opening vim...</span><br>
  <span class="text-muted">Just kidding. Please don't trap yourself. Type <span class="term-inline-cmd">:q!</span> to escape... wait, you can't.</span>
</div>`,

    git: (args) => {
      if (args[0] === 'log') return `<div class="term-output term-output--info">
  <span class="text-amber">commit a8f3d21</span> (HEAD -> main)<br>
  Author: Sachin Verma &lt;sac95verma@gmail.com&gt;<br>
  Date:   Present<br><br>
  <span class="text-primary">&nbsp;&nbsp;&nbsp;&nbsp;feat: architected $100M/mo payment system at Stitch Money</span>
</div>`;
      return `<div class="term-output term-output--info">
  On branch: <span class="text-green">main</span><br>
  <span class="text-muted">Try: git log</span>
</div>`;
    },

    exit: () => `<div class="term-output term-output--warn">
  <span class="text-amber">There is no escape from this portfolio.</span><br>
  <span class="text-muted">Type <span class="term-inline-cmd">help</span> to see what you can do here.</span>
</div>`,

    error: (msg) => `<div class="term-output term-output--error">
  <span class="term-error-icon">✖</span> ${msg}
</div>`,

    unknown: (cmd) => `<div class="term-output term-output--error">
  <span class="term-error-icon">✖</span> command not found: <span class="text-white">${escapeHtml(cmd)}</span><br>
  <span class="text-muted">Type <span class="term-inline-cmd">help</span> to see available commands, or <span class="term-inline-cmd">ls</span> to list sections.</span>
</div>`,
  };

  /* ── Autocomplete ───────────────────────────────────────────────────────── */
  const ALL_COMMANDS = [
    'help', 'ls', 'cd', 'cat', 'whoami', 'skills', 'pwd',
    'echo', 'uname', 'uptime', 'history', 'clear', 'cls',
    'sudo', 'vim', 'git', 'exit',
    ...ALL_SECTIONS,
    ...ALL_SECTIONS.map(s => s + '/'),
  ];

  function autocomplete(partial) {
    if (!partial) return null;
    const lower = partial.toLowerCase();
    const matches = ALL_COMMANDS.filter(c => c.startsWith(lower));
    if (matches.length === 1) return matches[0];
    if (matches.length > 1)  return matches; // return array for display
    return null;
  }

  /* ── Parse & dispatch ───────────────────────────────────────────────────── */
  function dispatch(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return null;

    // Record in state history
    if (state.history[state.history.length - 1] !== trimmed) {
      state.history.push(trimmed);
    }
    state.historyIndex = -1;

    const parts = trimmed.split(/\s+/);
    const cmd   = parts[0].toLowerCase();
    const args  = parts.slice(1);

    // Dispatch
    if (cmd === 'ls')      return RESPONSES.ls(args);
    if (cmd === 'cd')      return RESPONSES.cd(args, trimmed);
    if (cmd === 'cat')     return RESPONSES.cat(args);
    if (cmd === 'whoami')  return RESPONSES.whoami();
    if (cmd === 'skills')  return RESPONSES.skills();
    if (cmd === 'pwd')     return RESPONSES.pwd();
    if (cmd === 'echo')    return RESPONSES.echo(args);
    if (cmd === 'uname')   return RESPONSES.uname(args);
    if (cmd === 'uptime')  return RESPONSES.uptime();
    if (cmd === 'help')    return RESPONSES.help();
    if (cmd === 'history') return RESPONSES.history(args, trimmed, [...state.history]);
    if (cmd === 'clear' || cmd === 'cls') return RESPONSES.clear();
    if (cmd === 'sudo')    return RESPONSES.sudo(args);
    if (cmd === 'vim' || cmd === 'nano' || cmd === 'emacs') return RESPONSES.vim();
    if (cmd === 'git')     return RESPONSES.git(args);
    if (cmd === 'exit' || cmd === 'quit' || cmd === 'logout') return RESPONSES.exit();

    // Try as a bare section name
    if (SECTION_ALIASES[cmd]) {
      return RESPONSES.cd([cmd]);
    }

    return RESPONSES.unknown(cmd);
  }

  /* ── HTML escape helper ─────────────────────────────────────────────────── */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Build history entry DOM ────────────────────────────────────────────── */
  function buildHistoryEntry(cmd, outputHtml, section) {
    const div = document.createElement('div');
    div.className = 'term-history-entry';
    div.innerHTML = `
      <div class="prompt-line">
        <span class="p-user">sachin</span><span class="p-at">@</span><span class="p-host">portfolio</span><span class="p-colon">:</span><span class="p-path">~/${section}</span><span class="p-dollar">$</span>
        <span class="p-cmd">${escapeHtml(cmd)}</span>
      </div>
      ${outputHtml || ''}`;
    return div;
  }

  /* ── Init ───────────────────────────────────────────────────────────────── */
  function init() {
    const inputEl     = document.getElementById('term-input');
    const historyWrap = document.getElementById('term-history');
    const inputLine   = document.getElementById('term-input-line');
    const autocompleteHint = document.getElementById('term-autocomplete-hint');

    if (!inputEl) return;

    // Focus terminal on click anywhere in screen
    document.querySelector('.screen').addEventListener('click', () => {
      inputEl.focus();
    });

    // Autofocus
    setTimeout(() => inputEl.focus(), 2200);

    /* ── Keydown handler ──────────────────────────────────────────────────── */
    inputEl.addEventListener('keydown', function (e) {

      // ── ENTER: run command ─────────────────────────────────────────────
      if (e.key === 'Enter') {
        const raw = inputEl.value;
        inputEl.value = '';
        if (autocompleteHint) autocompleteHint.textContent = '';

        const sectionAtCmd = state.currentSection;
        const result = dispatch(raw.trim());

        if (result === null) return; // empty input

        if (result === '__CLEAR__') {
          // Clear all history entries
          historyWrap.innerHTML = '';
          return;
        }

        // Append entry to history display
        const entry = buildHistoryEntry(raw, result, sectionAtCmd);
        historyWrap.appendChild(entry);

        // Bind ls directory clicks
        entry.querySelectorAll('.term-ls-dir').forEach(dir => {
          dir.addEventListener('click', () => {
            const sec = dir.dataset.section;
            inputEl.value = 'cd ' + sec;
            inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          });
        });

        // Scroll to bottom
        scrollToBottom();
        return;
      }

      // ── TAB: autocomplete ──────────────────────────────────────────────
      if (e.key === 'Tab') {
        e.preventDefault();
        const val = inputEl.value.trim();
        if (!val) return;

        const parts = val.split(/\s+/);

        if (parts.length === 1) {
          // completing a command
          const result = autocomplete(parts[0]);
          if (typeof result === 'string') {
            inputEl.value = result + ' ';
            if (autocompleteHint) autocompleteHint.textContent = '';
          } else if (Array.isArray(result)) {
            if (autocompleteHint) {
              autocompleteHint.textContent = result.join('  ');
            }
          }
        } else if (parts.length === 2 && (parts[0] === 'cd' || parts[0] === 'cat')) {
          // completing a section name after cd/cat
          const result = autocomplete(parts[1]);
          if (typeof result === 'string') {
            inputEl.value = parts[0] + ' ' + result.replace('/', '');
            if (autocompleteHint) autocompleteHint.textContent = '';
          }
        }
        return;
      }

      // ── ARROW UP: previous command ─────────────────────────────────────
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!state.history.length) return;
        if (state.historyIndex === -1) state.historyIndex = state.history.length - 1;
        else if (state.historyIndex > 0) state.historyIndex--;
        inputEl.value = state.history[state.historyIndex];
        // Move cursor to end
        setTimeout(() => inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length), 0);
        return;
      }

      // ── ARROW DOWN: next command ───────────────────────────────────────
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.historyIndex === -1) return;
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          inputEl.value = state.history[state.historyIndex];
        } else {
          state.historyIndex = -1;
          inputEl.value = '';
        }
        return;
      }

      // ── ESC: clear input ───────────────────────────────────────────────
      if (e.key === 'Escape') {
        inputEl.value = '';
        if (autocompleteHint) autocompleteHint.textContent = '';
        state.historyIndex = -1;
        return;
      }

      // Clear autocomplete hint on any other key
      if (autocompleteHint) autocompleteHint.textContent = '';
    });

    /* ── Live autocomplete hint as user types ─────────────────────────────── */
    inputEl.addEventListener('input', function () {
      if (!autocompleteHint) return;
      const val = inputEl.value;
      if (!val.trim()) { autocompleteHint.textContent = ''; return; }

      const parts = val.split(/\s+/);
      let hint = '';

      if (parts.length === 1) {
        const r = autocomplete(parts[0]);
        if (typeof r === 'string' && r !== parts[0]) {
          hint = r.slice(parts[0].length); // show only the suffix
        }
      }
      autocompleteHint.textContent = hint;
    });
  }

  function scrollToBottom() {
    const histWrap = document.getElementById('term-input-area');
    if (histWrap) histWrap.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  /* ── Public API ──────────────────────────────────────────────────────────── */
  return { init, updateSection: (s) => { state.currentSection = s; } };

})();