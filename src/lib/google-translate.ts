import type { LanguageCode } from '@/lib/languages'
import { LANGUAGES } from '@/lib/languages'

const COOKIE_NAME = 'googtrans'
const SCRIPT_ID = 'google-translate-script'
const INIT_FN = 'googleTranslateElementInit'

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string,
        ) => void
      }
    }
    [INIT_FN]?: () => void
  }
}

let loadPromise: Promise<void> | null = null

export function getGoogleTranslateLanguage(): LanguageCode {
  if (typeof document === 'undefined') return 'id'

  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  if (!match) return 'id'

  const value = decodeURIComponent(match[1])
  const target = value.split('/').pop()

  if (target === 'en') return 'en'
  if (target === 'zh-CN') return 'zh-CN'
  return 'id'
}

function setTranslateCookie(lang: LanguageCode) {
  const cookieValue = lang === 'id' ? '/id/id' : `/id/${lang}`
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()

  document.cookie = `${COOKIE_NAME}=${cookieValue}; path=/; expires=${expires}`
  document.cookie = `${COOKIE_NAME}=${cookieValue}; path=/; domain=${window.location.hostname}; expires=${expires}`
}

function ensureTranslateElementMount() {
  if (document.getElementById('google_translate_element')) return
  const el = document.createElement('div')
  el.id = 'google_translate_element'
  el.className = 'hidden'
  el.setAttribute('aria-hidden', 'true')
  document.body.appendChild(el)
}

function initTranslateElement() {
  if (!window.google?.translate?.TranslateElement) return
  if (document.querySelector('.goog-te-combo')) return

  ensureTranslateElementMount()

  const TranslateElement = window.google.translate.TranslateElement as typeof window.google.translate.TranslateElement & {
    InlineLayout?: { SIMPLE: number }
  }

  new TranslateElement(
    {
      pageLanguage: 'id',
      includedLanguages: 'id,en,zh-CN',
      layout: TranslateElement.InlineLayout?.SIMPLE ?? 0,
      autoDisplay: false,
    },
    'google_translate_element',
  )
}

/** Load Google Translate only when needed (language switch / non-ID cookie). */
export function ensureGoogleTranslateLoaded(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (document.querySelector('.goog-te-combo')) {
    return Promise.resolve()
  }

  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    ensureTranslateElementMount()

    window[INIT_FN] = () => {
      try {
        initTranslateElement()
        resolve()
      } catch (error) {
        reject(error)
      }
    }

    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      if (window.google?.translate?.TranslateElement) {
        window[INIT_FN]?.()
      }
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://translate.google.com/translate_a/element.js?cb=${INIT_FN}`
    script.async = true
    script.onerror = () => {
      loadPromise = null
      reject(new Error('Failed to load Google Translate'))
    }
    document.body.appendChild(script)
  })

  return loadPromise
}

export async function setGoogleTranslateLanguage(lang: LanguageCode) {
  if (typeof window === 'undefined') return

  if (lang === 'id') {
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    document.cookie = `${COOKIE_NAME}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    window.location.reload()
    return
  }

  setTranslateCookie(lang)

  try {
    await ensureGoogleTranslateLoaded()
  } catch {
    window.location.reload()
    return
  }

  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (select) {
    select.value = lang
    select.dispatchEvent(new Event('change'))
    return
  }

  window.location.reload()
}

export function isSupportedLanguage(code: string): code is LanguageCode {
  return LANGUAGES.some((lang) => lang.code === code)
}
