import type { Metadata } from 'next'

const baseUrl = 'https://cjip.jatengprov.go.id'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'CJIP — Central Java Investment Platform',
    template: '%s | CJIP Jawa Tengah',
  },
  description:
    'Platform investasi resmi Provinsi Jawa Tengah. Temukan peluang investasi, kawasan industri, dan data ekonomi Jawa Tengah.',
  keywords: ['investasi jawa tengah', 'CJIP', 'DPMPTSP jateng', 'kawasan industri'],
  authors: [{ name: 'DPMPTSP Provinsi Jawa Tengah' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    siteName: 'CJIP Jawa Tengah',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  robots: { index: true, follow: true },
}