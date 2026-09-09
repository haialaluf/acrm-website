import { ACCENT_L, bub, pill, rr } from './draw.js'
import { heroPointer } from './pointer.js'

/* whatsapp · instagram · facebook · email, as "r,g,b" for rgba() */
const CH = ['99,206,130', '240,162,198', '124,176,242', '239,229,209']

function pickCh() {
  const r = Math.random()
  return r < 0.44 ? 0 : r < 0.66 ? 1 : r < 0.8 ? 2 : 3
}

/**
 * Hero: messages drift in scattered from the left, queue at a gate, then
 * release down ordered lanes into an inbox panel. Seeded with 1100 pre-rolled
 * frames so the lanes and the panel are already populated on first paint.
 */
export default function flow() {
  let W = 0
  let H = 0
  let P = []
  let rows = []
  let lanes = []
  let flash = []
  let sparks = []
  let panel = null
  let gate = 0
  let cap = 6
  let seeded = false
  let clock = 0
  let relT = 0
  let spawnT = 0
  let absorbT = 0
  let cy = 0
  let spread = 0
  let ox = 0
  let oy = 0
  let dtEase = 0.2

  function layout(w, h) {
    W = w
    H = h
    // Below 860px there is no room for the panel, so the lanes simply run off
    // the right edge and the gate moves in to keep the scatter readable.
    const narrow = w < 860
    if (narrow) {
      panel = null
      gate = w * 0.44
    } else {
      const pw = Math.min(348, Math.max(250, w * 0.252))
      const ph = Math.min(h * 0.7, 468)
      const px = w - pw - Math.min(76, Math.max(26, w * 0.048))
      panel = { x: px, y: Math.round((h - ph) / 2), w: pw, h: ph }
      gate = px - Math.min(122, Math.max(62, w * 0.076))
    }
    const n = narrow ? 7 : 6
    const anchor = panel ? panel.y + panel.h / 2 : h / 2
    const band = narrow ? h * 0.78 : Math.min(h * 0.52, n * 44)
    const top = anchor - band / 2
    const stp = band / (n - 1)
    lanes = []
    flash = []
    for (let i = 0; i < n; i++) {
      lanes.push(Math.round(top + i * stp) + 0.5)
      flash.push(0)
    }
    cy = anchor
    spread = narrow ? h * 0.44 : h * 0.42
    if (panel) {
      const bt = panel.y + 52
      cap = Math.max(3, Math.floor((panel.y + panel.h - 14 - bt) / 48))
    }
    while (rows.length > cap + 1) rows.pop()
  }

  function spawn() {
    P.push({
      x: -30 - Math.random() * 90,
      y: cy + (Math.random() * 2 - 1) * spread,
      z: 0.42 + Math.random() * 0.58,
      sp: 74 + Math.random() * 54,
      ph: Math.random() * 6.28,
      amp: 6 + Math.random() * 15,
      ch: pickCh(),
      len: 13 + Math.random() * 13,
      rel: false,
      l: 0,
      pulse: Math.random() * 6.28,
    })
  }

  function addRow(ch) {
    rows.unshift({ ch, s: 0, y: 0, init: false })
    if (rows.length > cap + 1) rows.pop()
  }

  function step(dt, t, w) {
    spawnT -= dt
    while (spawnT <= 0) {
      spawnT += 0.2
      if (P.length < 130) spawn()
    }

    // The particle sitting closest to its lane is the one let through next.
    let queued = null
    let qd = 1e9

    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i]
      if (!p.rel) {
        const d = gate - p.x
        p.x += p.sp * dt * (d < 70 ? 0.2 : d < 210 ? 0.66 : 1) * (0.55 + p.z * 0.65)
        p.y += Math.sin(t * 0.75 + p.ph) * p.amp * dt * (d < 230 ? 0.35 : 1)
        if (d < 240) {
          const pull = Math.min(1, (240 - d) / 240)
          let near = lanes[0]
          let best = 1e9
          for (let k = 0; k < lanes.length; k++) {
            const dd = Math.abs(lanes[k] - p.y)
            if (dd < best) {
              best = dd
              near = lanes[k]
              p.l = k
            }
          }
          p.y += (near - p.y) * Math.min(1, pull * pull * 3.2 * dt)
        }
        if (p.x > gate - 9) {
          p.x = gate - 9
          const off = Math.abs(p.y - lanes[p.l])
          if (off < qd) {
            qd = off
            queued = p
          }
        }
      } else {
        p.x += p.sp * dt
        const lim = panel ? panel.x - 2 : w + 60
        if (p.x >= lim) {
          if (panel) {
            // Only one message is absorbed into the list at a time; the rest
            // land as a fainter ripple on the panel edge.
            if (absorbT <= 0) {
              absorbT = 0.82
              addRow(p.ch)
              sparks.push({ x: panel.x, y: p.y, t: 0, b: 1 })
            } else {
              sparks.push({ x: panel.x, y: p.y, t: 0, b: 0 })
            }
          }
          P.splice(i, 1)
          continue
        }
      }
      if (p.x > w + 70) P.splice(i, 1)
    }

    relT -= dt
    absorbT -= dt
    if (relT <= 0 && queued) {
      relT = 0.2
      queued.rel = true
      queued.y = lanes[queued.l]
      queued.sp = 290 + Math.random() * 70
      flash[queued.l] = 1
    }
    for (let f = 0; f < flash.length; f++) flash[f] = Math.max(0, flash[f] - dt * 1.7)
    for (let s = sparks.length - 1; s >= 0; s--) {
      sparks[s].t += dt * 2.4
      if (sparks[s].t > 1) sparks.splice(s, 1)
    }
    for (let r = 0; r < rows.length; r++) rows[r].s = Math.min(1, rows[r].s + dt * 3.4)
  }

  function drawPanel(c) {
    const p = panel
    const rowH = 40
    const gapR = 8
    const bt = p.y + 52

    c.save()
    const glow = c.createRadialGradient(
      p.x + p.w * 0.5, p.y + p.h * 0.5, 10,
      p.x + p.w * 0.5, p.y + p.h * 0.5, p.h * 0.95,
    )
    glow.addColorStop(0, 'rgba(46,168,78,.20)')
    glow.addColorStop(1, 'rgba(46,168,78,0)')
    c.fillStyle = glow
    c.fillRect(p.x - p.h * 0.6, p.y - p.h * 0.4, p.w + p.h * 1.2, p.h * 1.8)

    c.shadowColor = 'rgba(0,0,0,.5)'
    c.shadowBlur = 44
    c.shadowOffsetY = 18
    c.fillStyle = 'rgba(255,255,255,.048)'
    rr(c, p.x, p.y, p.w, p.h, 18)
    c.fill()
    c.shadowBlur = 0
    c.shadowOffsetY = 0
    c.strokeStyle = 'rgba(255,255,255,.15)'
    c.lineWidth = 1
    rr(c, p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1, 18)
    c.stroke()

    /* header */
    c.fillStyle = ACCENT_L
    c.beginPath()
    c.arc(p.x + 20, p.y + 26, 4, 0, 6.29)
    c.fill()
    c.fillStyle = 'rgba(255,255,255,.42)'
    rr(c, p.x + 32, p.y + 23.5, 72, 5, 2.5)
    c.fill()
    for (let d = 0; d < 3; d++) {
      c.fillStyle = 'rgba(255,255,255,.20)'
      c.beginPath()
      c.arc(p.w + p.x - 20 - d * 9, p.y + 26, 1.7, 0, 6.29)
      c.fill()
    }
    c.fillStyle = 'rgba(255,255,255,.10)'
    c.fillRect(p.x + 1, p.y + 43, p.w - 2, 1)

    /* rows */
    c.save()
    rr(c, p.x + 1, bt - 4, p.w - 2, p.y + p.h - bt - 6, 12)
    c.clip()
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i]
      const ty = bt + i * (rowH + gapR)
      if (!r.init) {
        r.y = ty - (rowH + gapR) * 0.55
        r.init = true
      }
      r.y += (ty - r.y) * Math.min(1, dtEase)

      const a = Math.min(1, r.s * 1.4)
      const x = p.x + 10
      const w2 = p.w - 20
      const y = r.y
      const sc = 0.965 + 0.035 * r.s
      // The row pushed past the bottom of the list fades as it goes.
      const fade =
        i >= cap ? Math.max(0, 1 - (r.y - (bt + (cap - 1) * (rowH + gapR))) / (rowH + gapR)) : 1

      c.globalAlpha = a * fade
      c.save()
      c.translate(x + w2 / 2, y + rowH / 2)
      c.scale(sc, sc)
      c.translate(-(x + w2 / 2), -(y + rowH / 2))

      c.fillStyle = 'rgba(255,255,255,.055)'
      rr(c, x, y, w2, rowH, 10)
      c.fill()
      c.strokeStyle = 'rgba(255,255,255,.075)'
      c.lineWidth = 1
      rr(c, x + 0.5, y + 0.5, w2 - 1, rowH - 1, 10)
      c.stroke()

      c.fillStyle = 'rgba(' + CH[r.ch] + ',.85)'
      c.beginPath()
      c.arc(x + 21, y + rowH / 2, 10, 0, 6.29)
      c.fill()
      c.fillStyle = 'rgba(11,20,15,.55)'
      c.beginPath()
      c.arc(x + 21, y + rowH / 2, 3.4, 0, 6.29)
      c.fill()

      c.fillStyle = 'rgba(255,255,255,.44)'
      rr(c, x + 40, y + 12, Math.min(58, w2 * 0.3), 4.5, 2.2)
      c.fill()
      c.fillStyle = 'rgba(255,255,255,.17)'
      rr(c, x + 40, y + 23, Math.min(112, w2 * 0.56), 4, 2)
      c.fill()

      if (i === 0) {
        c.fillStyle = ACCENT_L
        c.globalAlpha = a * fade * (0.55 + 0.45 * Math.sin(clock * 3))
        c.beginPath()
        c.arc(x + w2 - 16, y + rowH / 2, 3.6, 0, 6.29)
        c.fill()
      } else {
        c.fillStyle = 'rgba(255,255,255,.13)'
        rr(c, x + w2 - 32, y + rowH / 2 - 1.5, 18, 3, 1.5)
        c.fill()
      }
      if (r.s < 1) {
        c.globalAlpha = (1 - r.s) * 0.5
        c.fillStyle = '#8CE0A8'
        rr(c, x, y, w2, rowH, 10)
        c.fill()
      }
      c.restore()
      c.globalAlpha = 1
    }
    c.restore()
    c.restore()
  }

  return function draw(c, w, h, t, dt) {
    if (!seeded || w !== W || h !== H) {
      layout(w, h)
      if (!seeded) {
        seeded = true
        for (let s = 0; s < 1100; s++) {
          clock += 1 / 60
          step(1 / 60, clock, w)
        }
      }
    }
    clock += dt
    step(dt, clock, w)
    dtEase = Math.min(1, dt * 11)

    if (heroPointer.on) {
      ox += (heroPointer.x - ox) * Math.min(1, dt * 3)
      oy += (heroPointer.y - oy) * Math.min(1, dt * 3)
    } else {
      ox += (0 - ox) * Math.min(1, dt * 2)
      oy += (0 - oy) * Math.min(1, dt * 2)
    }

    c.clearRect(0, 0, w, h)
    c.save()
    c.translate(ox * 10, oy * 8)

    /* dot field */
    c.fillStyle = 'rgba(255,255,255,.045)'
    for (let gx = 26; gx < w + 20; gx += 36)
      for (let gy = 26; gy < h + 20; gy += 36) c.fillRect(gx, gy, 1, 1)

    /* aurora behind the gate */
    const au = c.createRadialGradient(gate, cy, 10, gate, cy, Math.max(w, h) * 0.55)
    au.addColorStop(0, 'rgba(46,168,78,.13)')
    au.addColorStop(0.55, 'rgba(46,168,78,.04)')
    au.addColorStop(1, 'rgba(46,168,78,0)')
    c.fillStyle = au
    c.fillRect(0, 0, w, h)

    /* lanes, brightening as each one fires */
    const right = panel ? panel.x : w
    for (let li = 0; li < lanes.length; li++) {
      const g = c.createLinearGradient(gate, 0, right, 0)
      const base = 0.1 + flash[li] * 0.42
      g.addColorStop(0, 'rgba(160,235,186,' + base + ')')
      g.addColorStop(1, 'rgba(160,235,186,' + base * 0.15 + ')')
      c.strokeStyle = g
      c.lineWidth = 1
      c.beginPath()
      c.moveTo(gate, lanes[li])
      c.lineTo(right, lanes[li])
      c.stroke()
    }

    /* gate */
    const top = lanes[0] - 30
    const bot = lanes[lanes.length - 1] + 30
    const gmid = (top + bot) / 2
    const gg = c.createRadialGradient(gate, gmid, 4, gate, gmid, (bot - top) * 0.85)
    gg.addColorStop(0, 'rgba(94,203,126,.26)')
    gg.addColorStop(0.45, 'rgba(94,203,126,.10)')
    gg.addColorStop(1, 'rgba(94,203,126,0)')
    c.fillStyle = gg
    c.fillRect(gate - (bot - top), top - (bot - top) * 0.5, (bot - top) * 2, (bot - top) * 2)

    const lg = c.createLinearGradient(0, top, 0, bot)
    lg.addColorStop(0, 'rgba(168,240,196,0)')
    lg.addColorStop(0.12, 'rgba(168,240,196,.8)')
    lg.addColorStop(0.88, 'rgba(168,240,196,.8)')
    lg.addColorStop(1, 'rgba(168,240,196,0)')
    c.strokeStyle = lg
    c.lineWidth = 1.4
    c.beginPath()
    c.moveTo(gate + 0.5, top)
    c.lineTo(gate + 0.5, bot)
    c.stroke()

    const sweep = top + ((clock * 0.34) % 1) * (bot - top)
    const sg = c.createLinearGradient(0, sweep - 40, 0, sweep + 40)
    sg.addColorStop(0, 'rgba(200,255,220,0)')
    sg.addColorStop(0.5, 'rgba(200,255,220,.85)')
    sg.addColorStop(1, 'rgba(200,255,220,0)')
    c.strokeStyle = sg
    c.lineWidth = 2
    c.beginPath()
    c.moveTo(gate + 0.5, sweep - 40)
    c.lineTo(gate + 0.5, sweep + 40)
    c.stroke()

    c.strokeStyle = 'rgba(168,240,196,.35)'
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(gate - 13, top + 2)
    c.lineTo(gate, top + 2)
    c.moveTo(gate - 13, bot - 2)
    c.lineTo(gate, bot - 2)
    c.stroke()

    /* particles */
    for (let j = 0; j < P.length; j++) {
      const q = P[j]
      const col = CH[q.ch]
      if (q.rel) {
        const tg = c.createLinearGradient(q.x - 58, 0, q.x, 0)
        tg.addColorStop(0, 'rgba(' + col + ',0)')
        tg.addColorStop(1, 'rgba(' + col + ',.5)')
        c.strokeStyle = tg
        c.lineWidth = 2.2
        c.beginPath()
        c.moveTo(q.x - 58, q.y)
        c.lineTo(q.x - 4, q.y)
        c.stroke()
        c.shadowColor = 'rgba(' + col + ',.85)'
        c.shadowBlur = 20
        bub(c, q.x - q.len, q.y - 5.5, q.len, 11, 'rgb(' + col + ')', 1)
        c.shadowBlur = 0
      } else {
        const a = 0.16 + 0.3 * q.z + 0.1 * Math.sin(clock * 1.3 + q.pulse)
        pill(c, q.x - q.len * q.z, q.y - 3.5 * q.z, q.len * q.z, 7 * q.z, 'rgba(' + col + ',' + a.toFixed(3) + ')', 1)
      }
    }

    /* absorption ripples */
    for (let sp = 0; sp < sparks.length; sp++) {
      const k = sparks[sp]
      const e = k.t
      const bg = k.b ? 1 : 0.45
      c.strokeStyle = 'rgba(180,245,205,' + ((1 - e) * 0.7 * bg).toFixed(3) + ')'
      c.lineWidth = k.b ? 1.5 : 1
      c.beginPath()
      c.arc(k.x, k.y, 4 + e * (k.b ? 24 : 11), 0, 6.29)
      c.stroke()
    }

    if (panel) drawPanel(c)
    c.restore()

    /* vignette */
    const vg = c.createLinearGradient(0, h - 140, 0, h)
    vg.addColorStop(0, 'rgba(11,20,15,0)')
    vg.addColorStop(1, 'rgba(11,20,15,.55)')
    c.fillStyle = vg
    c.fillRect(0, h - 140, w, 140)
  }
}
