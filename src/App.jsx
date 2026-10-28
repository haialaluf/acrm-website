import useReveal from './hooks/useReveal.js'
import { useLocale } from './i18n/index.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import Scatter from './components/Scatter.jsx'
import Product from './components/Product.jsx'
import Automations from './components/Automations.jsx'
import Agents from './components/Agents.jsx'
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

  // "How to start" sits right before the price: it answers "what happens
  // after I press the button", so it belongs next to the button.
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Facts />
        <Scatter />
        <Product />
        <Automations />
        <Agents />
        <GettingStarted />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
