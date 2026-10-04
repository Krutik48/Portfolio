import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/anim'

/**
 * VectorArk "In Action" — embeds the paper's released sizzler demos,
 * the same self-contained animated HTML reels used on vectorark.github.io.
 *
 * Mounting strategy (robust by design):
 * - The iframe is always in the DOM and uses native `loading="lazy"`, so the
 *   reel starts even in environments where script-driven observers are
 *   throttled.
 * - IntersectionObserver is a progressive enhancement: once it has proven it
 *   fires, the iframe is torn down only when the panel is far (>600px) away,
 *   keeping the animation loop off the main thread when not in view.
 */
const SAMPLES = [
  { id: 1, label: '01', file: '1.html', query: '' },
  { id: 2, label: '02', file: '2.html', query: '?mode=polygon' },
  { id: 5, label: '05', file: '5.html', query: '?mode=polygon' },
  { id: 8, label: '08', file: '8.html', query: '?mode=polygon' },
]

export default function SizzlerPlayer() {
  const [sample, setSample] = useState(SAMPLES[0])
  const [runKey, setRunKey] = useState(0)
  const [observerLive, setObserverLive] = useState(false)
  const [farAway, setFarAway] = useState(false)
  const [reduced] = useState(() => prefersReducedMotion())
  const holderRef = useRef(null)

  useEffect(() => {
    const el = holderRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        setObserverLive(true)
        setFarAway(!entry.isIntersecting)
      },
      { rootMargin: '600px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const mountIframe = !reduced && (!observerLive || !farAway)
  const src = `${import.meta.env.BASE_URL}sizzlers/${sample.file}${sample.query}`

  return (
    <div className="sizzler" ref={holderRef}>
      <div className="sizzler-bar mono">
        <span>VectorArk in Action</span>
        <span className="sizzler-live">
          <i aria-hidden="true" />
          live demo
        </span>
      </div>

      <div
        className="sizzler-frame"
        role="tabpanel"
        id="sizzler-panel"
        aria-labelledby={`sizzler-tab-${sample.id}`}
      >
        {mountIframe ? (
          <iframe
            key={`${sample.id}-${runKey}`}
            src={src}
            title={`VectorArk demo — sample ${sample.label}`}
            sandbox="allow-scripts"
            loading="lazy"
          />
        ) : (
          <div className="sizzler-poster" aria-hidden="true">
            <span className="sizzler-poster-word">VectorArk</span>
            <span className="sizzler-poster-sub mono">raster · vector · intelligence</span>
          </div>
        )}
      </div>

      <div className="sizzler-controls">
        <div className="sizzler-tabs" role="tablist" aria-label="VectorArk demo samples">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              role="tab"
              id={`sizzler-tab-${s.id}`}
              aria-controls="sizzler-panel"
              aria-label={`Sample ${s.label}`}
              aria-selected={sample.id === s.id}
              className={`lab-tab mono ${sample.id === s.id ? 'is-active' : ''}`}
              onClick={() => setSample(s)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          className="lab-tab mono sizzler-replay"
          onClick={() => setRunKey((k) => k + 1)}
        >
          ↻ Replay
        </button>
      </div>

      <p className="panel-caption mono">
        Corner tracing, rounding, and color, animated live — the same reels
        that run on{' '}
        <a
          href="https://vectorark.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="sizzler-credit"
        >
          vectorark.github.io ↗
        </a>
      </p>
    </div>
  )
}
