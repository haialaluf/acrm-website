import { Label, Split, Arrow, delay } from './bits.jsx'
import Footer from './Footer.jsx'
import { useCopy } from '../i18n/index.js'

/** The closing call to action, with the footer inside the same dark screen. */
export default function Cta() {
  const { cta } = useCopy()
  return (
    <section className="screen dk cta" id="start-cta" data-theme="dark">
      <div className="cta-bg">
        <i style={{ '--s': '40vmin', '--dl': '0s' }} />
        <i style={{ '--s': '62vmin', '--dl': '2s' }} />
        <i style={{ '--s': '84vmin', '--dl': '4s' }} />
      </div>
      <div className="wrap">
        <div className="cta-c">
          <img className="cta-mark" src="/assets/delacrm-mark.png" alt="" data-rv="" />
          <Label text={cta.label} style={{ marginTop: 20 }} />
          <Split text={cta.title} />
          <p className="lede" data-rv="" style={delay('.2s')}>
            {cta.lede}
          </p>
          <div className="actions" data-rv="" style={delay('.3s')}>
            <a className="btn btn-solid" href={cta.primary.href} data-cta="cta-trial">
              {cta.primary.label} <Arrow />
            </a>
            <a className="btn btn-line" href={cta.secondary.href} data-cta="cta-contact">
              {cta.secondary.label}
            </a>
          </div>
          <p className="terms" data-rv="" style={delay('.4s')}>
            {cta.note}
          </p>
        </div>
      </div>
      <Footer />
    </section>
  )
}
