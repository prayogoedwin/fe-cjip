import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchDokumenBySlug } from '@/lib/api'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const res = await fetchDokumenBySlug(slug)
  if (!res?.data) {
    return createPageMetadata('Dokumen Video', 'Publikasi investasi Jawa Tengah')
  }
  return createPageMetadata(res.data.title, res.data.excerpt ?? undefined)
}

export default async function DokumenVideoPage({ params }: PageProps) {
  const { slug } = await params
  const res = await fetchDokumenBySlug(slug)
  const item = res?.data

  if (!item?.has_video || !item.file_video) notFound()

  return (
    <div className="mt-[68px] min-h-screen bg-brand-50 pb-10">
      <Container className="py-6">
        <div className="mb-6 rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
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
                <span className="rounded bg-green-100 px-1.5 py-0.5 font-medium text-green-700">Video</span>
                {item.published_at ? <span>{item.published_at}</span> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-black shadow-lg">
          <video controls className="aspect-video w-full" preload="metadata">
            <source src={item.file_video} type="video/mp4" />
            Browser Anda tidak mendukung pemutaran video.
          </video>
        </div>

        {item.description ? (
          <div className="mt-8 rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-brand-900 uppercase">Deskripsi</h2>
            <div
              className="prose prose-neutral prose-sm max-w-none text-neutral-600"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ) : null}
      </Container>
    </div>
  )
}
