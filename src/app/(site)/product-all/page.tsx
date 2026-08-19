import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { QuerySearchBox } from '@/components/ui/QuerySearchBox'
import { QueryPagination } from '@/components/ui/QueryPagination'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchProdukList } from '@/lib/api'

export const metadata: Metadata = createPageMetadata(
  'Produk Kemitraan',
  'Temukan produk UMKM dan kemitraan bisnis dari Jawa Tengah',
)

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function ProductAllPage({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params.q?.trim() || undefined
  const page = Math.max(1, Number(params.page) || 1)

  const { data: products, meta } = await fetchProdukList({ q, page, perPage: 24 })

  const total = meta?.total ?? products.length
  const lastPage = meta?.last_page ?? 1
  const currentPage = meta?.current_page ?? page

  return (
    <>
      <PageHero
        label="Kemitraan"
        title="Produk Kemitraan"
        description="Katalog produk UMKM dan peluang kemitraan bisnis dari seluruh Jawa Tengah"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Kemitraan' }]}
      />

      <section className="px-6 py-12">
        <Container>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <Suspense fallback={null}>
                <QuerySearchBox
                  pathname="/product-all"
                  placeholder="Cari produk..."
                  initialQuery={q ?? ''}
                />
              </Suspense>
            </div>
          </div>

          <p className="mb-6 text-sm text-neutral-500">
            Menampilkan {products.length} dari {total} hasil
          </p>

          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-16 text-center">
              <p className="font-medium text-brand-900">
                {q ? 'Produk tidak ditemukan' : 'Belum ada produk kemitraan'}
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                {q
                  ? 'Coba kata kunci lain atau kosongkan pencarian.'
                  : 'Data produk akan muncul setelah UMKM mendaftarkan produk di portal perusahaan.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm"
                >
                  <div className="relative h-36 bg-brand-50">
                    <SafeImage
                      src={product.thumbnail}
                      alt={product.judul}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-xs text-neutral-500">{product.seller}</p>
                    <h4 className="mb-2 font-semibold text-brand-900">{product.judul}</h4>
                    <p className="line-clamp-2 text-sm text-neutral-600">{product.description}</p>
                  </div>
                  <div className="border-t border-brand-50 p-3 text-center">
                    <Link
                      href={`/product-all/${product.slug}`}
                      className="text-sm font-medium text-brand-500"
                    >
                      Lihat Detail →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {lastPage > 1 ? (
            <Suspense fallback={null}>
              <QueryPagination pathname="/product-all" currentPage={currentPage} totalPages={lastPage} />
            </Suspense>
          ) : null}
        </Container>
      </section>
    </>
  )
}
