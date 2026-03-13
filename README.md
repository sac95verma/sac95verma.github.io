# sachin-portfolio

> Terminal-themed personal portfolio & resume — built for GitHub Pages.

Live: `https://<your-github-username>.github.io/<repo-name>`

---

## Repository Structure

```
sachin-portfolio/
├── index.html              ← Entry point
│
├── css/
│   ├── theme.css           ← Design tokens (CSS variables — edit colours/fonts here)
│   ├── base.css            ← Reset, global styles, CRT effects, animations
│   ├── terminal.css        ← Terminal window, titlebar, screen, nav tabs
│   ├── components.css      ← All UI components (cards, tags, skill bars, jobs…)
│   └── mobile-nav.css      ← Bottom nav for small screens
│
├── js/
│   ├── boot.js             ← Boot sequence animation lines & runner
│   ├── nav.js              ← Section switching, tab highlights, URL hash routing
│   ├── skills.js           ← Skill bar fill animation
│   ├── render.js           ← Renders all section HTML from RESUME data
│   └── main.js             ← App entry point — wires everything together
│
├── data/
│   └── resume.js           ← ✏️  ALL resume content lives here — edit this file
│
└── README.md
```

---

## Deploying to GitHub Pages

### Option A — Root of repo (simplest)

1. Copy all files to the root of your repo.
2. Go to **Settings → Pages → Source** → select `main` branch, `/ (root)`.
3. Click **Save**. Your site will be live at `https://<username>.github.io/<repo>`.

### Option B — `/docs` folder

1. Put everything inside a `/docs` folder.
2. In Pages settings, choose source: `main` branch, `/docs` folder.

---

## Customising Content

All resume data is in **`data/resume.js`** — edit the `RESUME` object:

| Key           | What it controls                          |
|---------------|-------------------------------------------|
| `personal`    | Name, title, location, email, phone, etc. |
| `summary`     | The about-me paragraph (supports HTML)    |
| `stats`       | The 4 headline numbers at the top         |
| `experience`  | Work history — array of job objects       |
| `skills`      | Skill groups + proficiency percentages    |
| `domains`     | Domain expertise tags in skills section   |
| `education`   | Degrees / schools                         |

---

## Customising Theme

Edit **`css/theme.css`** CSS variables:

```css
--green:   #00ff41;   /* primary accent */
--cyan:    #00e5ff;   /* secondary accent */
--amber:   #ffb000;   /* tertiary / company names */
--bg-base: #070b07;   /* page background */
```

To switch to an **amber terminal** theme, change:
```css
--green:      #ffb000;
--green-dim:  #cc8c00;
--green-dark: #3b2800;
```

---

## Keyboard Shortcuts

| Key | Action             |
|-----|--------------------|
| `1` | Go to About        |
| `2` | Go to Experience   |
| `3` | Go to Skills       |
| `4` | Go to Education    |
| `5` | Go to Contact      |

---

## Tech Stack

- Pure HTML / CSS / Vanilla JS — zero build step, zero dependencies
- Fonts: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) + [VT323](https://fonts.google.com/specimen/VT323) via Google Fonts
- GitHub Pages compatible out of the box

---

## License

MIT — feel free to fork & customise.