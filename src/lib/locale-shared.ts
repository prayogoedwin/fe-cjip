import type { ApiLocale } from '@/lib/api/client'

export const LANG_COOKIE = 'cjip_lang'

export function isApiLocale(value: string | undefined): value is ApiLocale {
  return value === 'id' || value === 'en'
}
