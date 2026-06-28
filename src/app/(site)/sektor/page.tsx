import type { Metadata } from 'next'
import { SektorContent } from '@/components/sektor/SektorContent'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Sektor',
  'Jelajahi peluang investasi berdasarkan sektor unggulan Jawa Tengah',
)

export default function SektorPage() {
  return <SektorContent />
}
