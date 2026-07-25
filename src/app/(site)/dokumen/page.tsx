import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DokumenPageContent } from '@/components/dokumen/DokumenPageContent'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Publikasi & Dokumen',
  'Informasi, panduan, dan publikasi investasi Jawa Tengah',
)

export default function DokumenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  return (
    <Suspense fallback={<div className="mt-[68px] px-6 py-16 text-center text-neutral-500">Memuat dokumen…</div>}>
      <DokumenPageContent searchParams={searchParams} />
    </Suspense>
  )
}
