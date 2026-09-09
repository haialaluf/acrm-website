import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'

export default function Channels() {
  const { channels } = useCopy()
  return (
    <Section id="channels" label={channels.label} title={channels.title} lede={channels.lede}>
      <div className="grid2" data-rv="0">
        {channels.items.map((c) => (
          <div className="cell" key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
