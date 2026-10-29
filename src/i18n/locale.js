/**
 * Which language a page is in, and where the other one lives.
 *
 * Each language has its own address, English at `/` and Hebrew at `/he/`,
 * because search engines index one language per URL: a page that rewrites
 * itself after load only ever gets indexed in whatever the crawler happened
 * to be shown. So the address decides the language, and picking the right
 * address for a visitor ("Israel gets Hebrew") happens before the page paints,
 * in the small script at the top of index.html.
 */

export const LOCALES = ['en', 'he']
export const DEFAULT_LOCALE = 'en'

/** Read by the script in index.html too; keep the two in step. */
const STORE_KEY = 'delacrm.locale'

/** Where each language's page lives. */
export const PATHS = { en: '/', he: '/he/' }

/** The language of the page at `pathname`. */
export const localeFromPath = (pathname) =>
  /^\/he(\/|$)/.test(pathname) ? 'he' : DEFAULT_LOCALE

/** Which language this page is in. */
export function detectLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  return localeFromPath(window.location.pathname)
}

/** A choice the visitor made themselves beats anything the script detects. */
export function writeStored(locale) {
  try {
    localStorage.setItem(STORE_KEY, locale)
  } catch {
    /* nothing we can do, and nothing worth breaking the page over */
  }
}

/**
 * The same page in `locale`, keeping the query (ad parameters, `?v=`) and the
 * section. A `?lang=` would pin the old language again, so it is dropped.
 */
export function hrefFor(locale) {
  if (typeof window === 'undefined') return PATHS[locale]
  const params = new URLSearchParams(window.location.search)
  params.delete('lang')
  const q = params.toString()
  return PATHS[locale] + (q ? `?${q}` : '') + window.location.hash
}

export const dirOf = (locale) => (locale === 'he' ? 'rtl' : 'ltr')

/**
 * Puts the language on <html> — `dir` drives every logical property in the
 * stylesheet, so this one attribute is what actually flips the layout. The
 * prerendered page already has all of this; it matters in `vite dev`.
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
