import type { NextConfig } from 'next'
import { buildSecurityHeaders } from './src/lib/security-headers'

const apiHostname = (() => {
  try {
    const raw = process.env.NEXT_PUBLIC_API_URL
    if (!raw) return null
    return new URL(raw).hostname
  } catch {
    return null
  }
})()

const isLocalApiHost =
  apiHostname === '127.0.0.1' ||
  apiHostname === 'localhost' ||
  apiHostname === '0.0.0.0' ||
  process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  // Dev: allow opening app via http://127.0.0.1:3000 (not only localhost)
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: buildSecurityHeaders(),
      },
    ]
  },
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || 'http://127.0.0.1:8000'
    return [
      {
        source: '/map/:path*',
        destination: `${apiBase}/map/:path*`,
      },
    ]
  },
  images: {
    // Next.js 16 blocks private IPs (127.0.0.1) by default for SSRF protection.
    // Local Laravel storage lives on 127.0.0.1:8000 — must allow in development.
    dangerouslyAllowLocalIP: isLocalApiHost,
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'cjip.jatengprov.go.id', pathname: '/**' },
      { protocol: 'http', hostname: 'cjip.jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'dpmptsp.jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'jateng.bps.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'www.kerisjateng.id', pathname: '/**' },
      { protocol: 'https', hostname: 'bursakerja.jatengprov.go.id', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
      ...(apiHostname
        ? [
            { protocol: 'http' as const, hostname: apiHostname, pathname: '/**' },
            { protocol: 'https' as const, hostname: apiHostname, pathname: '/**' },
          ]
        : []),
    ],
  },
}

export default nextConfig
