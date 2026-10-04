import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { projects, groups } from '../data/projects'
import Arrow from './Arrow'

const FEATURED = ['simon', 'music']

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'localhost'
  }
}

function ProjectCard({ project }) {
  const wide = FEATURED.includes(project.id)
  const isWeb = project.category === 'web'
  return (
    <article className={`card ${wide ? 'card--wide' : ''}`}>
      <a
        className={`card-media card-media--${project.category}`}
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — open live`}
        data-cursor="OPEN"
      >
        {isWeb ? (
          <span className="browser">
            <span className="browser-bar">
              <span className="browser-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="browser-url mono">{domainOf(project.demo)}</span>
            </span>
            <span className="browser-view">
              <img src={project.img} alt={`${project.title} preview`} loading="lazy" />
            </span>
          </span>
        ) : (
          <span className="phone">
            <span className="phone-notch" aria-hidden="true" />
            <img src={project.img} alt={`${project.title} preview`} loading="lazy" />
          </span>
        )}
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
            Live <Arrow />
          </a>
          {project.code && (
            <a
              className="card-link"
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code <Arrow />
            </a>
          )}
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
          /* gentle zoom-in on scroll — the frame clips it, so the
             image can never slide over the browser chrome */
          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 1.08,
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
            Games, tools and apps from my college years at IIT Madras &mdash;
            made in a pre-ChatGPT world, so every bug here is hand-written and
            entirely mine.
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
