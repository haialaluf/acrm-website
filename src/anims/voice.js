import { ACCENT, INK, rr } from './draw.js'

/** Voice notes: the waveform plays through and the transcript fills in behind it. */
export default function voice() {
  let prog = 0

  return function draw(c, w, h, t, dt) {
    c.clearRect(0, 0, w, h)
    // runs past 1 and holds, so the finished transcript sits for a beat
    prog = (prog + dt * 0.22) % 1.25
    const p = Math.min(1, prog)

    const pad = 18
    const bh = Math.min(56, h * 0.24)
    const by = pad + 6
    const bw = w - pad * 2

    c.fillStyle = '#F1EFE6'
    rr(c, pad, by, bw, bh, bh / 2)
    c.fill()

    c.fillStyle = ACCENT
    c.beginPath()
    c.arc(pad + bh / 2, by + bh / 2, bh * 0.3, 0, 6.29)
    c.fill()
    c.fillStyle = '#FFFDF8'
    c.beginPath()
    c.moveTo(pad + bh / 2 - 3, by + bh / 2 - 5)
    c.lineTo(pad + bh / 2 + 5, by + bh / 2)
    c.lineTo(pad + bh / 2 - 3, by + bh / 2 + 5)
    c.fill()

    const wx = pad + bh + 8
    const ww = bw - bh - 24
    const n = Math.floor(ww / 5)
    for (let i = 0; i < n; i++) {
      const f = i / n
      const a = 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6 + t * 0.4))
      const hh = bh * 0.55 * a
      c.fillStyle = f < p ? INK : '#C6CCC4'
      c.fillRect(wx + i * 5, by + bh / 2 - hh / 2, 2.5, hh)
    }

    const ty = by + bh + 26
    const lines = [0.92, 0.78, 0.86, 0.5]
    const lh = Math.max(18, (h - ty - pad) / lines.length)
    for (let j = 0; j < lines.length; j++) {
      const start = j / lines.length
      const end = (j + 1) / lines.length
      const k = Math.max(0, Math.min(1, (p - start) / (end - start)))
      const y = ty + j * lh
      const lwid = (bw - 24) * lines[j]
      c.fillStyle = '#E6E9E1'
      c.fillRect(pad + 12, y, lwid, 4)
      c.fillStyle = INK
      c.fillRect(pad + 12, y, lwid * k, 4)
      if (k > 0 && k < 1) {
        c.fillStyle = ACCENT
        c.globalAlpha = 0.6 + 0.4 * Math.sin(t * 8)
        c.fillRect(pad + 12 + lwid * k + 3, y - 4, 2, 12)
        c.globalAlpha = 1
      }
    }
  }
}
