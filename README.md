# Krutik Malani — Portfolio

Personal portfolio, rebuilt from scratch in 2026.

**Live:** https://krutik48.github.io/Portfolio/

## Stack

- **React 18 + Vite** — app shell and build
- **Three.js / @react-three/fiber** — 3D hero: a custom GLSL "liquid chrome" blob with simplex-noise displacement, orbit rings and particle dust
- **GSAP + ScrollTrigger** — preloader choreography, masked text reveals, pinned horizontal research gallery, parallax
- **Lenis** — smooth scrolling, synced to the GSAP ticker

No UI kits. All components, motion and styling are custom.

## Structure

```
src/
├── components/     # sections + UI (Navbar, Hero, Work, Research, About, Contact…)
├── three/          # HeroScene — shaders, blob, particles, rings
├── data/           # profile.js · projects.js · research.js  ← edit content here
├── hooks/          # useLenis, useMagnetic
├── lib/            # gsap setup, scroll helpers
└── styles/         # tokens.css, global.css, sections.css
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
