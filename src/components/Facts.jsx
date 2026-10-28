import { useCopy } from '../i18n/index.js'

/** The verified check that sits on a fact carrying a `mark`. */
function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity=".18" />
      <path
        d="M4.9 8.2 7 10.3l4.1-4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** The reassurance strip that sits directly under the hero. */
export default function Facts() {
  const { facts } = useCopy()

  return (
    <section className="strip">
      <div className="wrap">
        <div className="facts" data-rv="0" style={{ '--n': facts.length }}>
          {facts.map((f) => (
            <div className="fact" key={f.title}>
              {/* Only the Meta-approval fact carries a mark; the rest read plain. */}
              {f.mark && (
                <span className="fact-mark">
                  <Check />
                  {f.mark}
                </span>
              )}
              <h4>{f.title}</h4>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
