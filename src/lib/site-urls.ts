/** Laravel app root (strip trailing /api from NEXT_PUBLIC_API_URL). */
export function getLaravelAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (raw) {
    return raw.replace(/\/api\/?$/, '')
  }
  return 'http://127.0.0.1:8000'
}

/** CJIBF lives on Laravel web route `/cjibf`, not in Next.js. */
export function getCjibfUrl(): string {
  return process.env.NEXT_PUBLIC_CJIBF_URL?.trim() || `${getLaravelAppUrl()}/cjibf`
}

export function isExternalUrl(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}
