import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/profile'

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-title .word',
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.07,
          ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 74%', once: true },
        }
      )
      gsap.fromTo(
        '.contact-mail',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 68%', once: true },
        }
      )
      gsap.fromTo(
        '.contact-row',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-socials', start: 'top 85%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const line1 = 'Let’s'.split(' ')
  const line2 = 'talk.'.split(' ')

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container">
        <h2 className="contact-title" aria-label="Let’s talk.">
          <span className="line" aria-hidden="true">
            {line1.map((w, i) => (
              <span className="word" key={i}>{w}&nbsp;</span>
            ))}
          </span>
          <span className="line" aria-hidden="true">
            {line2.map((w, i) => (
              <span className="word" key={i}>{w}&nbsp;</span>
            ))}
          </span>
        </h2>

        <div className="contact-mail-row">
          <a className="contact-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <div className="contact-socials">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              className="contact-row"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-row-name">{s.label}</span>
              <span className="contact-row-arr" aria-hidden="true">↗</span>
            </a>
          ))}
          <a className="contact-row" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="contact-row-name">WhatsApp</span>
            <span className="contact-row-arr" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
