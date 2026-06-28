export const AUTH_COOKIE = 'cjip_auth'

export const LOGIN_REDIRECTS: Record<string, string> = {
  sinida: '/permohonan-insentif',
}

export function getRedirectAfterLogin(rdr: string | null | undefined): string {
  if (rdr && LOGIN_REDIRECTS[rdr]) {
    return LOGIN_REDIRECTS[rdr]
  }
  return '/'
}

export function setAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`
}

export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`
}
