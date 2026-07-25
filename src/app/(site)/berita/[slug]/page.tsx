import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchBeritaBySlug } from '@/lib/api'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const berita = await fetchBeritaBySlug(slug)
  if (!berita) {
    return createPageMetadata('Berita', 'Detail berita investasi Jawa Tengah')
  }
  const title = berita.seo_title || berita.judul
  const description = berita.meta_description || berita.excerpt
  return createPageMetadata(title, description)
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params
  const berita = await fetchBeritaBySlug(slug)

  if (!berita) notFound()

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-b from-brand-50 to-white pb-10">
        <div className="px-6 pt-10 pb-6 md:pt-14">
          <Container>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[0.8rem] text-neutral-500">
              <Link href="/" className="transition duration-300 hover:text-brand-500">
                Beranda
              </Link>
              <span aria-hidden="true">›</span>
              <Link href="/berita" className="transition duration-300 hover:text-brand-500">
                Berita
              </Link>
              <span aria-hidden="true">›</span>
              <span className="line-clamp-1 text-brand-900">{berita.judul}</span>
            </div>
            <p className="mb-3 text-sm font-semibold text-brand-500">{berita.tanggal}</p>
            {berita.kategori ? (
              <span className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                {berita.kategori}
              </span>
            ) : null}
            <h1 className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight text-brand-900">
              {berita.judul}
            </h1>
          </Container>
        </div>

        <Container>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <div className="relative aspect-[16/9] w-full">
              <SafeImage
                src={berita.thumbnail}
                alt={berita.judul}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>
        </Container>
      </div>

      <section className="px-6 pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div
              className="prose prose-neutral max-w-none text-[0.95rem] leading-relaxed text-neutral-700"
              dangerouslySetInnerHTML={{
                __html: 'body' in berita && berita.body ? berita.body : berita.excerpt,
              }}
            />

            {'images' in berita && berita.images && berita.images.length > 1 ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {berita.images.slice(1).map((src, i) => (
                  <div key={src} className="relative aspect-video overflow-hidden rounded-xl">
                    <SafeImage
                      src={src}
                      alt={`${berita.judul} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-10 text-center">
              <Link
                href="/berita"
                className="inline-block text-sm font-semibold text-brand-500 transition duration-300 hover:text-brand-600"
              >
                ← Kembali ke Berita
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </>
  )
}
