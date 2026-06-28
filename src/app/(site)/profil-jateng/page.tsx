import type { Metadata } from 'next'
import { ProfilJatengContent } from '@/components/profil/ProfilJatengContent'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Profil Jawa Tengah',
  'Mengenal potensi, sumber daya, dan daya tarik investasi Provinsi Jawa Tengah',
)

export default function ProfilJatengPage() {
  return <ProfilJatengContent />
}
