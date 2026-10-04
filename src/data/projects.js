// Selected work — add new projects here; the grid picks them up automatically.
// category: 'web' | 'android' | 'adobe' (renders under the matching group heading)
import simonGame from '../assets/img/simon-game.png'
import amongDino from '../assets/img/among-dino.png'
import weatherApp from '../assets/img/weather-app.png'
import analogClock from '../assets/img/analog-clock.png'
import portfolioShot from '../assets/img/portfolio.jpg'
import mapsmapApi from '../assets/img/mapsmap-api.jpg'
import sciencewebApi from '../assets/img/scienceweb-api.webp'
import musicPlayer from '../assets/img/music-player.jpg'
import newsApp from '../assets/img/news-app.jpg'
import paintApp from '../assets/img/paint-app.jpg'
import currencyConverter from '../assets/img/currency-converter.jpg'

export const groups = [
  { id: 'web', label: 'Web', blurb: 'Things you can open in a tab.' },
  { id: 'android', label: 'Android', blurb: 'Things that lived in a pocket.' },
]

export const projects = [
  // — Web —
  {
    id: 'simon',
    title: 'Simon Game',
    category: 'web',
    desc: 'The memory classic, rebuilt in vanilla JS with sound and a merciless pace curve.',
    img: simonGame,
    demo: 'https://krutik48.github.io/Simon-Game/',
    code: 'https://github.com/Krutik48/Simon-Game',
  },
  {
    id: 'dino',
    title: 'Among-Dino',
    category: 'web',
    desc: 'A chrome-dino-style endless runner with an impostor twist.',
    img: amongDino,
    demo: 'https://krutik48.github.io/space-jumping-game/',
    code: 'https://github.com/Krutik48/space-jumping-game',
  },
  {
    id: 'weather',
    title: 'Weather App',
    category: 'web',
    desc: 'Temperature, humidity, wind and clouds from a live API — nothing more, nothing less.',
    img: weatherApp,
    demo: 'https://krutik48.github.io/weather-app/',
    code: 'https://github.com/Krutik48/weather-app',
  },
  {
    id: 'clock',
    title: 'Analog Clock',
    category: 'web',
    desc: 'A pure-CSS/JS clock that ticks like the real thing.',
    img: analogClock,
    demo: 'https://krutik48.github.io/Analog-Clock/',
    code: 'https://github.com/Krutik48/Analog-Clock',
  },
  {
    id: 'mapsmap',
    title: 'Mapsmap API',
    category: 'web',
    desc: 'A working REST API from a hackathon — raw location data in, clean structured responses out.',
    img: mapsmapApi,
    demo: 'https://documenter.getpostman.com/view/18447699/UVsFxTBF',
    code: 'https://github.com/jayanth151002/Mapsmap-hackathon',
  },
  {
    id: 'scienceweb',
    title: 'Scienceweb API',
    category: 'web',
    desc: 'A science-data REST API — designed, built, deployed, and documented.',
    img: sciencewebApi,
    demo: 'https://documenter.getpostman.com/view/14670440/UzBiNTy9',
    code: 'https://documenter.getpostman.com/view/14670440/UzBiNTy9',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    category: 'web',
    desc: 'Designed and built from scratch — React + Vite, zero UI kits, all custom motion.',
    img: portfolioShot,
    demo: 'https://krutik48.github.io/Portfolio/',
    code: 'https://github.com/Krutik48/Portfolio',
  },

  // — Android —
  {
    id: 'music',
    title: 'Music Player',
    category: 'android',
    desc: 'A local-first music player with playlists that keep up with your thumb.',
    img: musicPlayer,
    demo: 'https://drive.google.com/drive/folders/1vPqR8Y02o9LwXse2t0IGHOBo_cUsozY4',
    code: 'https://github.com/Krutik48/Music-Player',
  },
  {
    id: 'news',
    title: 'News App',
    category: 'android',
    desc: 'Headlines by category, cached for the commute.',
    img: newsApp,
    demo: 'https://drive.google.com/drive/folders/1-C0WV6KtGoT_OfHdlIoARgIx3zK-cbUH',
    code: null,
  },
  {
    id: 'paint',
    title: 'Paint App',
    category: 'android',
    desc: 'Touch drawing with brushes, undo, and export.',
    img: paintApp,
    demo: 'https://drive.google.com/drive/folders/1-C0WV6KtGoT_OfHdlIoARgIx3zK-cbUH',
    code: null,
  },
  {
    id: 'currency',
    title: '$ → ₹ Converter',
    category: 'android',
    desc: 'Live-rate currency conversion with an offline fallback.',
    img: currencyConverter,
    demo: 'https://drive.google.com/drive/folders/1kr-greFLdIf-R5N6K89JA5CBHe10mqSm',
    code: null,
  },
]
