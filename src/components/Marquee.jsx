export default function Marquee({ items, variant = 'hivis', duration = 26 }) {
  const row = (
    <div className="marquee-row" aria-hidden="true">
      {items.map((item, i) => (
        <span className="marquee-item" key={i}>
          {item}
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`marquee marquee--${variant}`}
      style={{ '--marquee-dur': `${duration}s` }}
    >
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  )
}
