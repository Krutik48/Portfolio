import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { projects, groups } from '../data/projects'

const FEATURED = ['simon', 'music']

function ProjectCard({ project }) {
  const wide = FEATURED.includes(project.id)
  return (
    <article className={`card ${wide ? 'card--wide' : ''}`}>
      <a
        className="card-media"
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="OPEN"
        aria-label={`${project.title} — open live`}
      >
        <img src={project.img} alt={`${project.title} preview`} loading="lazy" />
        <span className="card-tint" aria-hidden="true" />
      </a>
      <div className="card-body">
        <div className="card-top mono">
          <span>{groups.find((g) => g.id === project.category)?.label}</span>
          <span className="card-era">College</span>
          <span className="card-mark" aria-hidden="true">✦</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>
        <div className="card-links">
          <a
            className="card-link"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live <span className="arr">↗</span>
          </a>
          <a
            className="card-link"
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-heading .char',
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.016,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.work-heading', start: 'top 86%', once: true },
        }
      )

      gsap.utils.toArray('.card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }
        )
        const img = card.querySelector('img')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const words = 'Things I\u2019ve built'.split(' ')

  return (
    <section className="section work" id="work" ref={ref}>
      <div className="container">
        <header className="section-head">
          <h2 className="work-heading" aria-label="Things I've built">
            {words.map((w, wi) => (
              <span className="word" key={wi} aria-hidden="true">
                {w.split('').map((c, ci) => (
                  <span className="char" key={ci}>
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="sub">
            Games, tools and apps from my college years at IIT Madras
            (2020&ndash;2024) — some polished, all shipped. More experiments are
            on the way; this shelf keeps growing.
          </p>
        </header>

        <div className="work-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
