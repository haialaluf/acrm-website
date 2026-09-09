import { ACCENT, INK, rr } from './draw.js'

/** Customers & team: the contact list on the left, this month's usage on the right. */
export default function customers() {
  const bars = [0.42, 0.55, 0.48, 0.7, 0.62, 0.8, 0.74, 0.9, 0.66, 0.58, 0.83, 0]
  let acc = 0
  let hi = 0

  return function draw(c, w, h, t, dt) {
    c.clearRect(0, 0, w, h)
    acc += dt
    if (acc > 1.4) {
      acc = 0
      hi = (hi + 1) % 5
    }

    const pad = 18
    const lw = Math.round(w * 0.5)
    const n = 5
    const rh = (h - pad * 2) / n

    for (let i = 0; i < n; i++) {
      const y = pad + i * rh
      const on = i === hi
      c.fillStyle = on ? '#E4F2E4' : '#FFFDF8'
      c.strokeStyle = '#E3E1D6'
      c.lineWidth = 1
      rr(c, pad, y + 3, lw - 10, rh - 6, 10)
      c.fill()
      c.stroke()

      c.fillStyle = on ? ACCENT : '#E6E9E1'
      c.beginPath()
      c.arc(pad + 20, y + rh / 2, 8, 0, 6.29)
      c.fill()
      c.fillStyle = '#C6CCC4'
      c.fillRect(pad + 38, y + rh / 2 - 7, Math.min(lw * 0.42, 86), 4)
      c.fillStyle = '#E6E9E1'
      c.fillRect(pad + 38, y + rh / 2 + 3, Math.min(lw * 0.3, 60), 4)
      // the first two rows carry a permission chip
      if (i < 2) {
        c.fillStyle = i === 0 ? '#8CC7A2' : '#E6E9E1'
        rr(c, pad + lw - 40, y + rh / 2 - 6, 22, 12, 6)
        c.fill()
      }
    }

    const bx = pad + lw + 6
    const bw = w - pad - bx
    const by = pad + 8
    const bh = h - pad * 2 - 30
    const bn = 12
    const gap = 4
    const cw = (bw - gap * (bn - 1)) / bn

    c.fillStyle = '#F1EFE6'
    c.fillRect(bx, by + bh - 1, bw, 1)
    for (let k = 0; k < bn; k++) {
      // the last bar is the month in progress, still creeping up
      const v = k === bn - 1 ? 0.35 + 0.3 * (Math.sin(t * 1.2) * 0.5 + 0.5) : bars[k]
      const ch = bh * v
      const cx = bx + k * (cw + gap)
      c.fillStyle = k === bn - 1 ? ACCENT : k > 7 ? '#8CC7A2' : '#D9DED5'
      rr(c, cx, by + bh - ch, cw, ch, 2)
      c.fill()
    }

    c.strokeStyle = '#C6A24A'
    c.setLineDash([3, 3])
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(bx, by + bh * 0.12)
    c.lineTo(bx + bw, by + bh * 0.12)
    c.stroke()
    c.setLineDash([])

    c.fillStyle = '#C6CCC4'
    c.fillRect(bx, by + bh + 12, Math.min(70, bw * 0.5), 4)
    c.fillStyle = INK
    c.fillRect(bx + bw - 30, by + bh + 12, 30, 4)
  }
}
