import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchProdukBySlug } from '@/lib/api'
import { mockProducts } from '@/lib/mock-data'
import { DEFAULT_IMAGE } from '@/lib/images'

interface PageProps {
  params: Promise<{ slug: string }>
}

function slugFromTitle(judul: string, id: number) {
  return (
    judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || String(id)
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const produk =
    (await fetchProdukBySlug(slug)) ??
    mockProducts
      .map((p) => ({ ...p, slug: slugFromTitle(p.judul, p.id) }))
      .find((p) => p.slug === slug)

  if (!produk) {
    return createPageMetadata('Produk Kemitraan', 'Detail produk UMKM Jawa Tengah')
  }
  return createPageMetadata(produk.judul, produk.description ?? produk.judul)
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const apiProduk = await fetchProdukBySlug(slug)
  const mock = mockProducts
    .map((p) => ({
      ...p,
      slug: slugFromTitle(p.judul, p.id),
      thumbnail: DEFAULT_IMAGE,
      gallery: [] as string[],
    }))
    .find((p) => p.slug === slug)
  const produk = apiProduk ?? mock

  if (!produk) notFound()

  const gallery =
    'gallery' in produk && produk.gallery?.length
      ? produk.gallery
      : [produk.thumbnail || DEFAULT_IMAGE]

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-b from-brand-50 to-white pb-10">
        <div className="px-6 pt-10 pb-6 md:pt-14">
          <Container>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[0.8rem] text-neutral-500">
              <Link href="/" className="hover:text-brand-500">
                Beranda
              </Link>
              <span aria-hidden="true">›</span>
              <Link href="/product-all" className="hover:text-brand-500">
                Produk Kemitraan
              </Link>
              <span aria-hidden="true">›</span>
              <span className="line-clamp-1 text-brand-900">{produk.judul}</span>
            </div>
            {produk.seller ? (
              <p className="mb-2 text-sm font-semibold text-brand-500">{produk.seller}</p>
            ) : null}
            <h1 className="max-w-3xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight text-brand-900">
              {produk.judul}
            </h1>
          </Container>
        </div>

        <Container>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <div className="relative aspect-[4/3] w-full">
              <SafeImage
                src={gallery[0]}
                alt={produk.judul}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        </Container>
      </div>

      <section className="px-6 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
            {produk.description ? (
              <p className="text-[0.95rem] leading-relaxed text-neutral-600">{produk.description}</p>
            ) : null}

            {gallery.length > 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.slice(1).map((src, i) => (
                  <div key={src} className="relative aspect-video overflow-hidden rounded-xl">
                    <SafeImage
                      src={src}
                      alt={`${produk.judul} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="text-center">
              <Link
                href="/product-all"
                className="inline-block text-sm font-semibold text-brand-500 hover:text-brand-600"
              >
                ← Kembali ke Produk Kemitraan
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
