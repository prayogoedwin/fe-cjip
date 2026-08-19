import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchDokumenBySlug } from '@/lib/api'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const res = await fetchDokumenBySlug(slug)
  if (!res?.data) {
    return createPageMetadata('Dokumen PDF', 'Publikasi investasi Jawa Tengah')
  }
  return createPageMetadata(res.data.title, res.data.excerpt ?? '')
}

export default async function DokumenPdfPage({ params }: PageProps) {
  const { slug } = await params
  const res = await fetchDokumenBySlug(slug)
  const item = res?.data

  if (!item?.has_pdf || !item.file_pdf) notFound()

  return (
    <div className="mt-[68px] min-h-screen bg-brand-50 pb-10">
      <Container className="py-6">
        <div className="sticky top-[68px] z-20 mb-6 rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Link
                href="/dokumen"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-100 text-neutral-500 transition hover:bg-brand-50 hover:text-brand-600"
                aria-label="Kembali ke daftar dokumen"
              >
                ←
              </Link>
              <div>
                <h1 className="line-clamp-2 text-lg font-bold text-brand-900 sm:text-xl">{item.title}</h1>
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                  <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-700">PDF</span>
                  {item.published_at ? <span>{item.published_at}</span> : null}
                </div>
              </div>
            </div>
            <a
              href={item.file_pdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-brand-600"
            >
              Download
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lg">
          <iframe
            src={item.file_pdf}
            title={item.title}
            className="h-[80vh] w-full"
          />
        </div>

        {item.description ? (
          <div className="mt-8 rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-brand-900 uppercase">Deskripsi</h2>
            <SafeHtml
              html={item.description}
              className="prose prose-neutral prose-sm max-w-none text-neutral-600"
            />
          </div>
        ) : null}
      </Container>
    </div>
  )
}
