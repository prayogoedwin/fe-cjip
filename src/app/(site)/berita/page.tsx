import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { QuerySearchBox } from '@/components/ui/QuerySearchBox'
import { QueryPagination } from '@/components/ui/QueryPagination'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchBeritaList, fetchBeritaTags } from '@/lib/api'

export const metadata: Metadata = createPageMetadata(
  'Berita',
  'Ikuti perkembangan terkini seputar investasi dan pembangunan Jawa Tengah',
)

interface PageProps {
  searchParams: Promise<{ q?: string; kategori?: string; page?: string }>
}

export default async function BeritaPage({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params.q?.trim() || undefined
  const kategori = params.kategori?.trim() || undefined
  const page = Math.max(1, Number(params.page) || 1)

  const [{ data: apiList, meta }, tags] = await Promise.all([
    fetchBeritaList({ q, kategori, page, perPage: 12 }),
    fetchBeritaTags(),
  ])

  const berita = apiList
  const isFiltered = Boolean(q || kategori)
  const featured = isFiltered ? null : berita[0]
  const list = isFiltered ? berita : berita.slice(1)
  const tagList = tags.map((t) => t.nama)
  const total = meta?.total ?? berita.length
  const lastPage = meta?.last_page ?? 1
  const currentPage = meta?.current_page ?? page

  return (
    <>
      <PageHero
        label="Informasi"
        title="Berita"
        description="Ikuti perkembangan terkini seputar investasi dan pembangunan Jawa Tengah"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Berita' }]}
      />

      <section className="px-6 py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <Suspense fallback={<div className="mb-8 h-11" />}>
                <QuerySearchBox
                  pathname="/berita"
                  placeholder="Cari berita..."
                  initialQuery={q ?? ''}
                  className="mb-8"
                />
              </Suspense>

              {featured ? (
                <article className="mb-8 overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm md:grid md:grid-cols-2">
                  <div className="relative h-56 md:h-auto">
                    <SafeImage
                      src={featured.thumbnail}
                      alt={featured.judul}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs text-neutral-500">{featured.tanggal}</p>
                    <h2 className="mb-3 text-xl font-bold text-brand-900">{featured.judul}</h2>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-600">{featured.excerpt}</p>
                    <Link
                      href={`/berita/${featured.slug}`}
                      className="text-sm font-medium text-brand-500"
                    >
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </article>
              ) : null}

              <div className="space-y-5">
                {list.length === 0 && !featured ? (
                  <p className="rounded-xl border border-dashed border-brand-200 bg-white px-6 py-16 text-center text-neutral-400">
                    {isFiltered ? 'Tidak ada berita yang cocok dengan pencarian.' : 'Data berita kosong'}
                  </p>
                ) : null}
                {list.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 overflow-hidden rounded-xl border border-brand-100 bg-white p-3 shadow-sm"
                  >
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                      <SafeImage
                        src={item.thumbnail}
                        alt={item.judul}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-neutral-500">{item.tanggal}</p>
                      <h4 className="mb-1 line-clamp-2 font-semibold text-brand-900">{item.judul}</h4>
                      <p className="mb-2 line-clamp-2 text-sm text-neutral-600">{item.excerpt}</p>
                      <Link
                        href={`/berita/${item.slug}`}
                        className="text-sm font-medium text-brand-500"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <Suspense fallback={null}>
                <QueryPagination
                  pathname="/berita"
                  currentPage={currentPage}
                  totalPages={lastPage}
                  resultText={`Menampilkan ${berita.length} dari ${total} hasil`}
                />
              </Suspense>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 font-semibold text-brand-900">Berita Populer</h3>
                <ul className="space-y-3">
                  {berita.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/berita/${item.slug}`}
                        className="text-sm text-neutral-700 transition duration-300 hover:text-brand-500"
                      >
                        {item.judul}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 font-semibold text-brand-900">Topik</h3>
                <div className="flex flex-wrap gap-2">
                  {tagList.map((tag) => (
                    <Link
                      key={tag}
                      href={`/berita?kategori=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700 transition duration-300 hover:bg-brand-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-brand-900 to-brand-500 p-5 text-white">
                <h3 className="mb-2 font-semibold">Butuh Bantuan?</h3>
                <p className="mb-4 text-sm text-white/80">
                  Hubungi tim DPMPTSP Jawa Tengah untuk konsultasi investasi.
                </p>
                <a
                  href="https://wa.me/628112949326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-900"
                >
                  Hubungi Kami
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
