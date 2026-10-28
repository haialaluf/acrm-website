import useReveal from './hooks/useReveal.js'
import { useLocale } from './i18n/index.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import Work from './components/Work.jsx'
import Build from './components/Build.jsx'
import AllInOne from './components/AllInOne.jsx'
import GettingStarted from './components/GettingStarted.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { locale } = useLocale()

  // Switching language replaces most of the marked elements, so the reveal
  // observer has to be pointed at the new ones.
  useReveal(locale)

  // Outcome first (what it takes off your hands), then how you get more of
  // it (ask Claude or ChatGPT), then that it is all one system at one price.
  // "How to start" sits right before the price, next to the button.
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Facts />
        <Work />
        <Build />
        <AllInOne />
        <GettingStarted />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
