import type { Metadata } from 'next'
import { ProfilJatengContent } from '@/components/profil/ProfilJatengContent'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchKabKota, fetchProfilJateng, isKabupatenKotaName } from '@/lib/api'
import { getServerLocale } from '@/lib/locale'

export const metadata: Metadata = createPageMetadata(
  'Profil Jawa Tengah',
  'Mengenal potensi, sumber daya, dan daya tarik investasi Provinsi Jawa Tengah',
)

export default async function ProfilJatengPage() {
  const lang = await getServerLocale()
  const [profil, kabkota] = await Promise.all([fetchProfilJateng(lang), fetchKabKota(lang)])

  const wilayah = (profil?.data?.wilayah ?? []).filter((w) => isKabupatenKotaName(w.nama))
  const data = profil?.data ? { ...profil.data, wilayah } : null
  const kabCount = kabkota.length || wilayah.length || 0
  const stats =
    kabCount > 0
      ? [
          { label: 'Kabupaten/Kota', value: String(kabCount) },
          { label: 'Profil Wilayah Aktif', value: String(wilayah.length || kabCount) },
          {
            label: 'Referensi Luas',
            value: '3,25 juta ha',
          },
        ]
      : undefined

  return <ProfilJatengContent data={data} stats={stats} />
}
