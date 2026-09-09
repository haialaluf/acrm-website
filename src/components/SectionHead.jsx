/**
 * The numbered label + title + lede that opens every section.
 * `plain` drops the `.sec-title` class where a section styles its own heading.
 */
export default function SectionHead({ label, title, lede, plain, children }) {
  return (
    <div className="sec-head" data-rv="0">
      <div className="mono">{label}</div>
      <div>
        {title && <h2 className={plain ? undefined : 'sec-title'}>{title}</h2>}
        {lede && <p className="sec-lede">{lede}</p>}
        {children}
      </div>
    </div>
  )
}
