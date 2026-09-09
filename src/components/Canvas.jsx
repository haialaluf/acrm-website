import useCanvasAnim from '../hooks/useCanvasAnim.js'

/** A bare animated canvas — used full-bleed behind the hero. */
export default function Canvas({ anim, ...rest }) {
  const ref = useCanvasAnim(anim)
  return <canvas ref={ref} aria-hidden="true" {...rest} />
}
