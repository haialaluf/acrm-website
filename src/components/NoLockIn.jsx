import Section from './Section.jsx'
import Steps from './Steps.jsx'
import { useCopy } from '../i18n/index.js'

export default function NoLockIn() {
  const { noLockIn } = useCopy()
  return (
    <Section label={noLockIn.label} title={noLockIn.title} lede={noLockIn.lede}>
      <Steps items={noLockIn.items} />
    </Section>
  )
}
