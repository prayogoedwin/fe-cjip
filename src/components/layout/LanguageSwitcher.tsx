'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ensureGoogleTranslateLoaded,
  getGoogleTranslateLanguage,
  setGoogleTranslateLanguage,
} from '@/lib/google-translate'
import { getLanguageByCode, LANGUAGES, type LanguageCode } from '@/lib/languages'

/** Self-contained language menu — loads Translate only when needed. */
export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('id')
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lang = getGoogleTranslateLanguage()
    setCurrentLang(lang)
    if (lang !== 'id') {
      void ensureGoogleTranslateLoaded()
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  const activeLanguage = getLanguageByCode(currentLang)

  async function handleSelect(code: LanguageCode) {
    setCurrentLang(code)
    setIsOpen(false)
    await setGoogleTranslateLanguage(code)
  }

  return (
    <div ref={rootRef} className="relative notranslate">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 rounded-md border border-white/20 px-2.5 py-1.5 text-[0.8rem] text-white/80 transition duration-300 hover:bg-white/10"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Pilih bahasa"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeLanguage.flag}
          alt={`Bendera ${activeLanguage.label}`}
          className="h-3 w-[18px] rounded-sm object-cover"
          width={18}
          height={12}
          loading="lazy"
        />
        <span>{activeLanguage.displayCode}</span>
        <span className="text-[0.6rem] opacity-70" aria-hidden="true">
          ▾
        </span>
      </button>

      <div
        className={`absolute top-[calc(100%+6px)] right-0 z-[200] min-w-[170px] overflow-hidden rounded-lg border border-cjip-border bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition duration-300 ${
          isOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => void handleSelect(lang.code)}
            className={`flex w-full items-center gap-2 px-4 py-2 text-left text-[0.82rem] transition duration-300 hover:bg-brand-200 ${
              currentLang === lang.code ? 'bg-brand-50 font-semibold text-brand-900' : 'text-content-main'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lang.flag}
              alt={`Bendera ${lang.label}`}
              className="h-3 w-[18px] rounded-sm object-cover"
              width={18}
              height={12}
              loading="lazy"
            />
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}
