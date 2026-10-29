import { createContext, useContext, useEffect, useMemo } from 'react'
import { applyDocumentLocale, dirOf } from './locale.js'
import { copy } from '../content/index.js'

const Ctx = createContext(null)

/** The language is fixed per page; switching it is a link to the other page. */
export function LocaleProvider({ initial, children }) {
  const locale = initial

  const value = useMemo(() => ({ locale, dir: dirOf(locale), t: copy[locale] }), [locale])

  useEffect(() => {
    applyDocumentLocale(locale, value.t.meta)
  }, [locale, value.t])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLocale() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLocale must be used inside <LocaleProvider>')
  return v
}

/** Shorthand for the common case of only wanting the page copy. */
export const useCopy = () => useLocale().t
