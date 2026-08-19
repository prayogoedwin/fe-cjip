/** `Secure` flag for non-HttpOnly client cookies (locale, translate). */
export function clientCookieSecureSuffix(): string {
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return '; Secure'
  }
  return ''
}
