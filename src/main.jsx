import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocaleProvider, applyDocumentLocale, detectLocale } from './i18n/index.js'
import { copy } from './content/index.js'
import './site.css'

// Settle the language before React's first render, so a visitor in Israel
// never sees a frame of left-to-right English.
const locale = detectLocale()
applyDocumentLocale(locale, copy[locale].meta)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider initial={locale}>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
