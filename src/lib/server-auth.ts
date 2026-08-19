import 'server-only'
import { cookies } from 'next/headers'

import { AUTH_TOKEN_COOKIE } from '@/lib/auth'

export async function getServerAuthToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(AUTH_TOKEN_COOKIE)?.value ?? null
}
