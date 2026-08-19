import { cookies } from 'next/headers'
import type { ApiLocale } from '@/lib/api/client'
import { isApiLocale, LANG_COOKIE } from '@/lib/locale-shared'

export { LANG_COOKIE, isApiLocale } from '@/lib/locale-shared'

/** Server Components: baca locale untuk ?lang= pada API v3. */
export async function getServerLocale(): Promise<ApiLocale> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LANG_COOKIE)?.value
  return isApiLocale(raw) ? raw : 'id'
}
