import { Label, Split, delay } from './bits.jsx'
import { useCopy } from '../i18n/index.js'

const tick = <span className="ck" style={{ color: 'var(--bright)' }} />

/**
 * The three steps to start, each over a small picture of it happening. The
 * pictures play one after another as a single 8-second loop.
 */
export default function GettingStarted() {
  const { gettingStarted: gs } = useCopy()
  const [connect, bring, choose] = gs.items.map((s) => s.demo)
  const pictures = [
    <>
      <div className="fbbtn" data-at="900" data-add="press">
        <i />
        {connect.button}
      </div>
      <div className="row" data-at="1800">
        {tick}
        {connect.rows[0]}
        <span className="st chip-s">{connect.live}</span>
      </div>
      <div className="row" data-at="2600">
        {tick}
        {connect.rows[1]}
      </div>
    </>,
    <>
      <div className="row" data-at="3000" data-add="is-on" style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{bring.file}</span>
          <span className="chip-s">{bring.kind}</span>
        </div>
        <div className="bar-p">
          <i />
        </div>
      </div>
      <div className="row" data-at="3800">
        {tick}
        {bring.rows[0]}
      </div>
      <div className="row" data-at="4500">
        {tick}
        {bring.rows[1]}
      </div>
    </>,
    <>
      {choose.toggles.map((label, i) => (
        <div className="row" data-at={5200 + i * 600} data-add="is-on" key={label}>
          {label}
          <span className="sw" />
        </div>
      ))}
    </>,
  ]

  return (
    <section className="screen tint" id="how" data-theme="light">
      <div className="wrap">
        <div className="head-row">
          <div>
            <Label text={gs.label} />
            <Split text={gs.title} />
          </div>
          <div data-rv="" style={delay('.2s')}>
            <p className="lede">{gs.lede}</p>
          </div>
        </div>
        <div className="start" id="start" data-dur="8000">
          {gs.items.map((s, i) => (
            <div className="sc" data-rv="" style={i ? delay(`.${i}s`) : undefined} key={s.title}>
              <div className="sc-vis">
                <div className="mini">{pictures[i]}</div>
              </div>
              <div className="sc-txt">
                <span className="mono">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
