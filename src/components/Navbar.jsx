import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const go = (href) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner container">
          <a
            href="#home"
            className="nav-logo"
            onClick={go('#home')}
            data-cursor="TOP"
          >
            Krutik<span className="nav-logo-dot">.</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={go(l.href)} className="nav-link link-line">
                {l.label}
              </a>
            ))}
            <a
              className="nav-resume"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <span className="arr">↗</span>
            </a>
          </nav>

          <button
            className={`nav-burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="menu-nav" aria-label="Mobile">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="menu-link"
              style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
              tabIndex={open ? 0 : -1}
            >
              {l.label}
            </a>
          ))}
          <a
            className="menu-link menu-link--external"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: '0.32s' }}
            tabIndex={open ? 0 : -1}
          >
            Resume ↗
          </a>
        </nav>
        <div className="menu-foot mono">
          <span>{profile.location}</span>
          <span>{profile.email}</span>
        </div>
      </div>
    </>
  )
}
