import type { Metadata } from 'next'
import { PanduanContent } from '@/components/panduan/PanduanContent'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Panduan Investasi',
  'Panduan lengkap prosedur investasi, perizinan, insentif, dan layanan bantuan di Jawa Tengah',
)

export default function PanduanInvestasiPage() {
  return <PanduanContent />
}
