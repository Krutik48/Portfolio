# Krutik Malani — Portfolio

Personal portfolio, rebuilt 2026.

**Live:** https://krutik48.github.io/Portfolio/

## Stack

- **React 18 + Vite** — app shell and build
- **GSAP + ScrollTrigger** — preloader, masked reveals, gentle parallax, counters
- **Lenis** — smooth scrolling, synced to the GSAP ticker
- No UI kits, no 3D — a light editorial theme: Fraunces (display) · Instrument Sans (body) · JetBrains Mono (labels)

## Structure

```
src/
├── components/     # sections + UI (Navbar, Hero, About, Research, Work, Contact…)
├── data/           # profile.js · projects.js · research.js  ← edit content here
├── hooks/          # useLenis
├── lib/            # gsap setup, scroll helpers
└── styles/         # tokens.css, global.css, sections.css
public/
└── sizzlers/       # VectorArk's own animated demo reels (byte-identical copies)
```

## Adding a project

Append an entry to `src/data/projects.js` — the grid picks it up automatically.

## Dev

```bash
npm install
npm run dev      # http://localhost:5173/Portfolio/
npm run build    # production build → dist/
npm run deploy   # build + publish to gh-pages
```
