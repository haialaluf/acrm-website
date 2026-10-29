/**
 * Runs after both Vite builds. Writes each language's page with its content
 * already in the HTML (AI crawlers such as GPTBot and ClaudeBot don't run
 * scripts, and Google indexes the HTML before it gets round to rendering), and
 * the files search engines and agents look for: sitemap.xml, robots.txt,
 * llms.txt and a Markdown copy of each page.
 *
 * Everything is drawn from the page copy in src/content, so it can't drift
 * from what the page says.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const server = join(root, 'dist-server')

const { render, copy, APP, EMAIL, LOCALES, PATHS, dirOf } = await import(
  pathToFileURL(join(server, 'entry-server.js')).href
)

const SITE = 'https://delacrm.com'
const MCP = 'https://mcp.delacrm.com/mcp'
const OG_LOCALE = { en: 'en_US', he: 'he_IL' }
const NAMES = { en: 'English', he: 'Hebrew' }
const today = new Date().toISOString().slice(0, 10)

const url = (locale) => SITE + PATHS[locale]

/** The Hebrew copy's bidi isolates and hard spaces are for the page only. */
const plain = (s) => String(s).replace(/[⁦-⁩]/g, '').replace(/ /g, ' ')

const esc = (s) =>
  plain(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** "₪1,999" → "1999" */
const amount = (s) => String(s).replace(/[^\d.]/g, '')

/* ---------- structured data ---------- */

function jsonLd(locale) {
  const t = copy[locale]
  const { plan, setup } = t.pricing
  const page = url(locale)
  const org = `${SITE}/#organization`
  const app = `${SITE}/#software`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: 'delaCRM',
        url: `${SITE}/`,
        logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 512, height: 512 },
        email: EMAIL,
        address: { '@type': 'PostalAddress', addressLocality: 'Tel Aviv', addressCountry: 'IL' },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: EMAIL,
          availableLanguage: ['English', 'Hebrew'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'delaCRM',
        inLanguage: LOCALES,
        publisher: { '@id': org },
      },
      {
        '@type': 'WebPage',
        '@id': `${page}#webpage`,
        url: page,
        name: plain(t.meta.title),
        description: plain(t.meta.description),
        inLanguage: locale,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': app },
        primaryImageOfPage: `${SITE}/og-${locale}.png`,
        dateModified: today,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': app,
        name: 'delaCRM',
        url: page,
        description: plain(t.footer.blurb),
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'CRM',
        operatingSystem: 'Web',
        inLanguage: LOCALES,
        publisher: { '@id': org },
        featureList: plan.features.map(plain),
        offers: [
          {
            '@type': 'Offer',
            name: plain(plan.name),
            description: plain(`${plan.desc} ${plan.price.note}`),
            price: amount(plan.price.now),
            priceCurrency: 'ILS',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: amount(plan.price.now),
              priceCurrency: 'ILS',
              valueAddedTaxIncluded: true,
              unitCode: 'MON',
              billingDuration: 'P1M',
            },
            url: APP,
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: plain(setup.name),
            description: plain(setup.desc),
            price: amount(setup.price.now),
            priceCurrency: 'ILS',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: amount(setup.price.now),
              priceCurrency: 'ILS',
              valueAddedTaxIncluded: true,
            },
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${page}#faq`,
        url: `${page}#faq`,
        inLanguage: locale,
        isPartOf: { '@id': `${page}#webpage` },
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question',
          name: plain(f.q),
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      },
    ],
  }
}

/* ---------- <head> ---------- */

