import { ACCENT, INK, rr } from './draw.js'

/** AI assistant: tool calls pulse out to four systems and back. */
export default function agent() {
  return function draw(c, w, h, t) {
    c.clearRect(0, 0, w, h)
    const cx = w / 2
    const cy = h / 2
    const R = Math.min(w, h) * 0.32
    const n = 4

    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + i * (6.2832 / n)
      const nx = cx + Math.cos(a) * R
      const ny = cy + Math.sin(a) * R

      c.strokeStyle = '#E3E1D6'
      c.lineWidth = 1
      c.beginPath()
      c.moveTo(cx, cy)
      c.lineTo(nx, ny)
      c.stroke()

      const ph = (t * 0.55 + i * 0.25) % 1
      const out = ph < 0.5
      const k = out ? ph * 2 : (1 - ph) * 2
      const px = cx + (nx - cx) * k
      const py = cy + (ny - cy) * k
      c.fillStyle = out ? ACCENT : '#8CC7A2'
      c.beginPath()
      c.arc(px, py, 3.2, 0, 6.29)
      c.fill()

      c.fillStyle = '#FFFDF8'
      c.strokeStyle = '#C6CCC4'
      rr(c, nx - 16, ny - 9, 32, 18, 9)
      c.fill()
      c.stroke()
      c.fillStyle = '#C6CCC4'
      c.fillRect(nx - 8, ny - 1.5, 16, 3)
    }

    c.fillStyle = INK
    c.beginPath()
    c.arc(cx, cy, 13, 0, 6.29)
    c.fill()
    c.strokeStyle = ACCENT
    c.lineWidth = 1.5
    c.globalAlpha = 0.35 + 0.35 * Math.sin(t * 2)
    c.beginPath()
    c.arc(cx, cy, 13 + 5 + 3 * Math.sin(t * 2), 0, 6.29)
    c.stroke()
    c.globalAlpha = 1
  }
}
