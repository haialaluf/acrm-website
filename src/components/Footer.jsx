import { useCopy } from '../i18n/index.js'

export default function Footer() {
  const { footer } = useCopy()

  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <a className="brand" href="#top">
              <img src="/assets/delacrm-mark.png" alt="" />
              <span>delaCRM</span>
            </a>
            <p className="f-blurb">{footer.blurb}</p>
          </div>
          {footer.cols.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <a href={l.href} key={l.href + l.label}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="f-bottom">
          <span>{footer.copyright(new Date().getFullYear())}</span>
          <p>{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
