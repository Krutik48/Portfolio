import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/profile'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-block',
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container about-grid">
        <div className="about-copy">
          <h2 className="about-block">The short version</h2>
          <p className="about-blurb about-block">{profile.blurb}</p>

          <div className="about-toolbox about-block">
            {profile.toolbox.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>

          <a
            className="btn about-block"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Full résumé <span className="arr">↗</span>
          </a>
        </div>

        <div className="about-timeline about-block">
          {profile.timeline.map((t) => (
            <div className="tl-row" key={t.org}>
              <div className="tl-left">
                <h3 className="tl-org">{t.org}</h3>
                <span className="tl-detail">{t.detail}</span>
              </div>
              <div className="tl-right">
                <span className="tl-period mono">{t.period}</span>
                <p className="tl-note">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
