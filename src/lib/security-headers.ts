type Header = { key: string; value: string }

function apiOrigins(): string[] {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!raw) return []
  try {
    const url = new URL(raw)
    return [`${url.protocol}//${url.host}`]
  } catch {
    return []
  }
}

/** Security headers applied to all HTML routes via next.config.ts */
export function buildSecurityHeaders(): Header[] {
  const apiOrigin = apiOrigins().join(' ')
  const connectSrc = [
    "'self'",
    apiOrigin,
    'https://challenges.cloudflare.com',
    'https://translate.googleapis.com',
    'https://*.google.com',
    'https://*.googleapis.com',
  ]
    .filter(Boolean)
    .join(' ')

  const imgSrc = ["'self'", 'data:', 'blob:', 'https:', apiOrigin].filter(Boolean).join(' ')

  // Google Translate loads extra scripts from translate-pa.googleapis.com (not *.google.com).
  const googleTranslateScript = [
    'https://translate.google.com',
    'https://translate.googleapis.com',
    'https://translate-pa.googleapis.com',
    'https://www.gstatic.com',
    'https://*.google.com',
    'https://*.googleapis.com',
  ].join(' ')

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com ${googleTranslateScript}`,
    `script-src-elem 'self' 'unsafe-inline' https://challenges.cloudflare.com ${googleTranslateScript}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${googleTranslateScript}`,
    `img-src ${imgSrc}`,
    "font-src 'self' data: https://fonts.gstatic.com https://www.gstatic.com",
    `connect-src ${connectSrc}`,
    `frame-src https://challenges.cloudflare.com ${googleTranslateScript} https://translate.googleusercontent.com`,
  ].join('; ')

  return [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=()',
    },
  ]
}
