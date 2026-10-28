/**
 * Carries where a visitor came from into the app, so the app can record it on
 * sign-up and report "signed up + connected a channel" back to the ad
 * platforms.
 *
 * Ad clicks land here with utm_* / gclid / fbclid in the address. We keep the
 * first set we see for the visit, and on the way out to app.delacrm.com add
 * them to the link along with the language and which button was pressed
 * (`data-cta`). The app reads them from its own query string.
 */
import { APP } from './content/links.js'

// gbraid/wbraid are what Google sends instead of gclid for iPhone clicks;
// `v` is the hero variant, so sign-ups can be compared by headline.
const KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'v',
]
const STORE_KEY = 'delacrm.attribution'

function landing() {
  const params = new URLSearchParams(window.location.search)
  const found = {}
  for (const k of KEYS) if (params.get(k)) found[k] = params.get(k)
  return found
}

function remembered() {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}
  } catch {
    return {}
  }
}

export function startAttribution() {
  if (typeof window === 'undefined') return
  // First touch wins for the visit: a later page view without parameters
  // must not wipe what the ad click brought.
  let kept = remembered()
  if (!Object.keys(kept).length) {
    kept = landing()
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(kept))
    } catch {
      /* private mode: this page view still carries what it landed with */
    }
  }

  // Rewrite as the link is used rather than at render time, so it covers every
  // app link whichever component drew it. Middle-click and the context menu
  // ("open in new tab", long-press on a phone) skip `click`, so they count too.
  const tag = (e) => {
    const chat = e.target.closest?.('a[href^="https://wa.me/"]')
    if (chat) return tagChat(chat)
    const a = e.target.closest?.('a[href^="' + APP + '"]')
    if (!a) return
    const url = new URL(a.href)
    for (const [k, v] of Object.entries(kept)) url.searchParams.set(k, v)
    url.searchParams.set('lang', document.documentElement.lang || 'en')
    if (a.dataset.cta) url.searchParams.set('cta', a.dataset.cta)
    a.href = url.toString()
  }
  // A WhatsApp chat can't carry query parameters into our inbox, so the
  // campaign rides in the typed message as a short code, which the
  // conversation then shows next to the contact.
  const tagChat = (a) => {
    const code = [kept.utm_source, kept.utm_campaign, kept.v].filter(Boolean).join('-')
    if (!code || a.dataset.coded) return
    const url = new URL(a.href)
    const word = document.documentElement.lang === 'he' ? 'קוד' : 'code'
    const text = `${url.searchParams.get('text') || ''} (${word}: ${code})`
    // Not searchParams.set: it writes spaces as "+", which WhatsApp shows as is.
    a.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(text)}`
    a.dataset.coded = '1'
  }
  for (const type of ['click', 'auxclick', 'contextmenu']) {
    document.addEventListener(type, tag, { capture: true })
  }
}
