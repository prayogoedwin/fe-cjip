import type { Metadata } from 'next'
import { SektorContent } from '@/components/sektor/SektorContent'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchKabKota, fetchProyekList, fetchSektorList } from '@/lib/api'

export const metadata: Metadata = createPageMetadata(
  'Sektor',
  'Jelajahi peluang investasi berdasarkan sektor unggulan Jawa Tengah',
)

export default async function SektorPage() {
  const [{ data: proyek }, sektor, kabkota] = await Promise.all([
    fetchProyekList({ perPage: 100 }),
    fetchSektorList(),
    fetchKabKota(),
  ])

  return (
    <SektorContent
      initialProyek={proyek}
      sektorList={sektor}
      kabkotaOptions={kabkota}
    />
  )
}
