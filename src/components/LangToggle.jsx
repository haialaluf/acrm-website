import { useLocale } from '../i18n/index.js'

/**
 * Switches to the other language. It always shows the language you'd be
 * moving to, written in that language, so it reads the same either way round.
 */
export default function LangToggle() {
  const { t, setLocale } = useLocale()
  const { label, title, lang } = t.switchTo

  return (
    <button
      type="button"
      className="lang"
      onClick={() => setLocale(lang)}
      title={title}
      aria-label={title}
      lang={lang}
    >
      {label}
    </button>
  )
}
