/**
 * Custom inline arrow — hairline stroke, mitered joints, editorial weight.
 * dir: 'ne' (↗ default) | 'n' (↑) | 's' (↓) | 'e' (→) | 'rot' (↻)
 */
export default function Arrow({ dir = 'ne', className = '' }) {
  const paths = {
    ne: ['M2.6 9.4 9.4 2.6', 'M3.9 2.6h5.5v5.5'],
    n: ['M6 9.4V2.6', 'M2.9 5.7 6 2.6l3.1 3.1'],
    s: ['M6 2.6v6.8', 'M2.9 6.3 6 9.4l3.1-3.1'],
    e: ['M2.6 6h6.8', 'M6.3 2.9 9.4 6l-3.1 3.1'],
    rot: ['M9.8 6A3.8 3.8 0 1 1 6 2.2', 'M4.6 3.4 6 2.2 7.3 3.5'],
  }
  return (
    <svg
      className={`ico ico--${dir} ${className}`.trim()}
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
    >
      {paths[dir].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
