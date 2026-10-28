import Section from './Section.jsx'
import FeatureRows from './FeatureRows.jsx'
import { useCopy } from '../i18n/index.js'
import { APP } from '../content/index.js'

/** The channels that feed the inbox, then what you do with them once they're in. */
export default function Product() {
  const { product, productCta } = useCopy()
  return (
    <Section id="product" label={product.label} title={product.title} lede={product.lede}>
      <div className="grid3" data-rv="0">
        {product.channels.map((c) => (
          <div className="cell" key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
      <div className="product-rows">
        <FeatureRows rows={product.rows} />
      </div>
      <div className="inline-cta" data-rv="0">
        <a className="btn btn-primary" href={APP} data-cta="product-trial">
          {productCta.label}
        </a>
        <p>{productCta.note}</p>
      </div>
    </Section>
  )
}
