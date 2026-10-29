import { Label, Split, Arrow, delay } from './bits.jsx'
import { Msg, ThreadHead } from './Chat.jsx'
import { useCopy } from '../i18n/index.js'
import { APP } from '../content/index.js'

/**
 * The five jobs it takes off your hands, as tabs that open in turn, each
 * playing its own chat in the phone beside them.
 */
export default function Work() {
  const { work } = useCopy()
  const pad = (i) => String(i + 1).padStart(2, '0')

  return (
    <section className="screen" id="work" data-theme="light">
      <div className="wrap">
        <div className="head-row">
          <div>
            <Label text={work.label} />
            <Split text={work.title} />
          </div>
          <div data-rv="" style={delay('.2s')}>
            <p className="lede">{work.lede}</p>
          </div>
        </div>
        <div className="work-body" id="workBox">
          <div className="wlist" data-rv="">
            {work.items.map((w, i) => (
              <button className="wi" type="button" key={w.title}>
                <span className="bar" />
                <span className="n">{pad(i)}</span>
                <div>
                  <h3>{w.title}</h3>
                  <div className="bd">
                    <div>
                      <p>{w.body}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
            <div className="work-foot">
              <a className="btn btn-solid" href={APP} data-cta="work-trial">
                {work.cta} <Arrow />
              </a>
              <span className="terms">{work.note}</span>
            </div>
          </div>
          <div className="stagebox" data-rv="" style={delay('.15s')}>
            <div className="phone">
              {work.demos.map((d, i) => (
                <div className="demo" data-dur={d.dur} key={i}>
                  <ThreadHead av={d.av} name={d.name} sub={d.sub} tag={d.tag} />
                  <div className="msgs">
                    {d.msgs.map((m, j) => (
                      <Msg m={m} key={j} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <span className="stage-cap" id="wcap" dir="ltr">
              01 / {pad(work.demos.length - 1)}
            </span>
            <span className="stage-cap r">{work.stage}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
