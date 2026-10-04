import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'

/**
 * Full-screen loader: odometer count → curtain lift.
 * Calls onReveal when the curtain starts lifting so hero animations overlap.
 */
export default function Preloader({ onReveal, onDone }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const num = numRef.current

    if (prefersReducedMotion()) {
      gsap.set(root, { display: 'none' })
      onReveal?.()
      onDone?.()
      return undefined
    }

    document.documentElement.classList.add('is-loading')
    document.body.style.overflow = 'hidden'

    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove('is-loading')
        document.body.style.overflow = ''
        onDone?.()
      },
    })

    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        num.textContent = String(Math.round(counter.v)).padStart(3, '0')
      },
    })
      .to('.preloader-inner', { yPercent: -40, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.1')
      .to(
        root,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          onStart: () => onReveal?.(),
        },
        '-=0.15'
      )

    return () => {
      tl.kill()
      document.documentElement.classList.remove('is-loading')
      document.body.style.overflow = ''
    }
  }, [onReveal, onDone])

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-inner container">
        <span className="mono preloader-name">Krutik Malani</span>
        <span className="mono preloader-tag">Portfolio · 2026</span>
        <span className="preloader-num" ref={numRef}>000</span>
      </div>
    </div>
  )
}
