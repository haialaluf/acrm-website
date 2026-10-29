import { Label, Split, delay } from './bits.jsx'
import { useCopy } from '../i18n/index.js'

/** Everything it covers, as tiles wired to the logo; behaviors.js draws the wires. */
export default function AllInOne() {
  const { allInOne } = useCopy()
  const half = Math.ceil(allInOne.items.length / 2)
  const col = (items, from, side) => (
    <div className={`hub-col ${side}`}>
      {items.map((item, i) => (
        <div className="tile" data-rv="" style={i ? delay(`${i * 0.06}s`) : undefined} key={item}>
          <span className="tn">{String(from + i + 1).padStart(2, '0')}</span>
          {item}
        </div>
      ))}
    </div>
  )

  return (
    <section className="screen" id="all" data-theme="light">
      <div className="wrap">
        <div className="head-c">
          <Label text={allInOne.label} />
          <Split text={allInOne.title} />
          <p className="lede" data-rv="" style={delay('.2s')}>
            {allInOne.lede}
          </p>
        </div>
        <div className="hub" id="hub">
          <svg id="hubsvg" aria-hidden="true" />
          {col(allInOne.items.slice(0, half), 0, 'l')}
          <div className="core" data-rv="">
            <div className="core-in">
              <img src="/assets/delacrm-mark.png" alt="" />
              <b>delaCRM</b>
            </div>
          </div>
          {col(allInOne.items.slice(half), half, 'r')}
        </div>
      </div>
    </section>
  )
}
