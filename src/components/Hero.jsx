import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'

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
  const playedRef = useRef(false)
  const clock = useIstClock()

  /* entrance — runs once the preloader lifts */
  useEffect(() => {
    if (!start || playedRef.current) return
    playedRef.current = true

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(
          ['.hero-kicker', '.hero-line .line-inner', '.hero-rule', '.hero-sub', '.hero-cta', '.hero-meta'],
          { y: 0, yPercent: 0, opacity: 1, scaleX: 1 }
        )
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.hero-kicker', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          '.hero-line .line-inner',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.15, stagger: 0.09 },
          '-=0.5'
        )
        .fromTo('.hero-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, '-=0.7')
        .fromTo('.hero-sub', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, '-=0.75')
        .fromTo(
          '.hero-cta',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 },
          '-=0.6'
        )
        .fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 0.9 }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [start])

  /* gentle scroll parallax — content drifts up, quietly */
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        yPercent: -8,
        opacity: 0.25,
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

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-content container">
        <p className="hero-kicker mono">
          <span>Software Engineer</span>
          <span className="sep">·</span>
          <span>Adobe — Illustrator</span>
          <span className="sep">·</span>
          <span>IIT Madras &rsquo;24</span>
        </p>

        <h1 className="hero-title" aria-label="Krutik Malani">
          <span className="line hero-line" aria-hidden="true">
            <span className="line-inner">Krutik</span>
          </span>
          <span className="line hero-line" aria-hidden="true">
            <span className="line-inner hero-name-italic">Malani</span>
          </span>
        </h1>

        <div className="hero-rule" aria-hidden="true" />

        <p className="hero-sub">
          Working where computer graphics meets machine learning — image
          vectorization and generative models on Adobe&rsquo;s Illustrator team.
          Research published at CVPR&nbsp;2026.
        </p>

        <div className="hero-cta-row">
          <button className="btn hero-cta" onClick={() => scrollToId('#research')}>
            Read the research <span className="arr">↓</span>
          </button>
          <a
            className="btn btn--solid hero-cta"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <span className="arr">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-meta container">
        <span className="mono">
          {profile.coords} · IST {clock}
        </span>
        <button className="hero-scroll mono" onClick={() => scrollToId('#about')}>
          Scroll
          <span className="hero-scroll-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
