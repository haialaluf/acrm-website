import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'
import { APP } from '../content/index.js'

/** The jobs the system takes off a one-person business, one card each. */
export default function Work() {
  const { work } = useCopy()
  return (
    <Section id="work" label={work.label} title={work.title} lede={work.lede}>
      <div className="grid3 work" data-rv="0">
        {work.items.map((w) => (
          <div className="cell" key={w.title}>
            {w.before && <div className="work-before">{w.before}</div>}
            <h3>{w.title}</h3>
            <p>{w.body}</p>
          </div>
        ))}
      </div>
      <div className="inline-cta" data-rv="0">
        <a className="btn btn-primary" href={APP} data-cta="work-trial">
          {work.cta}
        </a>
        <p>{work.note}</p>
      </div>
    </Section>
  )
}
