export const AUTH_COOKIE = 'cjip_auth'
export const AUTH_TOKEN_COOKIE = 'cjip_token'

export const LOGIN_REDIRECTS: Record<string, string> = {
  sinida: '/permohonan-insentif',
}

export function getRedirectAfterLogin(rdr: string | null | undefined): string {
  if (rdr && LOGIN_REDIRECTS[rdr]) {
    return LOGIN_REDIRECTS[rdr]
  }
  return '/'
}

export function setAuthCookie(token?: string): void {
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  if (token) {
    document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  }
}

export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`
  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`
}

export function getAuthTokenFromDocument(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_TOKEN_COOKIE}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}
