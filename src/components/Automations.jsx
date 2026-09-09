import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'

export default function Automations() {
  const { automations } = useCopy()
  return (
    <Section
      id="automations"
      label={automations.label}
      title={automations.title}
      lede={automations.lede}
    >
      <div className="grid3" data-rv="0">
        {automations.items.map((a) => (
          <div className="cell" key={a.title}>
            <h3>{a.title}</h3>
            <p>{a.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
