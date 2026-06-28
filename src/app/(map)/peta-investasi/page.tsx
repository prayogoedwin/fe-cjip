import type { Metadata } from 'next'
import { PetaInvestasiContent } from '@/components/peta/PetaInvestasiContent'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Peta Investasi',
  'Peta interaktif peluang investasi, kawasan industri, dan infrastruktur Jawa Tengah',
)

export default function PetaInvestasiPage() {
  return <PetaInvestasiContent />
}
