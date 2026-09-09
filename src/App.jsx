import useReveal from './hooks/useReveal.js'
import { useLocale } from './i18n/index.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import Scatter from './components/Scatter.jsx'
import Channels from './components/Channels.jsx'
import GettingStarted from './components/GettingStarted.jsx'
import Platform from './components/Platform.jsx'
import Automations from './components/Automations.jsx'
import Agents from './components/Agents.jsx'
import NoLockIn from './components/NoLockIn.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { locale } = useLocale()

  // Switching language replaces most of the marked elements, so the reveal
  // observer has to be pointed at the new ones.
  useReveal(locale)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Facts />
        <Scatter />
        <Channels />
        <GettingStarted />
        <Platform />
        <Automations />
        <Agents />
        <NoLockIn />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
