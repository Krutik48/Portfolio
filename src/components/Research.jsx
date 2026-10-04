import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { papers } from '../data/research'
import SizzlerPlayer from './SizzlerPlayer'
import PaperTree from './PaperTree'
import PaperFlow from './PaperFlow'

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

function PaperInfo({ paper }) {
  return (
    <div className="panel-info">
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
    </div>
  )
}

export default function Research() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.panel').forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 84%', once: true },
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const [vectorark, beyondPixels, taming] = papers

  return (
    <section className="section research" id="research" ref={ref}>
      <div className="container">
        <header className="section-head">
          <h2>Research</h2>
          <p className="sub">
            Peer-reviewed and preprint work from Adobe — teaching models to see
            vectors, and measuring what they preserve.
          </p>
        </header>

        {/* 1 — VectorArk with the paper's own animated demo */}
        <article className="panel">
          <PaperInfo paper={vectorark} />
          <div className="panel-visual">
            <SizzlerPlayer />
          </div>
        </article>

        {/* 2 — Beyond the Pixels with the decision-tree diagram */}
        <article className="panel panel--rev">
          <PaperInfo paper={beyondPixels} />
          <div className="panel-visual">
            <div className="visual-card">
              <PaperTree />
            </div>
            <p className="panel-caption mono">
              Hierarchical decomposition: subject → type / style → attributes →
              verdicts.
            </p>
          </div>
        </article>

        {/* 3 — Taming Identity with the flow diagram */}
        <article className="panel">
          <PaperInfo paper={taming} />
          <div className="panel-visual">
            <div className="visual-card">
              <PaperFlow />
            </div>
            <p className="panel-caption mono">
              Two streams, one latent — identity preserved without architectural
              changes.
            </p>
          </div>
        </article>

        <div className="research-outro">
          <span className="research-outro-mark" aria-hidden="true">✦</span>
          <div>
            <h3>More on the way</h3>
            <p className="mono">New work is cooking. Until it lands, the archive has everything.</p>
          </div>
          <a
            className="paper-link"
            href="https://www.semanticscholar.org/author/2391802926"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="READ"
          >
            All publications <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
