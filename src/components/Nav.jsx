import LangToggle from './LangToggle.jsx'
import { useCopy } from '../i18n/index.js'
import { APP } from '../content/index.js'

/**
 * The bar across the top. Its colour follows the section under it, it gets a
 * frosted background once the page scrolls, and a thin bar along its foot
 * shows how far down the page you are; all of that, and the burger, is
 * driven from behaviors.js.
 */
export default function Nav() {
  const { nav } = useCopy()
  return (
    <header className="nav" id="nav" data-theme="dark">
      <div className="wrap nav-in">
        <a className="brand" href="#top">
          <img src="/assets/delacrm-mark.png" alt="" />
          <span>delaCRM</span>
        </a>
        <nav className="nav-links">
          {nav.links.map((l) => (
            <a href={l.href} key={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <LangToggle />
          <a className="signin" href={APP}>
            {nav.signIn}
          </a>
          <a className="btn btn-solid btn-sm" href={APP} data-cta="nav-trial">
            {nav.trial}
          </a>
          <button className="burger" id="burger" type="button" aria-label={nav.menu} aria-expanded="false">
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="m-menu" id="mmenu">
        {nav.links.map((l) => (
          <a href={l.href} key={l.href}>
            {l.label}
          </a>
        ))}
        <a href={APP}>{nav.signIn}</a>
        <LangToggle />
      </div>
      <div className="nav-prog" id="prog" />
    </header>
  )
}

/** One dot per section down the side of the page, named on hover. */
export function Dots({ ids }) {
  const { nav } = useCopy()
  return (
    <nav className="dots" id="dots" data-theme="dark">
      {ids.map((id) => (
        <a href={`#${id}`} key={id}>
          <span>{nav.sections[id]}</span>
        </a>
      ))}
    </nav>
  )
}
