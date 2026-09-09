import Section from './Section.jsx'
import Steps from './Steps.jsx'
import { useCopy } from '../i18n/index.js'

export default function Scatter() {
  const { scatter } = useCopy()
  return (
    <Section label={scatter.label} title={scatter.title} lede={scatter.lede}>
      <Steps items={scatter.items} />
    </Section>
  )
}
