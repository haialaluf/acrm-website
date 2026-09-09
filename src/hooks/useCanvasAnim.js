import { useEffect, useRef } from 'react'
import { fit } from '../anims/draw.js'
import { makers } from '../anims/index.js'
import { REDUCED } from '../reduced-motion.js'

/**
 * Drives one of the canvas animations on a ref'd <canvas>.
 *
 * Only runs while the canvas is on screen and the tab is visible, so the
 * hero's particle sim isn't burning frames in a background tab. Honours
 * prefers-reduced-motion by painting a single representative frame.
 */
export default function useCanvasAnim(name) {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const maker = makers[name]
    if (!cv || !maker) return

    const draw = maker()
    let { ctx, w, h } = fit(cv)
    let live = false
    let raf = 0
    let t = 0
    let prev = 0
    let onScreen = false

    function frame(now) {
      if (!live) return
      const s = now / 1000
      const dt = prev ? Math.min(0.05, s - prev) : 0.016
      prev = s
      t += dt
      draw(ctx, w, h, t, dt)
      raf = requestAnimationFrame(frame)
    }
    function start() {
      if (live) return
      live = true
      prev = 0
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      live = false
      cancelAnimationFrame(raf)
    }

    const ro = new ResizeObserver(() => {
      ;({ ctx, w, h } = fit(cv))
      draw(ctx, w, h, t, 0)
    })
    ro.observe(cv)

    if (REDUCED) {
      draw(ctx, w, h, 2.4, 0)
      return () => ro.disconnect()
    }

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          onScreen = e.isIntersecting
          onScreen && !document.hidden ? start() : stop()
        })
      },
      { rootMargin: '120px' },
    )
    io.observe(cv)

    const onVis = () => (document.hidden || !onScreen ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [name])

  return ref
}
