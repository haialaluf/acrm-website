import SectionHead from './SectionHead.jsx'
import { useCopy } from '../i18n/index.js'

export default function Cta() {
  const { cta } = useCopy()
  return (
    <section className="sec dark cta">
      <div className="wrap">
        <SectionHead plain label={cta.label} title={cta.title} lede={cta.lede}>
          <div className="hero-actions">
            <a className="btn btn-light" href={cta.primary.href} data-cta="end-trial">
              {cta.primary.label}
            </a>
            <a className="btn btn-dark-ghost" href={cta.secondary.href} data-cta="end-whatsapp">
              {cta.secondary.label}
            </a>
          </div>
          {cta.note && <p className="hero-note">{cta.note}</p>}
        </SectionHead>
      </div>
    </section>
  )
}