function head(locale) {
  const t = copy[locale]
  const page = url(locale)
  const image = `${SITE}/og-${locale}.png`
  const others = LOCALES.filter((l) => l !== locale)
  // `<` is escaped so no string in the copy can close the script element.
  const ld = JSON.stringify(jsonLd(locale)).replace(/</g, '\\u003c')

  return [
    `<title>${esc(t.meta.title)}</title>`,
    `<meta name="description" content="${esc(t.meta.description)}" />`,
    `<link rel="canonical" href="${page}" />`,
    ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url('en')}" />`,
    `<link rel="alternate" type="text/markdown" href="${PATHS[locale]}index.md" title="${esc(t.meta.title)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="delaCRM" />`,
    `<meta property="og:url" content="${page}" />`,
    `<meta property="og:title" content="${esc(t.meta.title)}" />`,
    `<meta property="og:description" content="${esc(t.meta.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(t.hero.title)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    ...others.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ].join('\n  ')
}

/* ---------- Markdown copy of the page, for agents ---------- */

const list = (items) => items.map((s) => `- ${plain(s)}`).join('\n')
const named = (items) => items.map((i) => `- **${plain(i.title)}**: ${plain(i.body)}`).join('\n')
const heading = (label) => plain(label.includes(' / ') ? label.split(' / ')[1] : label)

function markdown(locale) {
  const t = copy[locale]
  const { plan, setup } = t.pricing
  const other = LOCALES.filter((l) => l !== locale)

  return `# ${plain(t.meta.title)}

> ${plain(t.meta.description)}

URL: ${url(locale)}
${other.map((l) => `${NAMES[l]} version: ${url(l)}index.md`).join('\n')}
Sign up / sign in: ${APP}
Contact: ${EMAIL}

## ${plain(t.hero.title)}

${plain(t.hero.lede)}

${plain(t.hero.note)}

${named(t.facts)}

## ${heading(t.work.label)}: ${plain(t.work.title)}

${plain(t.work.lede)}

${named(t.work.items)}

## ${heading(t.build.label)}: ${plain(t.build.title)}

${plain(t.build.lede)}

${t.build.steps.map((s, i) => `${i + 1}. **${plain(s.title)}**: ${plain(s.body)}`).join('\n')}

${list(t.build.examples.map((e) => `“${e}”`))}

${plain(t.build.note)}

### ${plain(t.build.ways.title)}

${named(t.build.ways.items)}

## ${heading(t.allInOne.label)}: ${plain(t.allInOne.title)}

${plain(t.allInOne.lede)}

${list(t.allInOne.items)}

## ${heading(t.gettingStarted.label)}: ${plain(t.gettingStarted.title)}

${plain(t.gettingStarted.lede)}

${t.gettingStarted.items.map((s, i) => `${i + 1}. **${plain(s.title)}**: ${plain(s.body)}`).join('\n')}

## ${heading(t.pricing.label)}: ${plain(t.pricing.title)}

${plain(t.pricing.lede)}

### ${plain(plan.name)}: ${plain(plan.price.now)} ${plain(plan.price.unit)}

${plain(plan.price.wasLabel)}. ${plain(plan.price.note)}. ${plain(plan.desc)} ${plain(plan.terms)}.

${list(plan.features)}

### ${plain(setup.name)}: ${plain(setup.price.now)} ${plain(setup.price.unit)}

${plain(setup.price.wasLabel)}. ${plain(setup.desc)}

${plain(t.pricing.footnote)}

## ${heading(t.faq.label)}: ${plain(t.faq.title)}

${t.faq.items.map((f) => `### ${plain(f.q)}\n\n${plain(f.a)}`).join('\n\n')}

## ${plain(t.cta.title)}

${plain(t.cta.lede)}

${plain(t.cta.note)}

---

${plain(t.footer.blurb)}

${plain(t.footer.copyright(new Date().getFullYear()))}. ${plain(t.footer.disclaimer)}
`
}

/* ---------- llms.txt (https://llmstxt.org) ---------- */

function llms() {
  const t = copy.en
  const v = t.hero.variants
  return `# delaCRM

> ${plain(t.footer.blurb)} ${plain(t.hero.note)}.

delaCRM is a WhatsApp-first CRM for one-person and small businesses, made in Tel Aviv, Israel, and offered in English and Hebrew. It connects a business's existing WhatsApp Business number through Meta's official WhatsApp Business Platform (delaCRM is a Meta-approved tech provider, independent of Meta). It answers leads and customers automatically, sends appointment reminders and follow-ups, runs an AI agent that answers and books appointments, and lets owners build new automated processes by describing them to Claude or ChatGPT through delaCRM's MCP connector.

Key facts:

- Price: ${plain(t.pricing.plan.price.now)}${plain(t.pricing.plan.price.unit)} (${plain(t.pricing.plan.price.note)}). One plan, every feature, unlimited users. Free trial with no credit card (100 messages a month).
- Setup package: ${plain(t.pricing.setup.price.now)} ${plain(t.pricing.setup.price.unit)} one-time, ${plain(t.pricing.setup.price.wasLabel)}.
- Channels: ${plain(t.allInOne.items.slice(0, 3).join('; '))}.
- Works with Claude and ChatGPT as a connector (MCP). Also has an API and webhooks.
- Meta charges its own per-message fees for business-initiated template messages, separately from the subscription.

## Product

- [Full product page (English, Markdown)](${SITE}/index.md): everything on the home page, including pricing and the full FAQ
- [Full product page (Hebrew, Markdown)](${SITE}/he/index.md): the same page in Hebrew
- [Home page (English)](${SITE}/)
- [Home page (Hebrew)](${SITE}/he/)
- [Pricing](${SITE}/#pricing): ${plain(t.pricing.lede)}
- [FAQ](${SITE}/#faq): ${plain(t.faq.title)}

## Use cases

- [Lead replies](${SITE}/?v=leads): ${plain(v.leads.lede)}
- [AI agent for WhatsApp](${SITE}/?v=ai): ${plain(v.ai.lede)}
- [Appointment reminders](${SITE}/?v=reminders): ${plain(v.reminders.lede)}
- [Automations](${SITE}/?v=automations): ${plain(v.automations.lede)}
- [Build with Claude or ChatGPT](${SITE}/?v=build): ${plain(v.build.lede)}
- [Shared team inbox](${SITE}/?v=team): ${plain(v.team.lede)}

## For agents and developers

- [MCP server](${MCP}): connect delaCRM to Claude, ChatGPT, Claude Code or any MCP client; sign-in with a delaCRM account required
- [Web app](${APP}): sign up and sign in

## Optional

- [Contact](mailto:${EMAIL}): ${EMAIL}
`
}

/* ---------- robots.txt and sitemap.xml ---------- */

const robots = `# Search engines and AI assistants are welcome to read and cite this site.
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(
  (l) => `  <url>
    <loc>${url(l)}</loc>
    <lastmod>${today}</lastmod>
${LOCALES.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${url(a)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en')}" />
  </url>`,
).join('\n')}
</urlset>
`

/* ---------- write it all ---------- */

const template = readFileSync(join(dist, 'index.html'), 'utf8')

for (const locale of LOCALES) {
  const html = template
    .replace('<html lang="en">', `<html lang="${locale}" dir="${dirOf(locale)}">`)
    .replace('<!--seo-->', head(locale))
    .replace('<!--app-->', render(locale))
  const dir = join(dist, PATHS[locale])
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  writeFileSync(join(dir, 'index.md'), markdown(locale))
}

writeFileSync(join(dist, 'llms.txt'), llms())
writeFileSync(join(dist, 'robots.txt'), robots)
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
rmSync(server, { recursive: true, force: true })

console.log(`prerendered ${LOCALES.map((l) => PATHS[l]).join(', ')} with sitemap, robots, llms.txt`)
