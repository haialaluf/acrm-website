import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocaleProvider, applyDocumentLocale, detectLocale } from './i18n/index.js'
import { copy } from './content/index.js'
import { startAttribution } from './attribution.js'
import './site.css'

// The address decides the language (see i18n/locale.js), so this matches the
// page the build prerendered for it.
const locale = detectLocale()
applyDocumentLocale(locale, copy[locale].meta)
startAttribution()

const app = (
  <StrictMode>
    <LocaleProvider initial={locale}>
      <App />
    </LocaleProvider>
  </StrictMode>
)

// The build fills #root with the page, for crawlers that don't run scripts.
// An ad's `?v=` headline differs from that markup, so it is drawn afresh
// instead of hydrated; so is everything in `vite dev`, where #root is empty.
const root = document.getElementById('root')
const variant = new URLSearchParams(window.location.search).has('v')
if (root.firstElementChild && !variant) hydrateRoot(root, app)
else createRoot(root).render(app)
