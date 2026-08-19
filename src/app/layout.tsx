import type { Metadata } from 'next'
import { defaultMetadata } from '@/lib/metadata'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import './globals.css'

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-white text-content-main antialiased">
        <link rel="preconnect" href="https://cjip.jatengprov.go.id" />
        <link rel="dns-prefetch" href="https://cjip.jatengprov.go.id" />
        <div id="google_translate_element" className="hidden" aria-hidden="true" />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  )
}
