import { ACCENT, rr } from './draw.js'

/** Announcements: variables snap one by one into a saved message. */
export default function template() {
  let k = 2
  let acc = 0

  return function draw(c, w, h, t, dt) {
    c.clearRect(0, 0, w, h)
    acc += dt
    if (acc > 1.1) {
      acc = 0
      k = (k + 1) % 4
    }

    const pad = 20
    const lw = w - pad * 2
    c.strokeStyle = '#E3E1D6'
    c.fillStyle = '#FFFDF8'
    rr(c, pad, pad, lw, h - pad * 2, 14)
    c.fill()
    c.stroke()

    const x = pad + 16
    // [isVariable, width] — the shape of the message line
    const seq = [
      [0, 74],
      [1, 52],
      [0, 96],
      [0, 40],
    ]
    let cx = x
    let cy = pad + 24

    for (let i = 0; i < seq.length; i++) {
      const isVar = seq[i][0] === 1
      const wd = seq[i][1]
      if (cx + wd > pad + lw - 16) {
        cx = x
        cy += 20
      }
      const on = i <= k
      if (isVar) {
        c.globalAlpha = on ? 1 : 0.25
        c.fillStyle = '#E4F2E4'
        rr(c, cx, cy - 9, wd, 16, 8)
        c.fill()
        c.strokeStyle = ACCENT
        c.lineWidth = 1
        c.stroke()
        c.fillStyle = ACCENT
        c.fillRect(cx + 6, cy - 2, wd - 12, 3)
      } else {
        c.globalAlpha = on ? 1 : 0.25
        c.fillStyle = '#C6CCC4'
        c.fillRect(cx, cy - 2, wd, 4)
      }
      c.globalAlpha = 1
      cx += wd + 8
    }

    cy += 30
    c.fillStyle = '#F1EFE6'
    rr(c, x, cy, lw - 32, Math.max(26, h - pad - cy - 18), 12)
    c.fill()
    c.fillStyle = '#C6CCC4'
    c.fillRect(x + 12, cy + 14, Math.min(120, lw - 70), 4)

    const p = Math.sin(t * 1.6) * 0.5 + 0.5
    c.fillStyle = ACCENT
    c.globalAlpha = 0.85
    c.fillRect(x + 12, cy + 24, Math.min(150, lw - 80) * p, 4)
    c.globalAlpha = 1
  }
}
