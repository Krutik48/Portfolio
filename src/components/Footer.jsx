import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { scrollToTop } from '../lib/scroll'
import Arrow from './Arrow'

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: profile.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="mono">© 2026 Krutik Malani</span>
        <span className="mono">
          {profile.location} · {time} IST
        </span>
        <span className="mono footer-made">
          Set in Fraunces, Instrument Sans &amp; JetBrains Mono
        </span>
        <button className="footer-top mono" onClick={scrollToTop}>
          Back to top <Arrow dir="n" />
        </button>
      </div>
    </footer>
  )
}
