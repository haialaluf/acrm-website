import { useLocale, PATHS, hrefFor } from '../i18n/index.js'
import { writeStored } from '../i18n/locale.js'

/**
 * Switches to the other language. It always shows the language you'd be
 * moving to, written in that language, so it reads the same either way round.
 *
 * A real link, so crawlers find the other language's page through it. The
 * query and section are added as it is pressed rather than at render time,
 * so the prerendered markup and the browser's agree.
 */
export default function LangToggle() {
  const { t } = useLocale()
  const { label, title, lang } = t.switchTo

  return (
    <a
      className="lang"
      href={PATHS[lang]}
      hrefLang={lang}
      lang={lang}
      title={title}
      aria-label={title}
      onClick={(e) => {
        // Switching is a deliberate act, so it is remembered from here on.
        writeStored(lang)
        e.currentTarget.href = hrefFor(lang)
      }}
    >
      {label}
    </a>
  )
}
