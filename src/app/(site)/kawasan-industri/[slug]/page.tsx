import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { KawasanDetailTabs } from '@/components/kawasan/KawasanDetailTabs'
import { KawasanShareBar } from '@/components/kawasan/KawasanShareBar'
import { fetchKawasanBySlug, fetchAllKawasanSlugs } from '@/lib/api'
import { createPageMetadata } from '@/lib/page-metadata'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const apiSlugs = await fetchAllKawasanSlugs()
  return apiSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const kawasan = await fetchKawasanBySlug(slug)
  if (!kawasan) {
    return createPageMetadata('Kawasan Industri', 'Detail kawasan industri Jawa Tengah')
  }
  return createPageMetadata(
    kawasan.nama,
    kawasan.deskripsi ?? `Detail ${kawasan.nama} — Central Java Investment Platform`,
  )
}

function ProfileSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
      <div className="p-6 md:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-wide text-brand-900 uppercase">{title}</h2>
        </div>
        <div className="text-[0.95rem] leading-relaxed text-neutral-600">{children}</div>
      </div>
    </section>
  )
}

export default async function KawasanDetailPage({ params }: PageProps) {
  const { slug } = await params
  const kawasan = await fetchKawasanBySlug(slug)
  if (!kawasan) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cjip.jatengprov.go.id'
  const shareUrl = `${siteUrl}/kawasan-industri/${kawasan.slug}`

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-b from-brand-50 to-white pb-10">
        <div className="px-6 pt-10 pb-6 text-center md:pt-14">
          <Container>
            <div className="mb-4 flex items-center justify-center gap-2 text-[0.8rem] text-neutral-500">
              <Link href="/" className="transition duration-300 hover:text-brand-500">
                Beranda
              </Link>
              <span aria-hidden="true">›</span>
              <Link href="/kawasan-industri" className="transition duration-300 hover:text-brand-500">
                Kawasan Industri
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-brand-900">{kawasan.nama}</span>
            </div>
            <h1 className="mx-auto max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight text-brand-900">
              {kawasan.nama}
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-brand-500" aria-hidden="true" />
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {kawasan.badge ? (
                <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                  {kawasan.badge}
                </span>
              ) : null}
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                {kawasan.lokasi}
              </span>
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                {kawasan.luas}
              </span>
              {kawasan.kepemilikan ? (
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                  {kawasan.kepemilikan}
                </span>
              ) : null}
            </div>
          </Container>
        </div>

        <Container>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border-4 border-white shadow-lg md:rounded-3xl md:border-8">
            <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
              <SafeImage
                src={kawasan.thumbnail}
                alt={kawasan.nama}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </Container>
      </div>

      <section className="bg-brand-50/40 px-6 pb-16">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6">
            <ProfileSection title="Profil Kawasan Industri">
              <div
                className="[&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_strong]:text-brand-900"
                dangerouslySetInnerHTML={{
                  __html:
                    kawasan.profilKawasan ??
                    kawasan.deskripsi ??
                    'Informasi profil kawasan belum tersedia.',
                }}
              />
            </ProfileSection>

            <ProfileSection title="Profil Perusahaan">
              <div
                className="[&_p]:mb-3 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_strong]:text-brand-900"
                dangerouslySetInnerHTML={{
                  __html: kawasan.profilPerusahaan ?? 'Informasi profil perusahaan belum tersedia.',
                }}
              />
            </ProfileSection>

            <KawasanDetailTabs kawasan={kawasan} />

            <KawasanShareBar nama={kawasan.nama} url={shareUrl} />

            <div className="pt-2 text-center">
              <Link
                href="/kawasan-industri"
                className="inline-block text-sm font-semibold text-brand-500 transition duration-300 hover:text-brand-600"
              >
                ← Kembali ke Kawasan Industri
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
