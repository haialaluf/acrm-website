/* Destinations, shared by both languages. */
export const EMAIL = 'contact@tika-ai.com'
export const APP = 'https://app.delacrm.com'
export const DEMO = `mailto:${EMAIL}?subject=delaCRM%20demo`

/**
 * delaCRM's own WhatsApp number, international format with no plus or spaces
 * (e.g. '972501234567'). Until it is filled in, the WhatsApp buttons fall back
 * to email rather than pointing at a dead wa.me link.
 */
const WHATSAPP_NUMBER = ''

/** Whether the WhatsApp buttons really open WhatsApp; their labels follow it. */
export const HAS_WHATSAPP = Boolean(WHATSAPP_NUMBER)

/** A chat with us on WhatsApp, opened with `text` already typed. */
export const whatsapp = (text) =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : DEMO
