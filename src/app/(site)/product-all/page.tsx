import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { SearchBox } from '@/components/ui/SearchBox'
import { Pagination } from '@/components/ui/Pagination'
import { createPageMetadata } from '@/lib/page-metadata'
import { mockProducts } from '@/lib/mock-data'

export const metadata: Metadata = createPageMetadata(
  'Produk Kemitraan',
  'Temukan produk UMKM dan kemitraan bisnis dari Jawa Tengah',
)

export default function ProductAllPage() {
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
              <SearchBox placeholder="Cari produk..." />
            </div>
            <select className="rounded-lg border border-brand-100 px-4 py-2.5 text-sm">
              <option>12 per halaman</option>
              <option>24 per halaman</option>
              <option>48 per halaman</option>
            </select>
          </div>

          <p className="mb-6 text-sm text-neutral-500">Menampilkan 1–12 dari 73 hasil</p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm"
              >
                <div className="flex h-36 items-center justify-center bg-brand-50 text-4xl">
                  📦
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs text-neutral-500">{product.seller}</p>
                  <h4 className="mb-2 font-semibold text-brand-900">{product.judul}</h4>
                  <p className="line-clamp-2 text-sm text-neutral-600">{product.description}</p>
                </div>
                <div className="border-t border-brand-50 p-3 text-center">
                  <Link href="#" className="text-sm font-medium text-brand-500">
                    Lihat Detail →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <Pagination totalPages={7} resultText="Showing 1 to 12 of 73 results" />
        </Container>
      </section>
    </>
  )
}
