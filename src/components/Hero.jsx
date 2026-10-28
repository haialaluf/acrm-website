import { useEffect, useRef } from 'react'
import Canvas from './Canvas.jsx'
import { heroPointer } from '../anims/pointer.js'
import { REDUCED } from '../reduced-motion.js'
import { useLocale } from '../i18n/index.js'

export default function Hero() {
  const { t, dir } = useLocale()
  // ?v=<key> swaps in the headline written for one ad group, so the page a
  // visitor lands on continues the ad they clicked.
  const variant = new URLSearchParams(window.location.search).get('v')
  const hero = { ...t.hero, ...t.hero.variants?.[variant] }
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
        {/* No reveal here: the hero is the first thing on screen, and text
            that waits on a script to fade in reads as an empty page. */}
        <div className="hero-copy">
          <div className="eyebrow mono">
            <span className="dot" />
            {hero.eyebrow}
          </div>
          <h1>{hero.title}</h1>
          <p className="stage-sub">{hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-light" href={hero.primary.href} data-cta="hero-trial">
              {hero.primary.label}
            </a>
            <a className="btn btn-dark-ghost" href={hero.secondary.href} data-cta="hero-whatsapp">
              {hero.secondary.label}
            </a>
          </div>
          {hero.note && <p className="hero-note">{hero.note}</p>}
        </div>
      </div>
    </section>
  )
}
