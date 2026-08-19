import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { KawasanShareBar } from '@/components/kawasan/KawasanShareBar'
import { ProyekDetailTabs } from '@/components/proyek/ProyekDetailTabs'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchProyekBySlug, PROYEK_STATUS_CLASS, PROYEK_STATUS_LABEL } from '@/lib/api'

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

  const detail = proyek.detail
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cjip.jatengprov.go.id'
  const shareUrl = `${siteUrl}/peluang-investasi/${proyek.slug}`
  const latarBelakang = detail.latarBelakang || proyek.excerpt

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-b from-brand-50 to-white pb-10">
        <div className="px-6 pt-10 pb-6 text-center md:pt-14">
          <Container>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-[0.8rem] text-neutral-500">
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
            <h1 className="mx-auto max-w-4xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight text-brand-900">
              {proyek.judul}
            </h1>
            <p className={`mt-3 text-sm font-bold ${PROYEK_STATUS_CLASS[proyek.status]}`}>
              {PROYEK_STATUS_LABEL[proyek.status]}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {proyek.sektor ? (
                <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                  {proyek.sektor}
                </span>
              ) : null}
              {proyek.wilayah ? (
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                  {proyek.wilayah}
                </span>
              ) : null}
              {proyek.nilai ? (
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                  {proyek.nilai}
                </span>
              ) : null}
            </div>
          </Container>
        </div>

        <Container>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border-4 border-white shadow-lg md:rounded-3xl md:border-8">
            <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
              <SafeImage
                src={proyek.thumbnail}
                alt={proyek.judul}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </Container>
      </div>

      <section className="px-6 pb-16">
        <Container>
          <div className="mx-auto max-w-5xl space-y-8">
            {latarBelakang ? (
              <section>
                <h2 className="mb-3 text-lg font-bold text-brand-900">Latar Belakang</h2>
                <SafeHtml
                  html={latarBelakang}
                  className="text-[0.95rem] leading-relaxed text-neutral-600 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
                />
              </section>
            ) : null}

            <ProyekDetailTabs
              judul={proyek.judul}
              wilayah={proyek.wilayah}
              nilai={proyek.nilai}
              thumbnail={proyek.thumbnail}
              foto={proyek.foto}
              fileKajian={proyek.fileKajian}
              urlVideo={proyek.urlVideo}
              lat={proyek.lat}
              lng={proyek.lng}
              detail={detail}
            />

            <KawasanShareBar nama={proyek.judul} url={shareUrl} />

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
