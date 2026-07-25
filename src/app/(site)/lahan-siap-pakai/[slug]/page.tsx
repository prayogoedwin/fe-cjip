import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LahanDetailContent } from '@/components/lahan/LahanDetailContent'
import { fetchLahanBySlug, fetchAllLahanSlugs } from '@/lib/api'
import { createPageMetadata } from '@/lib/page-metadata'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const apiSlugs = await fetchAllLahanSlugs()
  return apiSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lahan = await fetchLahanBySlug(slug)
  if (!lahan) {
    return createPageMetadata('Lahan Siap Pakai', 'Detail lahan investasi Jawa Tengah')
  }
  return createPageMetadata(
    `${lahan.nama} - Investasi Lahan ${lahan.wilayah}`,
    lahan.deskripsi.slice(0, 160),
  )
}

export default async function LahanDetailPage({ params }: PageProps) {
  const { slug } = await params
  const lahan = await fetchLahanBySlug(slug)
  if (!lahan) notFound()

  return <LahanDetailContent lahan={lahan} />
}
