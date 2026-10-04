// Shared handle to the Lenis instance so any component can trigger smooth scrolls.
let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const getLenis = () => lenis

export const scrollToId = (selector) => {
  const el = document.querySelector(selector)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.3 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
