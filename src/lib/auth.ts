/** Legacy flag cookie — cleared on login/logout; no longer used for auth checks. */
export const AUTH_COOKIE = 'cjip_auth'

/** Sanctum bearer token — HttpOnly, set only via Next.js BFF routes. */
export const AUTH_TOKEN_COOKIE = 'cjip_token'

export const AUTH_MAX_AGE = 60 * 60 * 24 * 7

export const LOGIN_REDIRECTS: Record<string, string> = {
  sinida: '/permohonan-insentif',
  perusahaan: '/perusahaan',
}

type CookieWriteOptions = {
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
  path?: string
  maxAge?: number
}

/** Secure cookies only when the public site is HTTPS (VPS may still be HTTP). */
function cookieSecure(): boolean {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (site) return site.startsWith('https://')
  return process.env.NODE_ENV === 'production'
}

export function getRedirectAfterLogin(rdr: string | null | undefined): string {
  if (rdr && LOGIN_REDIRECTS[rdr]) {
    return LOGIN_REDIRECTS[rdr]
  }
  return '/perusahaan'
}

export function authTokenCookieOptions(): CookieWriteOptions {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_MAX_AGE,
  }
}

export function clearAuthCookieOptions(): CookieWriteOptions {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  }
}

/** Clear legacy non-HttpOnly `cjip_auth` flag from older clients. */
export function clearLegacyAuthFlagOptions(): CookieWriteOptions {
  return {
    httpOnly: false,
    secure: cookieSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  }
}
