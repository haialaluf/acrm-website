import Viz from './Viz.jsx'

/** Label / prose+tags / animated tile rows, shared by the platform and agent sections. */
export default function FeatureRows({ rows }) {
  return (
    <div className="rows">
      {rows.map((r) => (
        <div className="row" data-rv="0" key={r.title}>
          <div className="mono">{r.label}</div>
          <div>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
            <div className="tags">
              {r.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Viz anim={r.viz.anim} caption={r.viz.caption} />
        </div>
      ))}
    </div>
  )
}
