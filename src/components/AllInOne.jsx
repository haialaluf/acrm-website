import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'

/** Everything the subscription covers, so one price replaces several tools. */
export default function AllInOne() {
  const { allInOne } = useCopy()
  return (
    <Section id="all" label={allInOne.label} title={allInOne.title} lede={allInOne.lede}>
      <ul className="chips" data-rv="0">
        {allInOne.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </Section>
  )
}
