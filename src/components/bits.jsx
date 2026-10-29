import { Fragment } from 'react'

/** "01 / What it does" → the number in green, a rule, then the name. */
export function Label({ text, style }) {
  const [n, name] = text.includes(' / ') ? text.split(' / ') : [null, text]
  return (
    <span className="label" data-rv="" style={style}>
      {n && (
        <>
          <b>{n}</b>
          <i />
        </>
      )}
      {name}
    </span>
  )
}

/**
 * A heading whose words rise in one after another once it scrolls into view.
 * Only ordinary spaces split it: the hard spaces inside Latin names in the
 * Hebrew copy keep those names whole.
 */
export function Split({ as: Tag = 'h2', className = 'h2', text }) {
  const words = text.trim().split(/[ \t\n]+/)
  return (
    <Tag className={className} data-rv="" style={{ opacity: 1, transform: 'none' }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="w">
            <span style={{ '--i': i }}>{w}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}

/** `--d` is the reveal delay the design gives each block. */
export const delay = (d) => ({ '--d': d })

export const Arrow = () => <span className="ar">→</span>
