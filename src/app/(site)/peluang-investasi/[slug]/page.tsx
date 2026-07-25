import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchProyekBySlug } from '@/lib/api'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const proyek = await fetchProyekBySlug(slug)
  if (!proyek) {
    return createPageMetadata('Peluang Investasi', 'Detail proyek investasi Jawa Tengah')
  }
  return createPageMetadata(proyek.judul, proyek.excerpt ?? `Detail ${proyek.judul}`)
}

export default async function ProyekDetailPage({ params }: PageProps) {
  const { slug } = await params
  const proyek = await fetchProyekBySlug(slug)

  if (!proyek) notFound()

  const detail = 'detail' in proyek ? proyek.detail : null

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
              <Link href="/peluang-investasi" className="hover:text-brand-500">
                Peluang Investasi
              </Link>
              <span aria-hidden="true">›</span>
              <span className="line-clamp-1 text-brand-900">{proyek.judul}</span>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                {proyek.sektor}
              </span>
              {proyek.wilayah ? (
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                  {proyek.wilayah}
                </span>
              ) : null}
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                {proyek.nilai}
              </span>
            </div>
            <h1 className="max-w-4xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight text-brand-900">
              {proyek.judul}
            </h1>
          </Container>
        </div>

        <Container>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <div className="relative aspect-[16/9] w-full">
              <SafeImage
                src={proyek.thumbnail}
                alt={proyek.judul}
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
          <div className="mx-auto max-w-3xl space-y-8">
            {proyek.excerpt ? (
              <div
                className="text-[0.95rem] leading-relaxed text-neutral-600 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: proyek.excerpt }}
              />
            ) : null}

            {detail && typeof detail === 'object' ? (
              <div className="space-y-6 text-[0.95rem] leading-relaxed text-neutral-600">
                {detail.latarBelakang ? (
                  <section>
                    <h2 className="mb-2 text-lg font-bold text-brand-900">Latar Belakang</h2>
                    <div
                      className="[&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: detail.latarBelakang }}
                    />
                  </section>
                ) : null}
                {detail.lingkupPekerjaan ? (
                  <section>
                    <h2 className="mb-2 text-lg font-bold text-brand-900">Lingkup Pekerjaan</h2>
                    <div
                      className="[&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: detail.lingkupPekerjaan }}
                    />
                  </section>
                ) : null}
                {detail.eksisting ? (
                  <section>
                    <h2 className="mb-2 text-lg font-bold text-brand-900">Kondisi Eksisting</h2>
                    <div
                      className="[&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: String(detail.eksisting) }}
                    />
                  </section>
                ) : null}
                {detail.skemaInvestasi ? (
                  <section>
                    <h2 className="mb-2 text-lg font-bold text-brand-900">Skema Investasi</h2>
                    <div
                      className="[&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: String(detail.skemaInvestasi) }}
                    />
                  </section>
                ) : null}
              </div>
            ) : null}

            {'foto' in proyek && proyek.foto && proyek.foto.length > 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {proyek.foto.slice(1).map((src, i) => (
                  <div key={src} className="relative aspect-video overflow-hidden rounded-xl">
                    <SafeImage
                      src={src}
                      alt={`${proyek.judul} ${i + 2}`}
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
                href="/peluang-investasi"
                className="inline-block text-sm font-semibold text-brand-500 hover:text-brand-600"
              >
                ← Kembali ke Peluang Investasi
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
