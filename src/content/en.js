/* All English page copy. Mirror any structural change here in he.js. */
import { APP, DEMO, EMAIL } from './links.js'

export default {
  meta: {
    title: 'delaCRM — every customer message in one inbox your team shares',
    description:
      'delaCRM puts WhatsApp and Instagram into one inbox your whole team can answer from, with email and Facebook lead forms in the same place — plus reminders that send themselves, a booking link customers can use, and an assistant that replies when you can’t. Keep your existing number.',
  },

  /** Shown on the button that switches away from this language. */
  switchTo: { label: 'עברית', title: 'עבור לעברית', lang: 'he' },

  nav: {
    /* `long` is used in the mobile menu, where there is room for fuller wording. */
    links: [
      { href: '#channels', label: 'Channels' },
      { href: '#platform', label: 'What you get' },
      { href: '#automations', label: 'Reminders', long: 'Reminders & bookings' },
      { href: '#agents', label: 'AI assistant' },
      { href: '#faq', label: 'FAQ' },
    ],
    demo: 'Book a demo',
    signIn: 'Sign in',
    menu: 'Menu',
  },

  hero: {
    eyebrow: 'WhatsApp · Instagram · Email · Lead forms',
    title: 'Stop losing customers in your messages.',
    lede: 'Every WhatsApp and Instagram message arrives in one inbox your whole team can answer from — on your existing number — with email going out from the same place. Reminders send themselves, customers book their own appointments, and an assistant handles the questions you answer twenty times a day.',
    primary: { label: 'Start free', href: APP },
    secondary: { label: 'Book a 20-minute demo', href: DEMO },
    rail: [
      { text: 'Messages arrive scattered — ', strong: 'every channel, every hour' },
      { text: 'They leave ordered — ', strong: 'one queue, one team, one record' },
    ],
  },

  facts: [
    {
      title: 'Keep your number',
      body: 'The number on your door, your van and your business card stays exactly as it is. It keeps working on the phone, too.',
    },
    {
      mark: 'Meta-approved provider',
      title: 'Your account stays safe',
      body: 'delaCRM passed Meta Business Verification and Meta’s app review, and connects straight to the official WhatsApp Business Platform. Not a workaround that gets numbers blocked.',
    },
    {
      title: 'Your team, one number',
      body: 'Everyone answers from the same place, and you can see who replied. No shared phone, no shared password.',
    },
    {
      title: 'Nothing to install',
      body: 'Open it in a browser or on your phone. If you can use WhatsApp Web, you can use this on day one.',
    },
  ],

  scatter: {
    label: '01 / Sound familiar?',
    title: 'The messages aren’t the problem. The scatter is.',
    lede: 'Customers write wherever is convenient for them. That leaves you with WhatsApp on one person’s phone, Instagram DMs behind someone’s personal login, a website form that emails three people, and no way to know who already answered.',
    items: [
      {
        label: 'Costs you',
        title: 'Two people answer, or nobody does',
        body: 'Either way the customer notices, and they mention it. Meanwhile your team is asking each other “did you get back to her?”',
      },
      {
        label: 'Costs you',
        title: 'The number lives on one phone',
        body: 'Whoever holds it becomes the bottleneck — and every conversation with every customer walks out with them when they go on holiday or leave.',
      },
      {
        label: 'Costs you',
        title: 'Follow-ups run on memory',
        body: 'The quote nobody chased. The appointment nobody confirmed. Nothing breaks loudly; the money just doesn’t arrive.',
      },
    ],
  },

  channels: {
    label: '02 / One inbox',
    title: 'They write wherever they like. You read it in one place.',
    lede: 'WhatsApp and Instagram arrive as one list of conversations, sorted newest first, with the customer’s whole history attached. Email goes out from the same place, and lead forms drop into the same contact list.',
    items: [
      {
        title: 'WhatsApp',
        body: 'Your existing WhatsApp Business number, connected properly — so it works on your phone and in delaCRM at the same time. Customers see no change at all.',
      },
      {
        title: 'Instagram',
        body: 'Instagram DMs land in the same list as everything else. No separate tab, and no handing your personal login around the team.',
      },
      {
        title: 'Email',
        body: 'Send from your own domain, beside the chats, with saved wording you can reuse — announcements and follow-ups for the customers who still prefer an email. Sending only: replies come back to your normal mailbox.',
      },
      {
        title: 'Facebook lead forms',
        body: 'Instant Form leads from your Facebook and Instagram ads become contacts on their own, ready to message or drop straight into a follow-up. Your website form can post leads in the same way.',
      },
    ],
  },

  gettingStarted: {
    label: '03 / Getting started',
    title: 'You could be answering from it this afternoon.',
    lede: 'No new number, no SIM card, no “we’ve changed number” post. You connect the WhatsApp Business account you already have, and most of the work is deciding what you want to say.',
    items: [
      {
        label: 'Step one',
        title: 'Connect your number',
        body: 'Sign in and approve delaCRM through WhatsApp itself. It takes a few clicks and your number keeps working the whole time. Instagram connects the same way.',
      },
      {
        label: 'Step two',
        title: 'Bring your contacts',
        body: 'Upload your customer list from a spreadsheet — wrong or duplicated numbers get flagged as they come in — then write the messages you send most often.',
      },
      {
        label: 'Step three',
        title: 'Invite your team',
        body: 'Add the people who answer customers, decide who can do what, and start working the same inbox together instead of forwarding screenshots.',
      },
    ],
  },

  platform: {
    label: '04 / What you get',
    title: 'Everything that happens after “hello”.',
    lede: 'Most tools stop at sending a message. This covers the rest: who you’re talking to, what you’ve already promised them, who on the team is handling it, and what it’s costing you this month.',
    rows: [
      {
        label: 'Shared inbox',
        title: 'One conversation per customer, live for the whole team',
        body: 'It looks and works like WhatsApp — photos, voice notes, documents, ticks that tell you the message was read. The difference is that your colleague can pick up the thread where you left it, and the history is still there in a year when the customer comes back.',
        tags: ['Works on your phone', 'Photos & voice notes', 'Read receipts', 'Full history'],
        viz: { anim: 'inbox', caption: 'Messages arriving and being picked up' },
      },
      {
        label: 'Announcements',
        title: 'Tell a thousand customers something, personally',
        body: 'Write it once with the customer’s name and details filled in automatically, check how it looks, and send it to your list — or schedule it for the hour people actually read their phone. WhatsApp has to approve promotional wording in advance; the app walks you through the submission and shows you where each one stands.',
        tags: ['Names filled in', 'Preview before sending', 'Send to a list', 'Schedule for later'],
        viz: { anim: 'template', caption: 'Customer details filling a saved message' },
      },
      {
        label: 'Customers & team',
        title: 'A customer list, real permissions, and a bill you see coming',
        body: 'Every person who ever messaged you, in one list you can search. Staff invited with the access you choose — full control, or answering only. And a simple chart of how many messages you’ve sent this month, while there’s still time to do something about it.',
        tags: ['Searchable customer list', 'Staff permissions', 'Usage you can see', 'Several businesses'],
        viz: { anim: 'customers', caption: 'Your customer list and this month’s usage' },
      },
    ],
  },

  automations: {
    label: '05 / Reminders & bookings',
    title: 'The follow-ups you’d otherwise forget.',
    lede: 'Set it up once and it keeps happening: the reminder the day before an appointment, the check-in a week after delivery, the nudge on a quote nobody answered. Sent whether or not anyone remembered — which is the entire point.',
    items: [
      {
        title: 'Appointment reminders',
        body: 'A message the day before, or a few hours before, automatically. Fewer no-shows, and nobody on your team has to keep a list.',
      },
      {
        title: 'Follow up after the sale',
        body: 'Check in a week later, ask for a review, offer the refill. The messages that grow repeat business, sent without anyone diarising them.',
      },
      {
        title: 'Chase the quiet leads',
        body: 'Someone asked for a price and went silent. A polite nudge two days later, automatically, in the same conversation.',
      },
      {
        title: 'Let customers book themselves',
        body: 'Send a link, they pick a free slot. It only offers the hours you actually work, so nothing lands on your evening.',
      },
      {
        title: 'On the calendar in your pocket',
        body: 'New bookings appear on your iPhone, iPad or Mac — and anything you block there stops being offered. Any other app that speaks CalDAV can connect too.',
      },
      {
        title: 'Try it before customers see it',
        body: 'Run any reminder as a test and read exactly what would have been sent, before a single customer gets anything.',
      },
    ],
  },

  agents: {
    label: '06 / AI assistant',
    title: 'Someone to answer at eleven at night.',
    lede: 'Most of what arrives isn’t really a conversation: opening hours, do you deliver here, is this in stock, how much. An assistant can take those and hand you the ones that are actually worth your time.',
    rows: [
      {
        label: 'It can check things',
        title: 'It answers from your business, not from guesswork',
        body: 'This is the difference that matters: the assistant can look things up before it replies. Your availability it reads out of the box — it books, moves and cancels appointments itself. Your prices, your stock, the system you already keep them in: we connect those, and then “do you have it in a 42?” gets a real answer instead of a polite deflection.',
        tags: ['Your calendar, built in', 'Your prices', 'Your stock', 'Your own systems, connected'],
        viz: { anim: 'agent', caption: 'The assistant checking before it answers' },
      },
      {
        label: 'It understands more than text',
        title: 'Voice notes, photos, documents — all of it',
        body: 'Customers send what’s convenient: a rambling voice note, a photo of the broken part, a PDF of the old invoice. All of it gets read and turned into something you can act on, so nobody has to hold a phone to their ear to find out what the message said.',
        tags: ['Voice notes read as text', 'Photos', 'Video', 'PDFs & spreadsheets'],
        viz: { anim: 'voice', caption: 'A voice note becoming text' },
      },
    ],
  },

  noLockIn: {
    label: '07 / No lock-in',
    title: 'Nothing here is held hostage.',
    lede: 'The things that make switching tools frightening — and where each of them stands here.',
    items: [
      {
        label: 'Stays yours',
        title: 'Your number',
        body: 'It never becomes ours. It keeps working on your phone the whole time you use delaCRM, and it keeps working if you stop.',
      },
      {
        label: 'Stays yours',
        title: 'Your customers and their history',
        body: 'Contacts, conversations, the lot — yours to take out through the API whenever you want, or ask and we’ll put the export together for you. And closing your account deletes it here rather than quietly keeping it.',
      },
      {
        label: 'If you want it',
        title: 'Run it on your own servers',
        body: 'Most businesses never need this. But the software is open, so if your IT person or your industry demands it, delaCRM can run entirely on infrastructure you own.',
      },
    ],
  },

  faq: {
    label: '08 / FAQ',
    title: 'Straight answers.',
    items: [
      {
        q: 'Do I have to give up my current WhatsApp number?',
        a: 'No. You connect the WhatsApp Business account you already have, and it keeps working on the phone at the same time. The number on your door, your van and your business card doesn’t change, and your customers won’t notice anything except faster replies.',
      },
      {
        q: 'Could my number get blocked?',
        a: 'Not for using delaCRM. We connect through the route WhatsApp built for businesses, which is the opposite of the copy-paste tools that get numbers blocked. What you can still get in trouble for is messaging people who never asked to hear from you — that’s true on every platform, and the app is built to keep you the right side of it.',
      },
      {
        q: 'What does it cost?',
        a: 'You can start free and watch your own message volume before you spend anything. WhatsApp charges businesses separately for some conversations, so you’ll see two numbers rather than one hidden in the other — we’d rather show you both. Book a call and we’ll price it against your actual volume.',
      },
      {
        q: 'How hard is it to set up?',
        a: 'Connecting your number is a few clicks. Uploading your customer list is a spreadsheet. Most businesses are answering customers from it the same day, and if you’d rather not do it alone we’ll sit on a call and do it with you.',
      },
      {
        q: 'Can I message my whole customer list?',
        a: 'You can message the customers who agreed to hear from you, and WhatsApp reviews promotional wording before it goes out — the app handles that submission for you. Anyone who replies STOP is removed immediately. If you’re looking for a tool that ignores all that, this isn’t it.',
      },
      {
        q: 'Is the AI assistant going to say something embarrassing?',
        a: 'That’s the right worry. You decide which conversations it touches and what it’s allowed to look up, you can read every word it sent, and it hands the conversation to a person the moment it should — it also goes quiet on its own as soon as one of your team replies in the thread. And before it answers a single customer, you can sit and talk to it yourself in a private test conversation until it sounds like you.',
      },
      {
        q: 'How many people can use it?',
        a: 'As many as you invite, each with the access you choose. One person can also run more than one business from the same login and switch between them — useful if you have two locations, or manage accounts for clients.',
      },
      {
        q: 'What happens to my data if I leave?',
        a: 'You take your export first — through the API, or ask us and we’ll put it together. Closing your account then deletes your contacts, conversations, messages and everything attached to them in one go; files and images are swept within the hour and unreadable in the meantime. Encrypted backups age out on the schedule set out in our privacy policy.',
      },
      {
        q: 'Do you work with my other systems?',
        a: 'Usually, yes. Website forms, Facebook lead ads, spreadsheets and most automation tools can send leads straight in, and if you have a developer or agency, the same API the app itself runs on is open to them, along with webhooks and an MCP server for AI tools. Tell us what you run and we’ll tell you honestly whether it connects.',
      },
      {
        q: 'Are you part of WhatsApp or Meta?',
        a: 'We’re a Meta-approved provider. delaCRM passed Meta Business Verification and Meta’s app review, and connects directly to the official WhatsApp Business Platform — which is what lets you connect your number the way WhatsApp intends businesses to connect, with no workaround that gets numbers blocked. What we are not is part of Meta itself: delaCRM is an independent company, not affiliated with, endorsed by, or sponsored by WhatsApp LLC or Meta Platforms, Inc.',
      },
    ],
  },

  cta: {
    label: 'Get started',
    title: 'Twenty minutes, and an honest answer.',
    lede: 'Tell us how customers reach you today and we’ll tell you whether this is worth the change for a business your size. If it isn’t yet, we’ll say so — that’s a shorter conversation than the alternative.',
    primary: { label: 'Book a demo', href: DEMO },
    secondary: { label: 'Start free', href: APP },
  },

  footer: {
    blurb:
      'One inbox for WhatsApp and Instagram, with email and lead forms in the same place — for businesses that would rather answer customers than manage software.',
    cols: [
      {
        title: 'Product',
        links: [
          { href: '#channels', label: 'One inbox' },
          { href: '#platform', label: 'What you get' },
          { href: '#automations', label: 'Reminders & bookings' },
          { href: '#agents', label: 'AI assistant' },
          { href: '#how', label: 'Getting started' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { href: 'privacy.html', label: 'Privacy Policy' },
          { href: 'data-deletion.html', label: 'Data Deletion' },
        ],
      },
      {
        title: 'Company',
        links: [
          { href: `mailto:${EMAIL}`, label: EMAIL },
          { href: DEMO, label: 'Book a demo' },
          { href: APP, label: 'Sign in' },
        ],
      },
    ],
    copyright: (year) => `© ${year} HaiTech · Tel Aviv, Israel`,
    disclaimer:
      'delaCRM is an independent software provider and is not affiliated with, endorsed by, or sponsored by WhatsApp LLC or Meta Platforms, Inc.',
  },
}
