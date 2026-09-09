import Section from './Section.jsx'
import FeatureRows from './FeatureRows.jsx'
import { useCopy } from '../i18n/index.js'

export default function Platform() {
  const { platform } = useCopy()
  return (
    <Section id="platform" label={platform.label} title={platform.title} lede={platform.lede}>
      <FeatureRows rows={platform.rows} />
    </Section>
  )
}
