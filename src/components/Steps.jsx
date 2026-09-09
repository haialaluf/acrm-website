/** Three-across column set with a mono label above each heading. */
export default function Steps({ items }) {
  return (
    <div className="steps" data-rv="0">
      {items.map((s) => (
        <div className="step" key={s.title}>
          <div className="mono">{s.label}</div>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  )
}
