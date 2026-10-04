import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/anim'

/* Beyond the Pixels — animated hierarchical identity decomposition */

const NODES = [
  { id: 'subject', x: 180, y: 12, w: 120, h: 34, label: 'SUBJECT' },
  { id: 'type', x: 60, y: 92, w: 120, h: 34, label: 'TYPE' },
  { id: 'style', x: 300, y: 92, w: 120, h: 34, label: 'STYLE' },
  { id: 'hair', x: 15, y: 172, w: 110, h: 30, label: 'HAIR ✓' },
  { id: 'attire', x: 135, y: 172, w: 110, h: 30, label: 'ATTIRE ✓' },
  { id: 'photo', x: 300, y: 172, w: 120, h: 30, label: 'PHOTOREAL ✗', alert: true },
]

const EDGES = [
  'M240 46 V70 H120 V92',
  'M240 46 V70 H360 V92',
  'M120 126 V148 H70 V172',
  'M120 126 V148 H190 V172',
  'M360 126 V172',
]

export default function PaperTree() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.tree-node')
      const edges = gsap.utils.toArray('.tree-edge')
      const chips = gsap.utils.toArray('.tree-chip')

      if (prefersReducedMotion()) {
        gsap.set([nodes, edges, chips], { opacity: 1, strokeDashoffset: 0, y: 0, scale: 1 })
        return
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 })
      tl.fromTo(
        nodes,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.14, ease: 'power2.out' }
      )
        .fromTo(
          edges,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.4, stagger: 0.12, ease: 'power1.inOut' },
          '-=1.35'
        )
        .fromTo(
          chips,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' },
          '-=0.5'
        )
        .to({}, { duration: 2.4 })

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      })

      return () => {
        tl.kill()
        st.kill()
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={ref}
      className="diagram tree"
      viewBox="0 0 510 300"
      role="img"
      aria-label="Animated diagram: a subject decomposed into type and style, then attributes and features, with identity-preserved and style-variation verdicts"
    >
      {EDGES.map((d, i) => (
        <path key={i} className="tree-edge" d={d} pathLength="1" fill="none" />
      ))}

      {NODES.map((n) => (
        <g key={n.id} className={`tree-node ${n.alert ? 'is-alert' : ''}`}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="5" />
          <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 4}>
            {n.label}
          </text>
        </g>
      ))}

      <g className="tree-chip">
        <rect x="52" y="238" width="180" height="30" rx="15" />
        <text x="142" y="257">IDENTITY PRESERVED</text>
      </g>
      <g className="tree-chip is-alert">
        <rect x="270" y="238" width="188" height="30" rx="15" />
        <text x="364" y="257">STYLE VARIATION FOUND</text>
      </g>
    </svg>
  )
}
