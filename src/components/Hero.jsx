import { useEffect, useRef, useState } from 'react'
import HeroScene from '../three/HeroScene'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'
import useMagnetic from '../hooks/useMagnetic'

function useIstClock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: profile.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Hero({ start }) {
  const sectionRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const glowRef = useRef(null)
  const playedRef = useRef(false)
  const clock = useIstClock()
  const magnetRef = useMagnetic(0.25)

  /* entrance choreography — runs once the preloader curtain lifts */
  useEffect(() => {
    if (!start || playedRef.current) return
    playedRef.current = true

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(['.hero-line .line-inner', '.hero-sub', '.hero-cta', '.hero-meta'], {
          y: 0,
          yPercent: 0,
          opacity: 1,
        })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        '.hero-line .line-inner',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.15, stagger: 0.1 }
      )
        .fromTo(
          '.hero-sub',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.55'
        )
        .fromTo(
          '.hero-cta',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          '-=0.6'
        )
        .fromTo(
          '.hero-meta',
          { opacity: 0 },
          { opacity: 1, duration: 0.9 },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [start])

  /* scroll: canvas recedes while the type lifts away */
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.to(canvasWrapRef.current, {
        yPercent: 16,
        scale: 0.9,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero-content', {
        yPercent: -14,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* cursor-follow warmth */
  useEffect(() => {
    const el = sectionRef.current
    const glow = glowRef.current
    if (!el || !glow) return undefined
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        glow.style.setProperty('--mx', `${e.clientX - r.left}px`)
        glow.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-canvas" ref={canvasWrapRef} aria-hidden="true">
        <HeroScene />
      </div>
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />

      <div className="hero-content container">
        <h1 className="hero-title" aria-label="I build playful systems">
          <span className="line hero-line" aria-hidden="true">
            <span className="line-inner hero-line-sm">I build</span>
          </span>
          <span className="line hero-line" aria-hidden="true">
            <span className="line-inner">Playful</span>
          </span>
          <span className="line hero-line" aria-hidden="true">
            <span className="line-inner hero-line-outline">Systems</span>
          </span>
        </h1>

        <p className="hero-sub">
          Software engineer on Adobe&rsquo;s Illustrator team — vectorization,
          generative models, and the tools that carry them. IIT Madras &rsquo;24.
        </p>

        <div className="hero-cta-row">
          <button
            className="btn hero-cta"
            onClick={() => scrollToId('#work')}
            data-cursor="SEE"
          >
            See the work <span className="arr">↓</span>
          </button>
          <a
            className="btn btn--solid hero-cta"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="PDF"
          >
            Résumé <span className="arr">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-meta container">
        <span className="mono">
          {profile.coords} · IST {clock}
        </span>
        <button
          className="hero-scroll mono"
          onClick={() => scrollToId('#work')}
          ref={magnetRef}
        >
          Scroll
          <span className="hero-scroll-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
