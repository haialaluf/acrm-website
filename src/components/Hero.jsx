import { useEffect, useRef } from 'react'
import Canvas from './Canvas.jsx'
import { heroPointer } from '../anims/pointer.js'
import { REDUCED } from '../reduced-motion.js'
import { useLocale } from '../i18n/index.js'

export default function Hero() {
  const { t, dir } = useLocale()
  const { hero } = t
  const stage = useRef(null)

  // Feeds the cursor position to the flow animation, which drifts the whole
  // scene a few pixels towards it. Right-to-left mirrors the canvas in CSS, so
  // the horizontal reading has to be mirrored with it to keep the drift
  // following the cursor rather than running away from it.
  useEffect(() => {
    const el = stage.current
    if (!el || REDUCED) return
    const flip = dir === 'rtl' ? -1 : 1

    const rest = () => {
      heroPointer.x = 0
      heroPointer.y = 0
      heroPointer.on = false
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      heroPointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2 * flip
      heroPointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2
      heroPointer.on = true
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', rest, { passive: true })
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', rest)
      rest()
    }
  }, [dir])

  return (
    <section className="stage" ref={stage}>
      <Canvas anim="flow" />
      <div className="stage-veil" aria-hidden="true" />
      <div className="wrap stage-in">
        <div className="hero-copy">
          <div className="eyebrow mono" data-rv="0">
            <span className="dot" />
            {hero.eyebrow}
          </div>
          <h1 data-rv="1">{hero.title}</h1>
          <p className="stage-sub" data-rv="2">
            {hero.lede}
          </p>
          <div className="hero-actions" data-rv="3">
            <a className="btn btn-light" href={hero.primary.href}>
              {hero.primary.label}
            </a>
            <a className="btn btn-dark-ghost" href={hero.secondary.href}>
              {hero.secondary.label}
            </a>
          </div>
        </div>
        <div className="stage-rail mono" data-rv="4">
          {hero.rail.map((r) => (
            <span key={r.strong}>
              {r.text}
              <b>{r.strong}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
