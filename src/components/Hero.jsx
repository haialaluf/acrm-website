import { Split, Arrow, delay } from './bits.jsx'
import { useCopy } from '../i18n/index.js'

/**
 * The headline beside a live inbox. behaviors.js plays the inbox's scenes
 * into `#msgs` and floats the two chips beside it.
 */
export default function Hero() {
  const t = useCopy()
  // ?v=<key> swaps in the headline written for one ad group, so the page a
  // visitor lands on continues the ad they clicked.
  const variant = new URLSearchParams(window.location.search).get('v')
  const hero = { ...t.hero, ...t.hero.variants?.[variant] }
  const dv = hero.device
  const first = dv.convs[0]

  return (
    <section className="screen dk hero" id="top" data-theme="dark">
      <div className="hero-bg">
        <div className="glow" />
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow mono" data-rv="">
            <span className="pulse" />
            <span>{hero.eyebrow}</span>
          </div>
          <Split as="h1" className={null} text={hero.title} />
          <p className="hero-lede" data-rv="" style={delay('.35s')}>
            {hero.lede}
          </p>
          <div className="actions" data-rv="" style={delay('.5s')}>
            <a className="btn btn-solid" href={hero.primary.href} data-cta="hero-trial">
              {hero.primary.label} <Arrow />
            </a>
            {hero.secondary && (
              <a className="btn btn-line" href={hero.secondary.href} data-cta="hero-whatsapp">
                {hero.secondary.label}
              </a>
            )}
          </div>
          <p className="hero-note" data-rv="" style={delay('.6s')}>
            {hero.note}
          </p>
        </div>
        <div className="dv-wrap" data-rv="" style={delay('.3s')}>
          <div className="device" id="device">
            <div className="dv-top">
              <span className="dv-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="dv-title">{dv.title}</span>
              <span className="dv-status">
                <span className="pulse" />
                {dv.status}
              </span>
            </div>
            <div className="dv-body">
              <aside className="dv-list" id="convs">
                <div className="dv-search">{dv.search}</div>
                {dv.convs.map((c) => (
                  <div className="conv" key={c.name}>
                    <span className="av">{c.av}</span>
                    <b>{c.name}</b>
                    <small>{c.time}</small>
                    <p>{c.prev}</p>
                    <span className="badge">1</span>
                  </div>
                ))}
              </aside>
              <section className="dv-thread">
                <div className="th-head">
                  <span className="av" id="th-av">
                    {first.av}
                  </span>
                  <div>
                    <b id="th-name">{first.name}</b>
                    <small id="th-sub">{first.sub}</small>
                  </div>
                  <span className="th-tag" id="th-tag">
                    {first.tag}
                  </span>
                </div>
                <div className="msgs" id="msgs" />
                <div className="th-input">
                  {dv.input}
                  <span className="send" />
                </div>
              </section>
            </div>
          </div>
          <Chip id="chipA" side="a" kv={dv.chips.a} />
          <Chip id="chipB" side="b" kv={dv.chips.b} />
        </div>
      </div>
      <div className="wrap">
        <div className="rail" data-rv="" style={delay('.7s')}>
          {t.facts.map((f) => (
            <div key={f.title}>
              <h4>
                {f.title} {f.mark && <span className="meta-mark">{f.mark}</span>}
              </h4>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Chip({ id, side, kv }) {
  return (
    <div className={`fchip fchip-${side} hide`} id={id}>
      <span className="ic" />
      <div>
        <small id={`${id}-k`}>{kv[0]}</small>
        <span id={`${id}-v`}>{kv[1]}</span>
      </div>
    </div>
  )
}
