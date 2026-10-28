import Section from './Section.jsx'
import FeatureRows from './FeatureRows.jsx'
import { useCopy } from '../i18n/index.js'

export default function Agents() {
  const { agents } = useCopy()
  return (
    <Section dark id="agents" label={agents.label} title={agents.title} lede={agents.lede}>
      <FeatureRows rows={agents.rows} />
      {/* The setup package is what turns "this is impressive" into "do it for me". */}
      <div className="agents-setup" data-rv="0">
        <p>{agents.setup.text}</p>
        <a className="btn btn-dark-ghost" href={agents.setup.cta.href} data-cta="agents-setup">
          {agents.setup.cta.label}
        </a>
      </div>
    </Section>
  )
}
