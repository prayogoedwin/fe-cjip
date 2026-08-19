import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logoutApi } from '@/lib/api'
import {
  AUTH_COOKIE,
  AUTH_TOKEN_COOKIE,
  clearAuthCookieOptions,
  clearLegacyAuthFlagOptions,
} from '@/lib/auth'

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value

  if (token) {
    try {
      await logoutApi(token)
    } catch {
      // Still clear local session even if Laravel logout fails
    }
  }

  const response = NextResponse.json({
    success: true,
    data: { message: 'Logged out' },
  })

  response.cookies.set(AUTH_TOKEN_COOKIE, '', clearAuthCookieOptions())
  response.cookies.set(AUTH_COOKIE, '', clearLegacyAuthFlagOptions())

  return response
}
