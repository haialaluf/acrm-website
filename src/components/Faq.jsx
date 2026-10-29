import { useState } from 'react'
import { Label, Split, Arrow, delay } from './bits.jsx'
import { useCopy } from '../i18n/index.js'

/** One answer open at a time; the first starts open. */
export default function Faq() {
  const { faq } = useCopy()
  const [open, setOpen] = useState(0)

  return (
    <section className="screen" id="faq" data-theme="light" style={{ borderTop: '1px solid var(--rule)' }}>
      <div className="wrap">
        <div className="split top">
          <div className="faq-side">
            <Label text={faq.label} />
            <Split text={faq.title} />
            <a className="btn btn-line" href={faq.cta.href} data-cta="faq-contact" data-rv="" style={delay('.2s')}>
              {faq.cta.label} <Arrow />
            </a>
          </div>
          <div className="faq" data-rv="" style={delay('.1s')}>
            {faq.items.map((f, i) => (
              <div className={i === open ? 'qa open' : 'qa'} key={f.q}>
                <button type="button" aria-expanded={i === open} onClick={() => setOpen(i === open ? -1 : i)}>
                  {f.q}
                  <span className="pm" />
                </button>
                <div className="ans">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
