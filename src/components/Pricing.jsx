import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'

/** What you pay now, the struck-through price it replaces, and the unit. */
function Price({ price }) {
  return (
    <div className="price">
      {price.was && (
        <s className="price-was" aria-label={price.wasLabel}>
          {price.was}
        </s>
      )}
      <span className="price-now">{price.now}</span>
      {price.unit && <span className="price-unit">{price.unit}</span>}
    </div>
  )
}

/**
 * One plan, so one card: the subscription, with everything in it. The setup
 * package sits under it as a band rather than a second card, so it reads as
 * an optional extra and not as a step you need before you can start.
 */
export default function Pricing() {
  const { pricing } = useCopy()
  const { plan, setup } = pricing

  return (
    <Section id="pricing" label={pricing.label} title={pricing.title} lede={pricing.lede}>
      <div className="plan" data-rv="0">
        <div className="plan-main">
          <div className="plan-head">
            <h3>{plan.name}</h3>
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
          </div>
          <Price price={plan.price} />
          <p className="price-note">{plan.price.note}</p>
          <p className="plan-desc">{plan.desc}</p>
          <a className="btn btn-primary" href={plan.cta.href} data-cta="pricing-trial">
            {plan.cta.label}
          </a>
          <p className="plan-terms">{plan.terms}</p>
        </div>
        <ul className="plan-list">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="setup" data-rv="1">
        <div>
          <div className="plan-head">
            <h3>{setup.name}</h3>
            {setup.badge && <span className="plan-badge">{setup.badge}</span>}
          </div>
          <p className="plan-desc">{setup.desc}</p>
        </div>
        <div className="setup-buy">
          <Price price={setup.price} />
          <a className="btn btn-ghost" href={setup.cta.href} data-cta="pricing-setup">
            {setup.cta.label}
          </a>
        </div>
      </div>

      {pricing.footnote && <p className="plans-note">{pricing.footnote}</p>}
    </Section>
  )
}
