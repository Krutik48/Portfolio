import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'
import useTypewriter from '../hooks/useTypewriter'
import portrait from '../assets/img/krutik.jpg'

const TYPE_PHRASES = [
  'Paper accepted at CVPR 2026',
  'Model evaluation for generative AI',
  'Building tools I couldn\u2019t find',
]

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
  const { text: typed } = useTypewriter(TYPE_PHRASES, { enabled: start })

  /* entrance — runs once the preloader lifts */
  useEffect(() => {
    if (!start || playedRef.current) return
    playedRef.current = true

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(
          [
            '.hero-line .line-inner',
            '.hero-rule',
            '.hero-type',
            '.hero-sub',
            '.hero-cta',
            '.hero-figure',
            '.hero-meta',
          ],
          { y: 0, yPercent: 0, opacity: 1, scaleX: 1 }
        )
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        '.hero-line .line-inner',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.15, stagger: 0.1 }
      )
        .fromTo('.hero-rule', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=0.7')
        .fromTo('.hero-type', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.55')
        .fromTo('.hero-sub', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, '-=0.45')
        .fromTo(
          '.hero-cta',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 },
          '-=0.6'
        )
        .fromTo(
          '.hero-figure',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=1'
        )
        .fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 0.9 }, '-=0.5')
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
        <div className="hero-text">
          <h1 className="hero-title" aria-label="Hi, there. Krutik Malani.">
            <span className="line hero-line" aria-hidden="true">
              <span className="line-inner hero-greet">Hi, there.</span>
            </span>
            <span className="line hero-line" aria-hidden="true">
              <span className="line-inner">Krutik</span>
            </span>
            <span className="line hero-line" aria-hidden="true">
              <span className="line-inner hero-name-italic">Malani</span>
            </span>
          </h1>

          <div className="hero-rule" aria-hidden="true" />

          <p className="hero-type">
            <span className="sr-only">
              Paper accepted at CVPR 2026. Model evaluation for generative AI.
            </span>
            <span className="hero-type-vis" aria-hidden="true">
              {typed}
              <span className="hero-caret" />
            </span>
          </p>

          <p className="hero-sub">
            Software engineer at {profile.company}, working on image
            vectorization and generative models.
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

        {/* Portrait — a clean, static editorial plate. All motion lives in the type. */}
        <figure className="hero-figure">
          <div className="hero-portrait">
            <img src={portrait} alt="Portrait of Krutik Malani" />
            <span className="hero-corner hero-corner--tl" aria-hidden="true" />
            <span className="hero-corner hero-corner--tr" aria-hidden="true" />
            <span className="hero-corner hero-corner--bl" aria-hidden="true" />
            <span className="hero-corner hero-corner--br" aria-hidden="true" />
          </div>
          <figcaption className="hero-figure-cap mono">
            <span>Fig. 01</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
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
