import { useEffect, useRef } from 'react'
import { useLocale } from './i18n/index.js'
import { start } from './behaviors.js'
import Nav, { Dots } from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Build, { Ways } from './components/Build.jsx'
import AllInOne from './components/AllInOne.jsx'
import GettingStarted from './components/GettingStarted.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'

/** Every section, in page order, by id; the side dots follow this. */
const SECTIONS = ['top', 'work', 'build', 'ways', 'all', 'how', 'pricing', 'faq', 'start-cta']

export default function App() {
  const { locale, t } = useLocale()
  const root = useRef(null)

  // The animations drive the DOM directly, so the page is drawn once per
  // language (the `key` below) and they are started over on each.
  useEffect(() => start(root.current, t), [t])

  return (
    <div ref={root} key={locale}>
      <Nav />
      <Dots ids={SECTIONS} />
      <main>
        <Hero />
        <Work />
        <Build />
        <Ways />
        <AllInOne />
        <GettingStarted />
        <Pricing />
        <Faq />
        <Cta />
      </main>
    </div>
  )
}
