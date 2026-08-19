'use client'

import { useEffect } from 'react'
import { ensureGoogleTranslateLoaded, getGoogleTranslateLanguage } from '@/lib/google-translate'

/** Hydrate Google Translate when visitor already chose EN/CN (googtrans cookie). */
export function GoogleTranslate() {
  useEffect(() => {
    const lang = getGoogleTranslateLanguage()
    if (lang === 'id') return
    void ensureGoogleTranslateLoaded()
  }, [])

  return null
}
