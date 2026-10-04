import { useEffect, useState } from 'react'

/**
 * Light/dark switch. The initial theme is resolved by the inline script in
 * index.html (query param → saved choice → OS preference), so the first
 * paint never flashes the wrong palette.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('km-theme', theme)
    } catch (e) {
      /* private mode — the choice just won't persist */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#141210' : '#F8F7F3')
    }
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="nav-theme"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M13.2 9.7A5.4 5.4 0 0 1 6.3 2.8a5.4 5.4 0 1 0 6.9 6.9Z" />
        </svg>
      )}
    </button>
  )
}
