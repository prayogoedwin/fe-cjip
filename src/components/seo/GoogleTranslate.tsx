'use client'

import { useEffect } from 'react'
import {
  ensureGoogleTranslateLoaded,
  getGoogleTranslateLanguage,
} from '@/lib/google-translate'

/**
 * Does not load Translate on first paint.
 * Only hydrates the script if the visitor already chose a non-ID language.
 */
export function GoogleTranslate() {
  useEffect(() => {
    const lang = getGoogleTranslateLanguage()
    if (lang === 'id') return

    let cancelled = false
    let timeoutId: number | undefined
    let idleId: number | undefined

    const run = () => {
      if (!cancelled) void ensureGoogleTranslateLoaded()
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(run)
    } else {
      timeoutId = window.setTimeout(run, 1500)
    }

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />
}
