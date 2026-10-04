import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/anim'

/**
 * Custom cursor — a red dot that tracks 1:1 plus an ink ring that trails
 * behind with easing. Elements tagged with `data-cursor="LABEL"` grow the
 * ring into a filled disc showing the label (e.g. READ, OPEN).
 *
 * Enabled only for fine pointers without reduced motion; everyone else
 * keeps the native cursor untouched.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    const root = document.documentElement
    root.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const place = () => {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      place()
    }

    const tick = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select'

    const onOver = (e) => {
      const t = e.target
      if (!t || !t.closest) return

      /* the sizzler iframe swallows pointer events — park the cursor */
      if (t.tagName === 'IFRAME') {
        dot.classList.add('is-hidden')
        ring.classList.add('is-hidden')
        return
      }
      dot.classList.remove('is-hidden')
      ring.classList.remove('is-hidden')

      const tagged = t.closest('[data-cursor]')
      const link = !tagged && t.closest(INTERACTIVE)
      dot.classList.toggle('is-label', !!tagged)
      dot.classList.toggle('is-link', !!link)
      ring.classList.toggle('is-label', !!tagged)
      ring.classList.toggle('is-link', !!link)
      if (tagged) label.textContent = tagged.getAttribute('data-cursor') || ''
    }

    const onDown = () => {
      dot.classList.add('is-down')
      ring.classList.add('is-down')
    }
    const onUp = () => {
      dot.classList.remove('is-down')
      ring.classList.remove('is-down')
    }
    const onLeaveDoc = (e) => {
      if (!e.relatedTarget) {
        dot.classList.add('is-hidden')
        ring.classList.add('is-hidden')
      }
    }
    const onEnterDoc = () => {
      dot.classList.remove('is-hidden')
      ring.classList.remove('is-hidden')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    root.addEventListener('mouseleave', onLeaveDoc)
    root.addEventListener('mouseenter', onEnterDoc)

    place()
    tick()

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      root.removeEventListener('mouseleave', onLeaveDoc)
      root.removeEventListener('mouseenter', onEnterDoc)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-ring-label" />
      </span>
    </>
  )
}
