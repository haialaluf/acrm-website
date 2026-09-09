import Canvas from './Canvas.jsx'

/** An animated diagram tile with its caption, as used in the feature rows. */
export default function Viz({ anim, caption }) {
  return (
    <figure className="viz">
      <Canvas anim={anim} />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
