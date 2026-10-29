/* Draws the page to HTML at build time; scripts/prerender.js calls it once
   per language. */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { LocaleProvider } from './i18n/index.js'

export { copy } from './content/index.js'
export { APP, EMAIL } from './content/links.js'
export { LOCALES, PATHS, dirOf } from './i18n/locale.js'

export function render(locale) {
  return renderToString(
    <StrictMode>
      <LocaleProvider initial={locale}>
        <App />
      </LocaleProvider>
    </StrictMode>,
  )
}
