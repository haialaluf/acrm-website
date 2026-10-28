import Section from './Section.jsx'
import { useCopy } from '../i18n/index.js'

/**
 * Building a new process by asking Claude or ChatGPT for it, then the three
 * ways to build one, so a visitor without a paid ChatGPT still has a way in.
 * The two bubbles stand in for the video this section will eventually carry.
 */
export default function Build() {
  const { build } = useCopy()
  return (
    <Section dark id="build" label={build.label} title={build.title} lede={build.lede}>
      <div className="build" data-rv="0">
        <ol className="build-steps">
          {build.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <figure className="chat" aria-label={build.chat.caption}>
          <p className="bubble bubble-me">{build.chat.ask}</p>
          <p className="bubble bubble-ai">{build.chat.reply}</p>
          <figcaption>{build.chat.caption}</figcaption>
        </figure>
      </div>
      <ul className="chips chips-dark" data-rv="0">
        {build.examples.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <p className="build-note">{build.note}</p>
      <h3 className="ways-title">{build.ways.title}</h3>
      <div className="ways" data-rv="0">
        {build.ways.items.map((w) => (
          <div className="way" key={w.title}>
            <h4>{w.title}</h4>
            <p>{w.body}</p>
            {w.cta && (
              <a className="btn btn-dark-ghost btn-sm" href={w.cta.href} data-cta="build-setup">
                {w.cta.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
