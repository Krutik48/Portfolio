import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/anim'
import { setLenis } from '../lib/scroll'

/**
 * Smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Starts stopped (preloader locks the page); call start() when ready.
 */
export default function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      autoRaf: false,
    })
    lenisRef.current = lenis
    setLenis(lenis)
    lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return lenisRef
}
