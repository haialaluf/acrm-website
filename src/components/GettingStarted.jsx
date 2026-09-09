import Section from './Section.jsx'
import Steps from './Steps.jsx'
import { useCopy } from '../i18n/index.js'

export default function GettingStarted() {
  const { gettingStarted } = useCopy()
  return (
    <Section
      id="how"
      label={gettingStarted.label}
      title={gettingStarted.title}
      lede={gettingStarted.lede}
    >
      <Steps items={gettingStarted.items} />
    </Section>
  )
}
