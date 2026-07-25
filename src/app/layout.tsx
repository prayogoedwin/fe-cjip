import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { defaultMetadata } from '@/lib/metadata'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans bg-white text-content-main antialiased`}>
        <link rel="preconnect" href="https://cjip.jatengprov.go.id" />
        <link rel="dns-prefetch" href="https://cjip.jatengprov.go.id" />
        <div id="google_translate_element" className="hidden" aria-hidden="true" />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  )
}
