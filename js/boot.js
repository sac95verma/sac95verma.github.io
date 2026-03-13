/* ==========================================================================
   js/boot.js — Boot sequence animation
   Terminal Portfolio — Sachin Verma
   ========================================================================== */

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 — Sachin Systems Corp.  [x86_64]',   cls: 'boot-line--info',  delay: 0   },
  { text: 'RAM: 32768 MB OK                                ',  cls: 'boot-line--ok',   delay: 80  },
  { text: 'Initializing storage devices...',                   cls: 'boot-line--info',  delay: 160 },
  { text: '  [  OK  ] /dev/nvme0 — 1TB SSD',                 cls: 'boot-line--ok',   delay: 240 },
  { text: 'Loading kernel modules...',                         cls: 'boot-line--info',  delay: 360 },
  { text: '  [  OK  ] Loaded: typescript.ko          [v5.x]', cls: 'boot-line--ok',   delay: 440 },
  { text: '  [  OK  ] Loaded: python3.ko             [v3.12]',cls: 'boot-line--ok',   delay: 510 },
  { text: '  [  OK  ] Loaded: golang.ko              [v1.22]',cls: 'boot-line--ok',   delay: 580 },
  { text: '  [  OK  ] Loaded: aws-sdk.ko',                    cls: 'boot-line--ok',   delay: 650 },
  { text: '  [  OK  ] Loaded: openai.ko',                     cls: 'boot-line--ok',   delay: 720 },
  { text: '  [ WARN ] Legacy module: php7.ko — deprecated',   cls: 'boot-line--warn', delay: 800 },
  { text: 'Mounting filesystems...',                           cls: 'boot-line--info',  delay: 900 },
  { text: '  [  OK  ] /dev/experience     mounted  [rw]',     cls: 'boot-line--ok',   delay: 970 },
  { text: '  [  OK  ] /dev/skills         mounted  [rw]',     cls: 'boot-line--ok',   delay: 1040},
  { text: '  [  OK  ] /dev/projects       mounted  [rw]',     cls: 'boot-line--ok',   delay: 1110},
  { text: 'Starting network services...',                      cls: 'boot-line--info',  delay: 1220},
  { text: '  [  OK  ] Payment gateway     ONLINE   [$100M+/mo]',cls:'boot-line--ok',  delay: 1300},
  { text: '  [  OK  ] AI inference node   ONLINE',            cls: 'boot-line--ok',   delay: 1370},
  { text: '  [  OK  ] Monitoring (Datadog)ONLINE',            cls: 'boot-line--ok',   delay: 1440},
  { text: ' ',                                                  cls: 'boot-line--dim',  delay: 1540},
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',cls: 'boot-line--dim',  delay: 1580},
  { text: '  Welcome to portfolio.sh  v1.0.0',                cls: 'boot-line--info',  delay: 1620},
  { text: '  User: sachin_verma        Auth: ✓ GRANTED',      cls: 'boot-line--ok',   delay: 1700},
  { text: '  Session: ' + new Date().toISOString().slice(0,19).replace('T', ' '), cls: 'boot-line--dim', delay: 1760 },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',cls: 'boot-line--dim',  delay: 1820},
  { text: ' ',                                                  cls: '',                delay: 1860},
];

const BOOT_DONE_DELAY = 2100;

/**
 * Runs the boot animation, then calls onComplete.
 * @param {HTMLElement} container - element to append boot lines into
 * @param {Function}    onComplete
 */
function runBootSequence(container, onComplete) {
  BOOT_LINES.forEach((line) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'boot-line ' + (line.cls || '');
      el.textContent = line.text || '\u00A0';
      container.appendChild(el);
      // auto-scroll to bottom
      container.scrollTop = container.scrollHeight;
    }, line.delay);
  });

  setTimeout(onComplete, BOOT_DONE_DELAY);
}