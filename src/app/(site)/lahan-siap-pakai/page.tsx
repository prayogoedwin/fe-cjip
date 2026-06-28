import type { Metadata } from 'next'
import { LahanContent } from '@/components/lahan/LahanContent'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Lahan Siap Pakai',
  'Basis data lahan siap pakai untuk investasi di Provinsi Jawa Tengah',
)

export default function LahanSiapPakaiPage() {
  return <LahanContent />
}
