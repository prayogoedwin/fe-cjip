import type { Metadata } from 'next'
import { LahanContent } from '@/components/lahan/LahanContent'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchLahanList } from '@/lib/api'

export const metadata: Metadata = createPageMetadata(
  'Lahan Siap Pakai',
  'Basis data lahan siap pakai untuk investasi di Provinsi Jawa Tengah',
)

export default async function LahanSiapPakaiPage() {
  const { data } = await fetchLahanList({ perPage: 50 })

  return <LahanContent initialData={data} />
}
