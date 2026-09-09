import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { applyDocumentLocale, detectLocale, dirOf, writeStored } from './locale.js'
import { copy } from '../content/index.js'

const Ctx = createContext(null)

export function LocaleProvider({ initial = detectLocale(), children }) {
  const [locale, setLocale] = useState(initial)

  const value = useMemo(
    () => ({
      locale,
      dir: dirOf(locale),
      t: copy[locale],
      /** Switching is a deliberate act, so it is remembered from here on. */
      setLocale: (next) => {
        writeStored(next)
        setLocale(next)
      },
    }),
    [locale],
  )

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
