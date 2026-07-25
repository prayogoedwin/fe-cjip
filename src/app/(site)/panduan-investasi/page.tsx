import type { Metadata } from 'next'
import { PanduanContent } from '@/components/panduan/PanduanContent'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchFaq } from '@/lib/api'

export const metadata: Metadata = createPageMetadata(
  'Panduan Investasi',
  'Panduan lengkap prosedur investasi, perizinan, insentif, dan layanan bantuan di Jawa Tengah',
)

export default async function PanduanInvestasiPage() {
  const faq = await fetchFaq()

  return <PanduanContent faqGroups={faq?.data ?? null} />
}
