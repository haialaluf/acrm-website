/* Shared canvas primitives, ported from the design's motion.js. */

export const INK = '#131C17'
export const ACCENT = '#2EA84E'
export const ACCENT_L = '#5FCB7E'

/** Size the backing store to the element's box at device pixel ratio. */
export function fit(cv) {
  const r = cv.getBoundingClientRect()
  const d = Math.min(window.devicePixelRatio || 1, 2)
  cv.width = Math.max(1, Math.round(r.width * d))
  cv.height = Math.max(1, Math.round(r.height * d))
  const c = cv.getContext('2d')
  c.setTransform(d, 0, 0, d, 0, 0)
  return { ctx: c, w: r.width, h: r.height }
}

export function pill(c, x, y, w, h, col, a) {
  c.globalAlpha = a
  c.fillStyle = col
  const r = h / 2
  c.beginPath()
  c.moveTo(x + r, y)
  c.lineTo(x + w - r, y)
  c.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2)
  c.lineTo(x + r, y + h)
  c.arc(x + r, y + r, r, Math.PI / 2, -Math.PI / 2)
  c.closePath()
  c.fill()
  c.globalAlpha = 1
}

/** A pill with a chat-bubble tail. */
export function bub(c, x, y, w, h, col, a) {
  c.globalAlpha = a
  c.fillStyle = col
  const r = h / 2
  c.beginPath()
  c.moveTo(x + r, y)
  c.lineTo(x + w - r, y)
  c.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2)
  c.lineTo(x + r + 3, y + h)
  c.lineTo(x + r - 1, y + h + 3.5)
  c.lineTo(x + r - 1, y + h)
  c.arc(x + r, y + r, r, Math.PI / 2, -Math.PI / 2)
  c.closePath()
  c.fill()
  c.globalAlpha = 1
}

export function rr(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2)
  c.beginPath()
  c.moveTo(x + r, y)
  c.arcTo(x + w, y, x + w, y + h, r)
  c.arcTo(x + w, y + h, x, y + h, r)
  c.arcTo(x, y + h, x, y, r)
  c.arcTo(x, y, x + w, y, r)
  c.closePath()
}
