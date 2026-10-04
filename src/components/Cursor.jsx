import { useEffect, useRef } from 'react'
import { isCoarsePointer, prefersReducedMotion } from '../lib/anim'

/**
 * Custom cursor: orange dot tracks instantly, ring trails behind and
 * grows into a labelled disc over elements carrying [data-cursor].
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    document.documentElement.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      if (target) {
        label.textContent = target.getAttribute('data-cursor') || 'OPEN'
        ring.classList.add('is-active')
      } else {
        ring.classList.remove('is-active')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="label" ref={labelRef} />
      </div>
    </>
  )
}
