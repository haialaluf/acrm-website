import SectionHead from './SectionHead.jsx'

/** A full-height band: the section head, then its content below the head gap. */
export default function Section({ id, label, title, lede, dark, children }) {
  return (
    <section className={dark ? 'sec dark' : 'sec'} id={id}>
      <div className="wrap">
        <SectionHead label={label} title={title} lede={lede} />
        <div className="sec-body">{children}</div>
      </div>
    </section>
  )
}
