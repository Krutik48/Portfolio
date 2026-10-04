import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { papers } from '../data/research'

function Authors({ authors }) {
  const parts = authors.split('Krutik Malani')
  return (
    <p className="paper-authors">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="paper-me">Krutik Malani</strong>}
        </span>
      ))}
    </p>
  )
}

function PaperCard({ paper }) {
  return (
    <article className={`paper ${paper.featured ? 'paper--featured' : ''}`}>
      <div className="paper-venue">
        <span className="chip chip--venue">{paper.venue}</span>
        {paper.venueNote && <span className="chip">{paper.venueNote}</span>}
        <span className="paper-date mono">{paper.date}</span>
      </div>
      <h3 className="paper-title">{paper.title}</h3>
      <Authors authors={paper.authors} />
      <p className="paper-abstract">{paper.abstract}</p>
      <div className="paper-links">
        {paper.links.map((l) => (
          <a
            key={l.url}
            className="paper-link"
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="READ"
          >
            {l.label} <span className="arr">↗</span>
          </a>
        ))}
      </div>
      <span className="paper-aff mono">{paper.affiliation}</span>
    </article>
  )
}

export default function Research() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120)

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      const bar = progressRef.current
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
              scrub: 1,
            },
          }
        )
      }
      return () => tween.scrollTrigger?.kill()
    })

    mm.add('(min-width: 901px) and (prefers-reduced-motion: reduce)', () => {
      trackRef.current?.classList.add('is-scrollable')
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="research" id="research" ref={sectionRef}>
      <div className="research-pin" ref={pinRef}>
        <div className="container research-head">
          <h2>Research</h2>
          <p className="sub">
            At Adobe I work where graphics meets generative AI — teaching models
            to see vectors, and measuring what they preserve.
          </p>
        </div>

        <div className="research-track" ref={trackRef}>
          {papers.map((p) => (
            <PaperCard key={p.id} paper={p} />
          ))}

          <article className="paper paper--outro">
            <span className="paper-outro-mark" aria-hidden="true">✦</span>
            <h3 className="paper-title">More on the way</h3>
            <p className="paper-abstract">
              New work is cooking. Until it lands, the archive has everything.
            </p>
            <a
              className="paper-link"
              href="https://www.semanticscholar.org/author/2391802926"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="READ"
            >
              All publications <span className="arr">↗</span>
            </a>
          </article>
        </div>

        <div className="research-progress" aria-hidden="true">
          <span className="research-progress-bar" ref={progressRef} />
        </div>
      </div>
    </section>
  )
}
