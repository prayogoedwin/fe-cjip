import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { GoogleTranslate } from '@/components/seo/GoogleTranslate'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GoogleTranslate />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
