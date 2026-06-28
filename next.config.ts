import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cjip.jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'dpmptsp.jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'jateng.bps.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'www.kerisjateng.id', pathname: '/**' },
      { protocol: 'https', hostname: 'bursakerja.jatengprov.go.id', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
  },
}

export default nextConfig
