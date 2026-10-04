import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'

const stats = [
  { value: 3, pad: 2, suffix: '', label: 'Research papers', note: '1 CVPR · 2 preprints' },
  { value: 11, pad: 2, suffix: '', label: 'Projects built', note: 'Web & Android' },
  { value: null, display: '2+ yrs', label: 'At Adobe', note: 'Illustrator team' },
  { value: null, display: '’24', label: 'IIT Madras', note: 'B.Tech · Electrical' },
]

export default function StatsBar() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.stat-num[data-count]').forEach((el) => {
        const target = parseInt(el.dataset.count, 10)
        const pad = parseInt(el.dataset.pad, 10) || 0
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v)).padStart(pad, '0')
          },
        })
      })
      gsap.fromTo(
        '.stat-cell',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="stats" ref={ref} aria-label="Quick facts">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <div className="stat-cell" key={i}>
            <span className="stat-value">
              {s.value != null ? (
                <span
                  className="stat-num"
                  data-count={s.value}
                  data-pad={s.pad}
                >
                  00
                </span>
              ) : (
                <span className="stat-num stat-num--static">{s.display}</span>
              )}
            </span>
            <span className="stat-label">{s.label}</span>
            <span className="stat-note mono">{s.note}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
