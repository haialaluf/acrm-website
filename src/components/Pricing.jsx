import { Label, Split, Arrow, delay } from './bits.jsx'
import { useCopy } from '../i18n/index.js'

/** What you pay now, the price it replaces (struck through as it scrolls in), and the unit. */
function Price({ price, wasFirst }) {
  const was = (
    <span className="p-was" aria-label={price.wasLabel}>
      {price.was}
    </span>
  )
  return (
    <div className="price">
      {wasFirst && was}
      <span className="p-now">{price.now}</span>
      {!wasFirst && was}
      <span className="p-unit">{price.unit}</span>
    </div>
  )
}

/**
 * One plan, so one card: the subscription, with everything in it. The setup
 * package sits under it as a band, so it reads as an optional extra.
 */
export default function Pricing() {
  const { pricing } = useCopy()
  const { plan, setup } = pricing

  return (
    <section className="screen" id="pricing" data-theme="light">
      <div className="wrap">
        <div className="split">
          <div className="p-side">
            <Label text={pricing.label} />
            <Split text={pricing.title} />
            <p className="lede" data-rv="" style={delay('.2s')}>
              {pricing.lede}
            </p>
            <p className="p-foot" data-rv="" style={delay('.3s')}>
              {pricing.footnote}
            </p>
          </div>
          <div className="plans">
            <div className="plan" data-rv="">
              <div className="p-main">
                <div className="p-head">
                  <h3>{plan.name}</h3>
                  <span className="p-badge">{plan.badge}</span>
                </div>
                <Price price={plan.price} />
                <p className="p-note">{plan.price.note}</p>
                <p className="p-desc">{plan.desc}</p>
                <div className="p-cta">
                  <a
                    className="btn btn-solid"
                    href={plan.cta.href}
                    data-cta="pricing-trial"
                    style={{ background: 'var(--paper)', color: 'var(--ink)' }}
                  >
                    {plan.cta.label} <Arrow />
                  </a>
                  <span className="terms">{plan.terms}</span>
                </div>
              </div>
              <ul className="p-list">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="setup" data-rv="" style={delay('.15s')}>
              <div>
                <div className="p-head">
                  <h3>{setup.name}</h3>
                  <span className="p-badge lt">{setup.badge}</span>
                </div>
                <p>{setup.desc}</p>
              </div>
              <div className="setup-buy">
                <Price price={setup.price} wasFirst />
                <a className="btn btn-line btn-sm" href={setup.cta.href} data-cta="pricing-setup">
                  {setup.cta.label} <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
