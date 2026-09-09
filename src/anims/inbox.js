import { ACCENT, rr } from './draw.js'

/** Shared inbox: threads arrive at the top, some get claimed (pulsing dot). */
export default function inbox() {
  const rows = []
  const n = 5
  let acc = 0
  let warm = false

  return function draw(c, w, h, t, dt) {
    if (!warm) {
      warm = true
      for (let q = 0; q < n; q++) rows.push({ s: 1, cl: q % 2 === 0 })
    }
    c.clearRect(0, 0, w, h)
    const pad = 18
    const rh = (h - pad * 2) / n - 8

    acc += dt
    if (acc > 1.35) {
      acc = 0
      rows.unshift({ s: 0, cl: Math.random() < 0.55 })
      if (rows.length > n) rows.pop()
    }

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]
      r.s = Math.min(1, r.s + dt * 3.2)
      const y = pad + i * (rh + 8) + (1 - r.s) * -10
      const a = r.s

      c.globalAlpha = a
      c.fillStyle = '#FFFDF8'
      c.strokeStyle = '#E3E1D6'
      c.lineWidth = 1
      rr(c, pad, y, w - pad * 2, rh, 10)
      c.fill()
      c.stroke()

      c.fillStyle = i === 0 ? ACCENT : '#C6CCC4'
      c.fillRect(pad + 1, y + rh * 0.22, 3, rh * 0.56)
      c.fillStyle = '#E6E9E1'
      c.beginPath()
      c.arc(pad + 22, y + rh / 2, 7, 0, 6.29)
      c.fill()
      c.fillStyle = '#C6CCC4'
      c.fillRect(pad + 40, y + rh / 2 - 8, Math.min(w * 0.34, 90), 4)
      c.fillStyle = '#E6E9E1'
      c.fillRect(pad + 40, y + rh / 2 + 2, Math.min(w * 0.5, 150), 4)

      if (r.cl) {
        c.fillStyle = ACCENT
        c.globalAlpha = a * (0.55 + 0.45 * Math.sin(t * 2.4 + i))
        c.beginPath()
        c.arc(w - pad - 14, y + rh / 2, 4, 0, 6.29)
        c.fill()
      }
      c.globalAlpha = 1
    }
  }
}
