import type { Metadata } from 'next'
import { ProfilJatengContent } from '@/components/profil/ProfilJatengContent'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchProfilJateng } from '@/lib/api'

export const metadata: Metadata = createPageMetadata(
  'Profil Jawa Tengah',
  'Mengenal potensi, sumber daya, dan daya tarik investasi Provinsi Jawa Tengah',
)

export default async function ProfilJatengPage() {
  const profil = await fetchProfilJateng()

  return <ProfilJatengContent data={profil?.data ?? null} />
}
