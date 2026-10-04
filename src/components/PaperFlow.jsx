import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/anim'

/* Taming Identity Consistency — animated latent concatenation + masked CFM flow */

export default function PaperFlow() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 })
      tl.fromTo(
        '.flow-out',
        { opacity: 0, scale: 0.55, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.16, ease: 'back.out(2)' }
      ).to({}, { duration: 2.6 })

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
      className="diagram flow"
      viewBox="0 0 530 300"
      role="img"
      aria-label="Animated diagram: reference and target streams merge into a shared latent space, pass through masked conditional flow matching, and produce identity-consistent outputs"
    >
      <defs>
        <linearGradient id="flowA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff4d00" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7a2a10" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="flowB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ece9e2" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8a9099" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* source cards */}
      <g className="flow-src">
        <rect x="14" y="28" width="82" height="82" rx="6" fill="url(#flowA)" />
        <text x="55" y="126">REFERENCE</text>
      </g>
      <g className="flow-src">
        <rect x="14" y="158" width="82" height="82" rx="6" fill="url(#flowB)" />
        <text x="55" y="256">TARGET</text>
      </g>

      {/* connector paths */}
      <path className="flow-path" d="M96 69 C130 69 130 120 158 120" pathLength="1" />
      <path className="flow-path" d="M96 199 C130 199 130 120 158 120" pathLength="1" />
      <path className="flow-path" d="M268 120 H312" pathLength="1" />
      <path className="flow-path" d="M422 120 H446 V66 H462" pathLength="1" />
      <path className="flow-path" d="M422 120 H462" pathLength="1" />
      <path className="flow-path" d="M422 120 H446 V174 H462" pathLength="1" />

      {/* latent node */}
      <g className="flow-node">
        <rect x="158" y="98" width="110" height="44" rx="6" />
        <text x="213" y="116">LATENT</text>
        <text x="213" y="131">CONCAT ⊕</text>
      </g>

      {/* cfm node */}
      <g className="flow-node is-hot">
        <rect x="312" y="98" width="110" height="44" rx="6" />
        <text x="367" y="116">MASKED</text>
        <text x="367" y="131">CFM</text>
      </g>
      <g className="flow-chip">
        <rect x="336" y="60" width="62" height="22" rx="11" />
        <text x="367" y="75">LoRA</text>
      </g>

      {/* outputs */}
      <g className="flow-out">
        <rect x="468" y="44" width="44" height="44" rx="5" fill="url(#flowA)" />
      </g>
      <g className="flow-out">
        <rect x="468" y="98" width="44" height="44" rx="5" fill="url(#flowB)" />
      </g>
      <g className="flow-out">
        <rect x="468" y="152" width="44" height="44" rx="5" fill="url(#flowA)" opacity="0.8" />
      </g>
      <text className="flow-caption" x="482" y="222">OUTPUTS</text>
      <text className="flow-caption" x="442" y="248">IDENTITY HELD</text>
    </svg>
  )
}
