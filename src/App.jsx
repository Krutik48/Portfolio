import { useCallback, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import StatsBar from './components/StatsBar'
import Work from './components/Work'
import Research from './components/Research'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useLenis from './hooks/useLenis'
import { prefersReducedMotion } from './lib/anim'
import { profile } from './data/profile'

const MARQUEE_ITEMS = [
  'Vectorization',
  'Generative AI',
  'Illustrator',
  'Web',
  'Android',
  'IIT Madras ’24',
  'Chennai',
  'Playful systems',
]

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useLenis()

  const onReveal = useCallback(() => setRevealed(true), [])
  const onDone = useCallback(() => setLoaded(true), [])

  // unlock scrolling once the curtain is gone
  useEffect(() => {
    if (loaded) lenisRef.current?.start()
  }, [loaded, lenisRef])

  // instant start for reduced-motion visitors
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
        <Hero start={revealed} />

        <div className="marquee-band" aria-hidden="true">
          <Marquee items={MARQUEE_ITEMS} variant="hivis" duration={30} />
        </div>

        <StatsBar />
        <Work />
        <Research />
        <About />

        <div className="marquee-band marquee-band--ghost" aria-hidden="true">
          <Marquee items={['Let’s build', '✦', 'something playful', '✦']} variant="ghost" duration={22} />
        </div>

        <Contact />
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
