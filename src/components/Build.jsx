import { Label, Split, Arrow, delay } from './bits.jsx'
import { useCopy } from '../i18n/index.js'

/**
 * Building a new process by asking Claude or ChatGPT for it. The window on
 * the right plays the whole exchange: the request typed and sent, the draft
 * drawn step by step, then switched on.
 */
export default function Build() {
  const { build } = useCopy()
  const c = build.chat
  const dim = { background: '#2A3A31' }
  // A flow step appears every half second, an arrow before each but the first.
  const nodeAt = [7200, 7700, 8200, 8700]

  return (
    <section className="screen dk" id="build" data-theme="dark">
      <div className="wrap">
        <div className="split">
          <div>
            <Label text={build.label} />
            <Split text={build.title} />
            <p className="lede" data-rv="" style={delay('.2s')}>
              {build.lede}
            </p>
            <ol className="steps-n" data-rv="" style={delay('.3s')}>
              {build.steps.map((s) => (
                <li key={s.title}>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div data-rv="" style={delay('.2s')}>
            <div className="aiwin" id="aiwin" data-dur="15500">
              <div className="ai-top">
                <span className="dv-dots">
                  <i style={dim} />
                  <i style={dim} />
                  <i style={dim} />
                </span>
                <b>{c.app}</b>
                <span className="ai-conn">
                  <span className="pulse" />
                  {c.connected}
                </span>
              </div>
              <div className="ai-body">
                <div className="ai-me" data-at="4100">
                  {c.ask}
                </div>
                <div
                  className="typing in"
                  data-at="4600"
                  data-off="5700"
                  style={{ background: 'var(--dark-3)', borderColor: 'var(--dark-rule)' }}
                >
                  <i />
                  <i />
                  <i />
                </div>
                <div className="ai-re" data-at="5700">
                  <span className="who">{c.app}</span>
                  {c.reply}
                </div>
                <div className="flow" data-at="6700">
                  <div className="flow-h">
                    <span>{c.saved}</span>
                    <span className="tgl" data-at="12200" data-add="is-on">
                      <span className="t-off">{c.draft}</span>
                      <span className="t-on">{c.live}</span>
                      <i />
                    </span>
                  </div>
                  <div className="flow-nodes">
                    {c.nodes.map((n, i) => [
                      i > 0 && <span className="fa" data-at={nodeAt[i] - 100} key={`a${i}`} />,
                      <div className={i === c.nodes.length - 1 ? 'fn hot' : 'fn'} data-at={nodeAt[i]} key={i}>
                        <small>{n.k}</small>
                        {n.v}
                      </div>,
                    ])}
                  </div>
                </div>
                <div className="ai-me" data-at="11400">
                  {c.yes}
                </div>
                <div className="ai-re" data-at="12600">
                  <span className="who">{c.app}</span>
                  {c.done}
                </div>
              </div>
              <div className="ai-input">
                <span className="ty" data-at="300" data-off="4100" data-type={c.ask} />
                <span className="ty" data-at="10000" data-off="11400" data-type={c.yes} />
                <span className="ph">{c.placeholder}</span>
                <span className="send" data-at="3800" data-off="4300" data-add="go" />
              </div>
            </div>
            <p className="cap">{c.caption}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** The three ways to build a process, and the kind of thing people ask for. */
export function Ways() {
  const { build } = useCopy()
  const { ways } = build
  const [editor, words, us] = ways.items

  return (
    <section className="screen dk" id="ways" data-theme="dark" style={{ borderTop: '1px solid var(--dark-rule)' }}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <Label text={ways.label} />
            <Split text={ways.title} />
          </div>
          <div data-rv="" style={delay('.2s')}>
            <p className="lede">{build.note}</p>
          </div>
        </div>
        <div className="ways" id="ways-g">
          <div className="way" data-rv="">
            <span className="wn">01</span>
            <div className="vis">
              <div className="v-steps">
                {[0, 1, 2, 3].map((k) => [
                  k > 0 && <b key={`b${k}`} />,
                  <i style={{ '--k': k }} key={k} />,
                ])}
              </div>
            </div>
            <h3>{editor.title}</h3>
            <p>{editor.body}</p>
          </div>
          <div className="way" data-rv="" style={delay('.1s')}>
            <span className="wn">02</span>
            <div className="vis">
              <div className="v-words">{build.examples[0]}</div>
            </div>
            <h3>{words.title}</h3>
            <p>{words.body}</p>
          </div>
          <div className="way feat" data-rv="" style={delay('.2s')}>
            <span className="wn">03</span>
            <div className="vis">
              <div className="v-us">
                {ways.us.map((u) => (
                  <span key={u}>{u}</span>
                ))}
                <span className="me">{ways.you}</span>
              </div>
            </div>
            <h3>{us.title}</h3>
            <p>{us.body}</p>
            <a className="btn btn-solid btn-sm" href={us.cta.href} data-cta="build-setup">
              {us.cta.label} <Arrow />
            </a>
          </div>
        </div>
        <div className="marq" data-rv="" style={delay('.3s')}>
          {/* Four copies, so the strip can slide half its width and loop. */}
          <div className="marq-t">
            {[0, 1, 2, 3].flatMap((n) => build.examples.map((e) => <span key={`${n}${e}`}>{e}</span>))}
          </div>
        </div>
      </div>
    </section>
  )
}
