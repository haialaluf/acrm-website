import { useEffect } from 'react'
import { REDUCED } from '../reduced-motion.js'

/** Stagger between siblings that share a reveal group, in ms. */
const STEP = 70

/**
 * Fades every `[data-rv]` element in as it scrolls into view, once. The
 * attribute's value is the element's place in its group, used to stagger the
 * reveal — so the hero's headline lands a beat after its eyebrow.
 *
 * Called once from App. `dep` re-points the observer at a fresh set of
 * elements: the marked elements never change on their own, but switching
 * language replaces nearly all of them.
 */
export default function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-rv]')
    if (!els.length) return

    if (REDUCED) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    const timers = []
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return
          const d = Number(e.target.getAttribute('data-rv')) || 0
          timers.push(setTimeout(() => e.target.classList.add('in'), d * STEP))
          io.unobserve(e.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [dep])
}
