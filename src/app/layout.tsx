import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { defaultMetadata } from '@/lib/metadata'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans bg-white text-content-main antialiased`}>
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  )
}
