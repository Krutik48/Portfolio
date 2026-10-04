import { useCallback, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Research from './components/Research'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import useLenis from './hooks/useLenis'
import { prefersReducedMotion } from './lib/anim'

const TICKER_ITEMS = [
  'Computer Vision × ML',
  'Vectorization',
  'Generative AI',
  'CVPR 2026',
  'Model Evaluation',
  'Open to conversations',
]

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useLenis()

  const onReveal = useCallback(() => setRevealed(true), [])
  const onDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (loaded) lenisRef.current?.start()
  }, [loaded, lenisRef])

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true)
      setLoaded(true)
    }
  }, [])

  return (
    <>
      {!prefersReducedMotion() && <Preloader onReveal={onReveal} onDone={onDone} />}
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <section className="intro" id="home">
          <Hero start={revealed} />
          <StatsBar />
          <About />
        </section>

        <Research />
        <Work />

        <div className="ticker-band" aria-hidden="true">
          <Marquee items={TICKER_ITEMS} variant="ticker" duration={34} />
        </div>

        <Contact />
      </main>

      <Footer />
    </>
  )
}
