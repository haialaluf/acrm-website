/**
 * Which language the visitor gets, and how we work it out.
 *
 * The rule is "Israel gets Hebrew, everyone else gets English". A browser
 * cannot tell us where somebody is without asking permission first — the
 * Geolocation API shows a prompt, and a marketing page that opens with one is
 * a page people close — so we read the two signals the browser hands over for
 * free: the machine's time zone, and the languages it says it prefers.
 */

export const LOCALES = ['en', 'he']
export const DEFAULT_LOCALE = 'en'

const STORE_KEY = 'delacrm.locale'

/** Israel is one zone, but browsers and older ICU data still return aliases. */
const IL_ZONES = new Set(['Asia/Jerusalem', 'Asia/Tel_Aviv', 'Israel'])

const isLocale = (v) => LOCALES.includes(v)

/** `?lang=he` — so a link can pin the language regardless of where it's opened. */
function fromQuery() {
  try {
    const v = new URLSearchParams(window.location.search).get('lang')
    return isLocale(v) ? v : null
  } catch {
    return null
  }
}

/** A choice the visitor made themselves always beats anything we detect. */
export function readStored() {
  try {
    const v = localStorage.getItem(STORE_KEY)
    return isLocale(v) ? v : null
  } catch {
    // Private mode, or storage blocked. Detection still works.
    return null
  }
}

export function writeStored(locale) {
  try {
    localStorage.setItem(STORE_KEY, locale)
  } catch {
    /* nothing we can do, and nothing worth breaking the page over */
  }
  // A `?lang=` already in the address bar outranks storage on the next load,
  // so it has to move with the choice or it would quietly undo it. A URL
  // without one is left clean.
  try {
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', locale)
      window.history.replaceState(null, '', url)
    }
  } catch {
    /* history is not worth breaking the page over either */
  }
}

/** Where they are: the time zone is the only location the browser gives freely. */
function fromTimeZone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return tz && IL_ZONES.has(tz) ? 'he' : null
  } catch {
    return null
  }
}

/**
 * What they read: `he`/`iw` (the legacy Hebrew tag) anywhere in the preference
 * list, or an `-IL` region on any tag — an Israeli phone set to English still
 * reports `en-IL`.
 */
function fromLanguages() {
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of tags) {
    const tag = String(raw || '').toLowerCase()
    if (tag.startsWith('he') || tag.startsWith('iw')) return 'he'
    if (tag.endsWith('-il')) return 'he'
  }
  return null
}

/** First signal to answer wins. */
export function detectLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  return (
    fromQuery() || readStored() || fromTimeZone() || fromLanguages() || DEFAULT_LOCALE
  )
}

export const dirOf = (locale) => (locale === 'he' ? 'rtl' : 'ltr')

/**
 * Puts the language on <html> — `dir` drives every logical property in the
 * stylesheet, so this one attribute is what actually flips the layout.
 */
export function applyDocumentLocale(locale, meta) {
  const el = document.documentElement
  el.lang = locale
  el.dir = dirOf(locale)
  if (!meta) return
  document.title = meta.title
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', meta.description)
}
