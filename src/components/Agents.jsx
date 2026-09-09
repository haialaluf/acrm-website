import Section from './Section.jsx'
import FeatureRows from './FeatureRows.jsx'
import { useCopy } from '../i18n/index.js'

export default function Agents() {
  const { agents } = useCopy()
  return (
    <Section dark id="agents" label={agents.label} title={agents.title} lede={agents.lede}>
      <FeatureRows rows={agents.rows} />
    </Section>
  )
}
