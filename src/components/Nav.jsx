import { useEffect, useState } from 'react'
import LangToggle from './LangToggle.jsx'
import { useCopy } from '../i18n/index.js'
import { APP } from '../content/index.js'

/** Width at which the inline links come back and the burger goes away. */
const DESKTOP = 1010

export default function Nav() {
  const { nav } = useCopy()
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  // The nav is transparent over the top of the hero and grows a rule once the
  // page has scrolled under it.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > DESKTOP && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="nav" data-open={open ? '' : undefined} data-stuck={stuck ? '' : undefined}>
      <div className="wrap nav-in">
        <a className="brand" href="/">
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
          <a className="nav-signin" href={APP}>
            {nav.signIn}
          </a>
          <a className="btn btn-ghost btn-sm" href={nav.chatHref} data-cta="nav-whatsapp">
            {nav.chatShort}
          </a>
          <a className="btn btn-primary btn-sm" href={APP} data-cta="nav-trial">
            {nav.trial}
          </a>
        </div>
        <button
          className="nav-burger"
          type="button"
          aria-label={nav.menu}
          aria-expanded={open}
          aria-controls="m-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="m-menu" id="m-menu" onClick={() => setOpen(false)}>
        {nav.links.map((l) => (
          <a href={l.href} key={l.href}>
            {l.long || l.label}
          </a>
        ))}
        <a className="btn btn-primary" href={APP} data-cta="menu-trial">
          {nav.trial}
        </a>
        <a className="btn btn-ghost" href={nav.chatHref} data-cta="menu-whatsapp">
          {nav.chat}
        </a>
        <a className="btn btn-ghost" href={APP}>
          {nav.signIn}
        </a>
        <LangToggle className="lang-block" />
      </div>
    </header>
  )
}
