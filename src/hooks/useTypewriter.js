import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/anim'

/**
 * Classic portfolio typewriter: types a phrase, holds, deletes, advances.
 * - Waits for `enabled` (so it starts when the preloader curtain lifts).
 * - Under reduced motion, shows the first phrase statically (no timer).
 */
export default function useTypewriter(
  phrases,
  { enabled = true, typeSpeed = 52, deleteSpeed = 26, hold = 1800 } = {}
) {
  const [reduced] = useState(() => prefersReducedMotion())
  const [text, setText] = useState(reduced ? phrases[0] : '')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced || !enabled) return undefined

    const current = phrases[index]
    let timer

    if (!deleting && text === current) {
      // full phrase typed — hold, then start deleting
      timer = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      // fully deleted — advance to the next phrase
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
    } else {
      timer = setTimeout(
        () => {
          const next = current.slice(0, text.length + (deleting ? -1 : 1))
          setText(next)
        },
        deleting ? deleteSpeed : typeSpeed
      )
    }

    return () => clearTimeout(timer)
  }, [text, deleting, index, enabled, reduced, phrases, typeSpeed, deleteSpeed, hold])

  return { text, reduced }
}
