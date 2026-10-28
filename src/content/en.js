/* All English page copy. Mirror any structural change here in he.js. */
import { APP, EMAIL, HAS_WHATSAPP, whatsapp } from './links.js'

const CHAT = whatsapp('Hi, I’d like to hear about delaCRM')
const CHAT_SETUP = whatsapp('Hi, I’d like to hear about the setup package')
/* Until our WhatsApp number is set, the "WhatsApp" buttons fall back to
   email, so their wording has to say email too. */
const CHAT_LABEL = HAS_WHATSAPP ? 'Chat with us on WhatsApp' : 'Email us'
const VIA = HAS_WHATSAPP ? 'on WhatsApp' : 'by email'
const TERMS = 'No credit card · No commitment · Launch price ₪149/month incl. VAT'

export default {
  meta: {
    title: 'delaCRM | WhatsApp automations for one-person businesses: lead replies, reminders and an AI agent',
    description:
      'delaCRM answers leads and customers on WhatsApp and sends reminders and follow-ups, from your existing number over the official connection. Need another process? Describe it to Claude or ChatGPT. Launch price ₪149/month incl. VAT. Try it free.',
  },

  /** Shown on the button that switches away from this language. */
  switchTo: { label: 'עברית', title: 'עבור לעברית', lang: 'he' },

  nav: {
    links: [
      { href: '#work', label: 'Product' },
      { href: '#build', label: 'Build with AI' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQ' },
    ],
    trial: 'Try it free',
    chat: CHAT_LABEL,
    chatShort: HAS_WHATSAPP ? 'WhatsApp' : 'Email',
    chatHref: CHAT,
    signIn: 'Sign in',
    menu: 'Menu',
  },

  hero: {
    eyebrow: 'WhatsApp automations for one-person businesses · Official connection',
    title: 'No customer goes unanswered',
    lede: 'delaCRM answers leads and customers on WhatsApp and sends them reminders, from your existing number, even while you’re on a job. Need another process? Describe it to Claude or ChatGPT and get a ready draft.',
    primary: { label: 'Try it free', href: APP },
    // Hidden until there is a WhatsApp number: an email button this high up
    // competes with the trial for nothing.
    secondary: HAS_WHATSAPP ? { label: CHAT_LABEL, href: CHAT } : null,
    note: 'Same number · No credit card · No commitment · ₪149/month for the first year',
    variants: {
      leads: {
        eyebrow: 'Lead management for Facebook, Instagram and your website',
        title: 'Every lead gets an answer within a minute, even mid-job',
        lede: 'A lead fills in a form, and a flow you set up once sends them a WhatsApp message from a template you approved within a minute. No reply in two days? They get a follow-up. Connect your Page and the last 90 days of leads come in too.',
      },
      automations: {
        eyebrow: 'WhatsApp automations for small businesses',
        title: 'Business automations, no developer needed',
        lede: 'A message for every new lead, a reminder before a visit, a review request after a job. Start free, or build them with us for ₪399. Need another process? Describe it to Claude or ChatGPT and it builds a draft.',
      },
      ai: {
        eyebrow: 'An AI agent for WhatsApp',
        title: 'An AI agent that answers your WhatsApp while you’re busy',
        lede: 'It answers from your business’s own information, books and moves appointments in your calendar, and passes you only what needs you. We’ll build it with you for ₪399 instead of ₪1,999, incl. VAT.',
      },
      build: {
        eyebrow: 'A WhatsApp system that works with Claude and ChatGPT',
        title: 'Say what you need, and it gets done',
        lede: 'Describe in your own words what should happen to your leads and customers. Claude or ChatGPT builds the process as a draft, and you check it and switch it on. From your existing number, over the official connection.',
      },
      team: {
        eyebrow: 'WhatsApp for business · Unlimited users',
        title: 'One WhatsApp for the whole team',
        lede: 'Connect your existing business number and everyone who talks to customers works from it, on desktop or phone, each with their own login. The number keeps working in the phone app, and you can see who answered whom.',
      },
      reminders: {
        eyebrow: 'WhatsApp appointment reminders',
        title: 'Fewer customers who forget to show up',
        lede: 'A WhatsApp reminder the day before, and again a few hours before. Customers book from a link, the AI agent can move an appointment in the chat, and there’s a separate calendar for every staff member, room or service.',
      },
    },
  },

  facts: [
    {
      title: 'Same number',
      body: 'Connect the WhatsApp Business number you already have, and it keeps working in the phone app.',
    },
    {
      mark: 'Meta-approved provider',
      title: 'Official connection, not a plugin',
      body: 'delaCRM connects to WhatsApp the official way Meta opened for businesses. Not a workaround that puts your number at risk.',
    },
    {
      title: 'Nothing to install',
      body: 'Works in the browser and on your phone. If you can use WhatsApp, you can use this.',
    },
  ],

  work: {
    label: '01 / What it does',
    title: 'The work nobody pays you for',
    lede: 'Five jobs that eat your evenings. delaCRM does them for you, from your existing number, even while you’re working.',
    cta: 'Try it free',
    note: TERMS,
    items: [
      {
        title: 'The same questions, twenty times a day',
        body: 'How much is a facial? Are you open on Friday? Any slots tomorrow? An AI agent answers from your business’s information. When it isn’t sure it hands over to you, and the moment you reply, it stops.',
      },
      {
        title: 'Leads that go cold',
        body: 'Anyone who leaves their details on Facebook gets a WhatsApp message straight away, even while you’re up a ladder. No reply? A follow-up two days later.',
      },
      {
        title: 'Ten messages to agree a time',
        body: 'Send a link and the customer picks a free slot within your working hours. The AI agent can also book, move and cancel inside the conversation.',
      },
      {
        title: 'Customers who forget',
        body: 'A WhatsApp reminder the day before the treatment, meeting or visit, and again a few hours before. You don’t have to remember to send it.',
      },
      {
        title: 'Customers who don’t come back',
        body: 'A personal message to past customers before the season, on their birthday or before a renewal, like “time to service your AC before summer”. Only to people who opted in, and anyone who replies “stop” is taken off the list.',
      },
    ],
  },

  build: {
    label: '02 / Any other process',
    title: 'Need something else? Write it in your own words',
    lede: 'Connect Claude or ChatGPT to delaCRM and tell it what you need, like a message to a new assistant. It builds the process, and you check it and switch it on.',
    steps: [
      { title: 'Connect once', body: 'Add delaCRM as a connector in Claude’s or ChatGPT’s settings.' },
      { title: 'Write what you need', body: 'In plain words. What happens, to whom, and when.' },
      {
        title: 'Check and switch on',
        body: 'The process is saved in delaCRM as a draft. See every step, change what you need, and switch it on when it looks right.',
      },
    ],
    chat: {
      ask: 'In every new conversation: if the customer asks for a quote, mark them as hot and hand them to me.',
      reply:
        'I built a draft: new conversation → analyse the conversation → if they ask for a quote: tag “hot” and assign to you. Switch it on?',
      caption: 'An example conversation with Claude',
    },
    examples: [
      'On a customer’s birthday: a message with an offer',
      'Which of this week’s leads haven’t had a reply?',
      'Customers who haven’t been back in six months: a message before the season',
    ],
    note: 'Claude and ChatGPT only work with you. They don’t contact customers on their own, and only send a message when you explicitly ask.',
    ways: {
      title: 'Three ways to build',
      items: [
        {
          title: 'In the built-in editor',
          body: 'Choose when it happens and what gets sent, step by step, without writing code.',
        },
        {
          title: 'In words, with Claude or ChatGPT',
          body: 'Claude works on its free plan too. ChatGPT needs a paid subscription.',
        },
        {
          title: 'With us',
          body: 'We design and build your processes and AI agent for ₪399 instead of ₪1,999, incl. VAT. Then you carry on with the monthly subscription.',
          cta: { label: CHAT_LABEL, href: CHAT_SETUP },
        },
      ],
    },
  },

  allInOne: {
    label: '03 / All in one',
    title: 'Everything that happens with customers, in one place',
    lede: 'No stack of subscriptions and apps. Need to connect another system? Our team connects it.',
    items: [
      'WhatsApp, on your existing number',
      'Instagram and Messenger',
      'Email from your own domain',
      'Leads from Facebook, Instagram and your website',
      'Sales stages for every lead',
      'Calendar, appointments and meetings',
      'Broadcasts to customers who opted in',
      'An AI agent that answers in Hebrew',
    ],
  },

  gettingStarted: {
    label: '04 / Getting started',
    title: 'Answer customers from delaCRM today',
    lede: `No new number and no “we’ve changed numbers” announcement. Three steps, nothing to install. Stuck? Message us ${VIA}.`,
    items: [
      {
        label: 'Step 1',
        title: 'Connect WhatsApp',
        body: 'Sign in with your business’s Facebook account and approve in the WhatsApp app on your phone. The number keeps working the whole time. Instagram and your Facebook Page connect the same way.',
      },
      {
        label: 'Step 2',
        title: 'Bring in your customers',
        body: 'Upload a list from a spreadsheet, and the last 90 days of Facebook leads come in. You can also bring in recent conversations from the phone.',
      },
      {
        label: 'Step 3',
        title: 'Choose what goes out on its own',
        body: 'A message for every new lead, a reminder before a visit, answers from the AI agent. Work with a partner or an employee? Invite them at no extra cost.',
      },
    ],
  },

  pricing: {
    label: '05 / Pricing',
    title: 'One price, the whole system',
    lede: 'No tiers and no locked features. Start free, and subscribe once you see results.',
    plan: {
      name: 'delaCRM',
      badge: 'Launch price',
      price: {
        was: '₪199',
        wasLabel: 'instead of ₪199',
        now: '₪149',
        unit: '/month, incl. VAT',
        note: 'For your first 12 months, then ₪199/month',
      },
      desc: 'For one business. Extra users at no extra cost.',
      cta: { label: 'Try it free', href: APP },
      terms: 'No credit card · No commitment · Cancel any time',
      features: [
        'WhatsApp, Instagram, Messenger and email in one place',
        'Leads from Facebook and your website, with sales stages',
        'Reminders, follow-ups and automated processes',
        'Calendars and booking for appointments and meetings',
        'An AI agent that answers and books',
        'Broadcasts to customers who opted in',
        'Works with Claude and ChatGPT',
        'Data export, API and integrations',
      ],
    },
    setup: {
      name: 'Setup package',
      badge: 'One-time',
      price: { was: '₪1,999', wasLabel: 'instead of ₪1,999', now: '₪399', unit: 'incl. VAT' },
      desc: 'Rather not build it yourself? We map with you how customers reach you and what you tell them, and build your processes and AI agent together.',
      cta: { label: CHAT_LABEL, href: CHAT_SETUP },
    },
    footnote:
      'Separately from the subscription, Meta charges a few agorot for each message a business starts from an approved template, such as a reminder or a broadcast, and for replies to customers only beyond 1,000 a month. That fee goes to Meta, not to us, and you can see your usage in delaCRM.',
  },

  faq: {
    label: '06 / FAQ',
    title: 'What people ask before they start',
    items: [
      {
        q: 'How much does it cost?',
        a: 'At the launch price, ₪149 a month including VAT for your first 12 months, then ₪199 a month. The price is per business and includes the whole system; extra users cost nothing. Separately, Meta charges a few agorot for each message the business starts, such as a reminder or a broadcast, and for replies to customers only beyond 1,000 a month.',
      },
      {
        q: 'What does the free trial include?',
        a: 'Sign up without a credit card, connect a channel and try it on real customers. The free plan includes 100 messages a month, incoming and outgoing, and delaCRM warns you as you approach the limit. After that, new messages reach only the app on your phone. To have them come into delaCRM, subscribe.',
      },
      {
        q: 'Do I need a new number?',
        a: 'No. You connect your existing WhatsApp Business number and it keeps working in the phone app. Replies sent from the phone show up in delaCRM too, and customers notice nothing.',
      },
      {
        q: 'What does “official connection” mean, and why does it matter?',
        a: 'Meta, the company behind WhatsApp, opened a proper way for businesses to connect. We connect that way and passed Meta’s reviews. Tools that imitate WhatsApp Web run without approval, and they are what gets numbers banned. Even on the official connection, messaging people who didn’t ask to hear from you can put a number at risk, so broadcasts only go to people who opted in, and anyone who replies “stop” is taken off the list.',
      },
      {
        q: 'How do I connect Claude or ChatGPT?',
        a: `Add delaCRM as a connector in their settings. Claude allows this on its free plan, with one connector. ChatGPT needs a paid subscription, and which plans support it changes from time to time. Stuck? Message us ${VIA}.`,
      },
      {
        q: 'Can Claude or ChatGPT see my customers?',
        a: 'Only once you connect them, and only with the permission you give. They read what they need from delaCRM to build a process or answer your question, such as contacts and conversations. That data goes to Anthropic or OpenAI under their terms. They don’t contact customers on their own, and you can disconnect at any time.',
      },
      {
        q: 'Could the AI agent say something embarrassing?',
        a: 'You decide which conversations it handles and what it may answer. Before it talks to a single customer, you chat with it in a private test until it sounds like your business. When it doesn’t know, it hands over to you, and it stops when you reply. Everything it sends is kept and visible to you.',
      },
      {
        q: 'What does the setup package include?',
        a: 'A discovery session with our team: how customers reach you, what they ask and what you answer. Then we build your processes and AI agent with you, and test them before they talk to customers. The regular price is ₪1,999; right now it’s ₪399 including VAT, one-time.',
      },
      {
        q: 'Is there a commitment? What happens to my data if I leave?',
        a: 'No commitment; cancel any time. You can export all your data whenever you like, and closing your account deletes it from our side. Your number stays yours and keeps working on your phone.',
      },
      {
        q: 'For developers: is there an API?',
        a: 'Yes. There’s an API, webhooks and an MCP server, so you can work with delaCRM from Claude Code or any MCP-capable tool. A webhook step can also send data from a process to another system.',
      },
      {
        q: 'Are you part of Meta?',
        a: 'No. We’re a Meta-approved tech provider, which is what lets you connect your number the official way. delaCRM is an independent company.',
      },
    ],
  },

  cta: {
    label: 'Get started',
    title: 'Connect your number and see for yourself',
    lede: `Sign up free, connect WhatsApp, and set up an automatic message for every new lead today. Have a question first? Message us ${VIA}.`,
    primary: { label: 'Try it free', href: APP },
    secondary: HAS_WHATSAPP ? { label: CHAT_LABEL, href: CHAT } : null,
    note: TERMS,
  },

  footer: {
    blurb:
      'A WhatsApp system for one-person and small businesses: it answers customers, sends reminders and builds processes from what you write, on your existing number.',
    cols: [
      {
        title: 'Product',
        links: [
          { href: '#work', label: 'Product' },
          { href: '#build', label: 'Build with AI' },
          { href: '#all', label: 'All in one' },
          { href: '#how', label: 'Getting started' },
          { href: '#pricing', label: 'Pricing' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { href: 'privacy.html', label: 'Privacy policy' },
          { href: 'data-deletion.html', label: 'Data deletion' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { href: CHAT, label: CHAT_LABEL },
          { href: `mailto:${EMAIL}`, label: EMAIL },
          { href: APP, label: 'Sign in' },
        ],
      },
    ],
    copyright: (year) => `© ${year} HaiTech · Tel Aviv, Israel`,
    disclaimer:
      'delaCRM is an independent software provider and is not affiliated with, endorsed by, or sponsored by WhatsApp LLC or Meta Platforms, Inc.',
  },
}
