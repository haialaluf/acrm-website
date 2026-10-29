/**
 * One message in a scripted chat. `at` and `off` become the data attributes
 * the player in behaviors.js times them by. The hero inbox builds the same
 * shapes itself, in `bubble` there.
 */
export function Msg({ m }) {
  const at = { 'data-at': m.at, 'data-off': m.off }
  switch (m.k) {
    case 'typing':
      return (
        <div className="typing out" {...at}>
          <i />
          <i />
          <i />
        </div>
      )
    case 'vline':
      return <div className="vline" {...at} />
    case 'sys':
      return (
        <div className={m.tone ? `b-sys ${m.tone}` : 'b-sys'} {...at}>
          {m.tone === 'ok' && <span className="ck" />}
          {m.text}
        </div>
      )
    case 'lead':
      return (
        <div className="mc" {...at}>
          <div className="mt">
            <span className="chip-s fb">{m.chip}</span>
            <span>{m.time}</span>
          </div>
          <b>{m.name}</b>
          <span>{m.detail}</span>
        </div>
      )
    case 'slots':
      return (
        <div className="mc" {...at}>
          <div className="mt">
            <span>{m.title}</span>
            <span>{m.note}</span>
          </div>
          <div className="days">
            {m.days.map((d, i) => (
              <i key={d} className={i === m.day ? 'on2' : undefined}>
                {d}
              </i>
            ))}
          </div>
          <div className="slots">
            {m.slots.map((s, i) =>
              i === m.pick ? (
                <i key={s} data-at={m.pickAt} data-add="pick">
                  {s}
                </i>
              ) : (
                <i key={s} className={m.taken.includes(i) ? 'x' : undefined}>
                  {s}
                </i>
              ),
            )}
          </div>
        </div>
      )
    case 'appt':
      return (
        <div className="mc" {...at}>
          <div className="mt">
            <span className="chip-s">{m.chip}</span>
            <span>{m.when}</span>
          </div>
          <b>{m.name}</b>
          {m.rems.map((r) => (
            <div className="rem" key={r.label} data-at={r.at} data-add="sent">
              <span>{r.label}</span>
              <span className="st" data-wait={m.wait} data-done={m.done} />
            </div>
          ))}
        </div>
      )
    case 'recipients':
      return (
        <div className="mc" {...at}>
          <div className="mt">
            <span>{m.title}</span>
            <span>{m.note}</span>
          </div>
          {m.rows.map((r) => (
            <div
              className="rcp"
              key={r.name}
              data-at={r.goneAt}
              data-add={r.goneAt ? 'gone' : undefined}
            >
              <span className="av">{r.av}</span>
              <span>{r.name}</span>
              <span className="st">{m.sent}</span>
              {r.goneAt && <span className="st2">{m.removed}</span>}
            </div>
          ))}
        </div>
      )
    default:
      return (
        <div className={`b b-${m.k}`} {...at}>
          {m.who && <span className={m.you || m.k === 'in' ? 'who you' : 'who'}>{m.who}</span>}
          {m.text}
          {m.link && (
            <>
              <br />
              <a href="#work">{m.link}</a>
            </>
          )}
        </div>
      )
  }
}

/** A chat's header: who it's with, and a tag on the far side. */
export function ThreadHead({ av, name, sub, tag, ids }) {
  return (
    <div className="th-head">
      <span className="av" id={ids?.av}>
        {av}
      </span>
      <div>
        <b id={ids?.name}>{name}</b>
        <small id={ids?.sub}>{sub}</small>
      </div>
      <span className="th-tag" id={ids?.tag}>
        {tag}
      </span>
    </div>
  )
}
