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
    title: 'delaCRM | WhatsApp for business: a shared team inbox, appointment reminders and an AI agent',
    description:
      'WhatsApp, Instagram, Messenger and email in one inbox your whole team answers from, on your existing number. Facebook leads arrive on their own, appointment reminders go out on time, and an AI agent replies at night. Launch price ₪149/month incl. VAT. Try it free.',
  },

  /** Shown on the button that switches away from this language. */
  switchTo: { label: 'עברית', title: 'עבור לעברית', lang: 'he' },

  nav: {
    links: [
      { href: '#product', label: 'Product' },
      { href: '#automations', label: 'Reminders', long: 'Reminders & bookings' },
      { href: '#agents', label: 'AI agent' },
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
    eyebrow: 'Meta-approved tech provider · Works with your existing number',
    title: 'No customer who writes on WhatsApp goes unanswered',
    lede: 'WhatsApp, Instagram, Messenger and Facebook leads arrive in one inbox your whole team answers from, on the number you already have. Appointment reminders go out on their own, and an AI agent answers and books appointments at eleven at night.',
    primary: { label: 'Try it free', href: APP },
    secondary: { label: CHAT_LABEL, href: CHAT },
    note: TERMS,
    variants: {
      ai: {
        eyebrow: 'An AI agent for WhatsApp',
        title: 'An AI agent that answers your WhatsApp while you’re busy',
        lede: 'It answers from your business’s own information, books and moves appointments in your calendar, and passes you only what needs you. Every WhatsApp, Instagram and Messenger message lands in one inbox for the whole team.',
      },
      leads: {
        eyebrow: 'Lead management · Facebook, Instagram and your website',
        title: 'Every Facebook lead gets an answer, even when you’re busy',
        lede: 'Leads from Facebook and Instagram forms arrive on their own. An automation you set up once sends each new lead a WhatsApp message from a template you approved, and a nudge to anyone who goes quiet. Connect your Page and the last 90 days of leads come in too.',
      },
      team: {
        eyebrow: 'WhatsApp for business · Unlimited users',
        title: 'One WhatsApp for the whole team',
        lede: 'Connect your existing business number and everyone who talks to customers works from it, on desktop or phone, each with their own login. The number keeps working in the phone app, and you can see who answered whom.',
      },
      reminders: {
        title: 'WhatsApp appointment reminders that send themselves',
        lede: 'A day before, and again a few hours before, customers get a reminder. They book their own slot from a link, with a separate calendar for every staff member, room or service.',
      },
    },
  },

  facts: [
    {
      title: 'Your number stays your number',
      body: 'Connect your existing WhatsApp Business number and it keeps working in the phone app too. Customers notice nothing.',
    },
    {
      mark: 'Meta-approved provider',
      title: 'Official WhatsApp connection',
      body: 'We passed Meta’s business verification and app review and connect to the official WhatsApp Business Platform. Not a plugin, and not a workaround that gets numbers banned.',
    },
    {
      title: 'The whole team, one number',
      body: 'Everyone has their own login and can see who answered whom. No passing a phone around, no shared password.',
    },
    {
      title: 'Browser and phone',
      body: 'Nothing to install. If you can use WhatsApp Web, you can use this on day one.',
    },
  ],

  scatter: {
    label: '01 / Sound familiar?',
    title: 'WhatsApp on one phone, Instagram on another',
    lede: 'And the website form emails three people. Nobody knows who got back to the customer, and the ones who didn’t hear back go to a competitor.',
    items: [
      {
        label: 'What you lose',
        title: 'Every chat lives on the receptionist’s phone',
        body: 'When she’s on holiday, nobody answers. When she leaves, the customer conversations leave with her.',
      },
      {
        label: 'What you lose',
        title: 'Two people answer, or nobody does',
        body: 'The customer notices. And the team keeps asking each other: “did you get back to her?”',
      },
      {
        label: 'What you lose',
        title: 'Follow-up lives in someone’s head',
        body: 'A lead nobody called back, a reminder that never went out. Nobody notices until the month’s takings come in.',
      },
    ],
  },

  product: {
    label: '02 / Product',
    title: 'Every channel in one inbox',
    lede: 'WhatsApp, Instagram, Messenger and email land in one conversation list, each with the customer’s full history. Leads from forms go straight into your contacts.',
    channels: [
      {
        title: 'WhatsApp',
        body: 'Your existing business number, on Meta’s official connection. It works in delaCRM and in the phone app at the same time, and replies sent from the phone show up here too.',
      },
      {
        title: 'Instagram',
        body: 'Private messages (DMs) land in the same list. Nobody needs your account password.',
      },
      {
        title: 'Messenger',
        body: 'Connect your Facebook Page and Messenger conversations arrive in the inbox alongside your lead forms.',
      },
      {
        title: 'Email',
        body: 'Send and receive from your own domain. An incoming email opens as a conversation, right next to WhatsApp.',
      },
      {
        title: 'Lead forms',
        body: 'Leads from Facebook and Instagram forms arrive on their own, and connecting your Page brings in the last 90 days of leads. Your website form can send leads in too.',
      },
      {
        title: 'Your past chats',
        body: 'When you connect your number you can bring in recent conversations from the phone, so you don’t start from zero.',
      },
    ],
    rows: [
      {
        label: 'Shared inbox',
        title: 'Looks like WhatsApp, works for the whole team',
        body: 'Photos, voice notes, documents, and blue ticks when the customer has read it. Anyone can pick up a conversation where a colleague left off, and you can hand a chat to a specific person in one click. The history stays, even when the customer comes back a year later.',
        tags: ['Works on mobile', 'Voice notes & photos', 'Assign to a teammate', 'Full history'],
        viz: { anim: 'inbox', caption: 'Messages arrive and someone picks them up' },
      },
      {
        label: 'Leads',
        title: 'Every lead at its stage',
        body: 'Define your own sales stages: new enquiry, quote sent, booked, closed. Leads from Facebook, Instagram and your website arrive on their own, and someone who fills in the form again joins their open lead instead of creating a duplicate.',
        tags: ['Your own stages', 'Leads arrive on their own', 'No duplicates', 'Notes & tags'],
        viz: { anim: 'customers', caption: 'Customers and leads in one place' },
      },
      {
        label: 'Broadcasts',
        title: 'A personal message to a thousand customers',
        body: 'Write it once and each customer’s name and details fill in. Preview it, send it or schedule it. Meta approves marketing messages in advance; delaCRM submits them and shows where each one stands. Anyone who replies “stop” is taken off the list.',
        tags: ['Names fill in', 'Preview', 'Scheduling', 'Automatic opt-out'],
        viz: { anim: 'template', caption: 'Customer details fill a saved message' },
      },
    ],
  },

  // Shown under the product section, the longest stretch without a button.
  productCta: { label: 'Try it free', note: TERMS },

  automations: {
    label: '03 / Reminders & bookings',
    title: 'It remembers when you’re busy',
    lede: 'Build a flow once and it runs by itself: a message for every new lead, a reminder before every appointment, a review request after a visit. Before you switch it on, run a test and see what would have gone out.',
    items: [
      {
        title: 'Appointment reminders',
        body: 'A day before and again a few hours before. Fewer no-shows, and nobody has to remember to send them.',
      },
      {
        title: 'An answer for every new lead',
        body: 'A lead from your campaign gets a WhatsApp message straight away. No reply in two days? They get a follow-up.',
      },
      {
        title: 'After the visit',
        body: 'A week later: ask how it went, request a review, offer the next treatment.',
      },
      {
        title: 'Birthdays and renewals',
        body: 'A message on their birthday, or a month before their plan runs out. Any date you keep on a customer can trigger a message.',
      },
      {
        title: 'Self-booking',
        body: 'Send a link and the customer picks a free slot. A separate calendar for every staff member, room or service, only in your working hours.',
      },
      {
        title: 'Syncs with your iPhone',
        body: 'New appointments show up in your calendar on iPhone, iPad and Mac, and anything you block there stops being offered.',
      },
    ],
  },

  agents: {
    label: '04 / AI agent',
    title: 'Who answers your customers at eleven at night?',
    lede: 'Most messages repeat themselves: when are you open, how much is it, is there a slot tomorrow morning. An AI agent answers them from your business’s own information and passes you only what needs you.',
    rows: [
      {
        label: 'Answers and acts',
        title: 'It books appointments, not just replies',
        body: 'The agent sees your calendar, books, moves and cancels appointments inside the conversation, and moves the lead to the next stage. When it doesn’t know, it hands over to a person, and it stops the moment a teammate replies. It can also be connected to your price list or your own system, through our team.',
        tags: ['Books in your calendar', 'Moves leads', 'Hands over to a person', 'Your price list'],
        viz: { anim: 'agent', caption: 'The agent checks the calendar before it answers' },
      },
      {
        label: 'Understands it all',
        title: 'Voice notes, photos and documents',
        body: 'Customers send a three-minute voice note, a photo, a PDF of an old quote. The agent understands all of it and answers in writing, and you read the content without listening to the recording.',
        tags: ['Voice notes as text', 'Photos', 'Video', 'PDFs & spreadsheets'],
        viz: { anim: 'voice', caption: 'A voice note turns into text' },
      },
    ],
    setup: {
      text: 'Rather not build it yourself? With the setup package we build your AI agent and automations with you, and test them before they talk to customers. ₪399 instead of ₪1,999, incl. VAT.',
      cta: { label: CHAT_LABEL, href: CHAT_SETUP },
    },
  },

  gettingStarted: {
    label: '05 / Getting started',
    title: 'Answer customers from delaCRM today',
    lede: `No new number and no “we’ve changed numbers” announcement. Three steps, nothing to install. Stuck? Message us ${VIA}.`,
    items: [
      {
        label: 'Step 1',
        title: 'Connect your number',
        body: 'Sign in with your business’s Facebook account and approve in the WhatsApp app on your phone. The number keeps working the whole time. Instagram and your Facebook Page connect the same way, and the last 90 days of leads come in.',
      },
      {
        label: 'Step 2',
        title: 'Bring in your contacts',
        body: 'Upload your customer list from a spreadsheet. Wrong and duplicate numbers are flagged during the upload.',
      },
      {
        label: 'Step 3',
        title: 'Invite your team',
        body: 'Add whoever talks to customers and choose what each person can do. From then on, everyone works from one inbox.',
      },
    ],
  },

  pricing: {
    label: '06 / Pricing',
    title: 'One price, the whole system',
    lede: 'No tiers and no locked features. Start free, and subscribe once you see it working.',
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
      desc: 'For one business and its whole team. Unlimited users.',
      cta: { label: 'Try it free', href: APP },
      terms: 'No credit card · No commitment · Cancel any time',
      features: [
        'WhatsApp, Instagram, Messenger and email in one inbox',
        'Leads from Facebook and your website, with sales stages',
        'Reminders, follow-ups and automations',
        'Calendars and self-booking',
        'An AI agent that answers and books',
        'Broadcasts to customers who opted in',
        'Users and permissions for the whole team',
        'Data export, API and integrations',
      ],
    },
    setup: {
      name: 'Setup package',
      badge: 'One-time',
      price: { was: '₪1,999', wasLabel: 'instead of ₪1,999', now: '₪399', unit: 'incl. VAT' },
      desc: 'Rather not build it yourself? We map with you how customers reach you and what you tell them, and build your automations and AI agent together.',
      cta: { label: CHAT_LABEL, href: CHAT_SETUP },
    },
    footnote:
      'Separately from the subscription, Meta charges a few agorot per message for messages a business starts from an approved template, such as an appointment reminder or a broadcast, and for replies beyond 1,000 a month. That fee goes to Meta, not to us, and you can see your usage in delaCRM.',
  },

  faq: {
    label: '07 / FAQ',
    title: 'What people ask before they start',
    items: [
      {
        q: 'How much does it cost?',
        a: '₪149 a month including VAT for your first 12 months, then ₪199 a month. The price is per business with unlimited users, and every subscription includes the whole system. Separately, Meta charges a few agorot per message for messages the business starts, such as an appointment reminder or a broadcast, and for replies beyond 1,000 a month.',
      },
      {
        q: 'What does the free trial include?',
        a: 'Sign up without a credit card, connect a channel and try it on real customers. The free plan includes 100 messages a month, incoming and outgoing, and delaCRM warns you as you approach the limit. After that, new messages still reach the app on your phone, but don’t come into delaCRM until you subscribe.',
      },
      {
        q: 'Do I have to give up my current number?',
        a: 'No. You connect your existing WhatsApp Business account and it keeps working in the phone app. Replies sent from the phone show up in delaCRM too, and when you connect you can bring in recent conversations as well.',
      },
      {
        q: 'Could my number get banned?',
        a: 'Not because of us. We connect through the official platform Meta built for businesses, not through unofficial tools, which is what gets numbers banned. What does put a number at risk is messaging people who didn’t ask to hear from you, so broadcasts only go to people who opted in, and anyone who replies “stop” is taken off the list.',
      },
      {
        q: 'We already use WhatsApp Business. What’s the difference?',
        a: 'With WhatsApp Business, whoever holds the phone usually answers, and there’s no way to tell who replied to whom. Here everyone has their own login, you can hand a chat to a specific person, and you can see who answered and when. Instagram, Messenger, leads, appointment reminders and an AI agent are in the same place.',
      },
      {
        q: 'What does the setup package include?',
        a: 'A discovery session with our team where we map how customers reach you, what they ask and what you answer. Then we build your reminders, follow-ups and AI agent with you, and test them before they talk to customers. The regular price is ₪1,999; right now it’s ₪399 including VAT.',
      },
      {
        q: 'Could the AI agent say something embarrassing?',
        a: 'You decide which conversations it handles and what it may answer. Before it talks to a single customer, you chat with it in a private test until it sounds like your business. When it doesn’t know, it hands over to a person, and it stops when a teammate replies. Everything it sends is kept and visible to you.',
      },
      {
        q: 'How many people can use it?',
        a: 'As many as you like, at no extra cost, each with their own login and permissions: full control or reply-only. If you run more than one business, say two branches, you can switch between them from the same login.',
      },
      {
        q: 'Is there a commitment? What happens to my data if I leave?',
        a: 'No commitment; cancel any time. You can export all your data whenever you like, and closing your account deletes it from our side. Your number stays yours and keeps working on your phone.',
      },
      {
        q: 'Does it connect to our other tools?',
        a: 'Usually, yes. Website forms, Facebook campaigns and automation tools can send leads in, and developers get an API and webhooks. You can also connect ChatGPT or Claude and ask them, say, which of this week’s leads haven’t had a reply yet.',
      },
    ],
  },

  cta: {
    label: 'Get started',
    title: 'Connect your number and see for yourself',
    lede: `Sign up free, connect WhatsApp and answer your first customer from delaCRM today. Have a question first? Message us ${VIA}.`,
    primary: { label: 'Try it free', href: APP },
    secondary: { label: CHAT_LABEL, href: CHAT },
    note: TERMS,
  },

  footer: {
    blurb:
      'One inbox for WhatsApp, Instagram, Messenger and email, for businesses that would rather answer customers than manage software.',
    cols: [
      {
        title: 'Product',
        links: [
          { href: '#product', label: 'Every channel' },
          { href: '#automations', label: 'Reminders & bookings' },
          { href: '#agents', label: 'AI agent' },
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
