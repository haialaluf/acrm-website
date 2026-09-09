import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'

export default function Faq() {
  const { faq } = useCopy()
  return (
    <Section id="faq" label={faq.label} title={faq.title}>
      <div className="faq" data-rv="1">
        {faq.items.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
