import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { KawasanGrid } from '@/components/kawasan/KawasanGrid'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchKawasanList } from '@/lib/api'

const KEK_HERO_IMAGE =
  'https://cjip.jatengprov.go.id/storage/slider/Abu%20Muslih%20Assulkhani/2026/01KH8E28EF5CPKRSNDZAY5YYXZ.jpg'

export const metadata: Metadata = createPageMetadata(
  'Kawasan Industri',
  'Temukan kawasan industri strategis di Jawa Tengah — KEK, BUMN, dan swasta',
)

export default async function KawasanIndustriPage() {
  const { data } = await fetchKawasanList({ perPage: 50 })
  const kawasan = data

  return (
    <>
      <PageHero
        label="Infrastruktur Investasi"
        title="Kawasan Industri"
        description="Kawasan industri strategis di Jawa Tengah siap mendukung pertumbuhan bisnis Anda"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Kawasan Industri' }]}
      />

      <section className="px-6 py-10">
        <Container>
          <div className="mb-10 grid items-center gap-8 overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <span className="mb-3 inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                Kawasan Ekonomi Khusus
              </span>
              <h2 className="mb-2 text-xl font-bold text-brand-900 md:text-2xl">
                2 KEK Strategis di Jawa Tengah
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-neutral-600">
                Jawa Tengah memiliki dua Kawasan Ekonomi Khusus yang menawarkan fasilitas fiskal dan
                kemudahan berusaha bagi investor.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/kawasan-industri/kek-kendal"
                  className="rounded-xl border border-brand-100 bg-white p-4 transition duration-300 hover:border-brand-500"
                >
                  <p className="font-bold text-brand-900">KEK Kendal</p>
                  <p className="mt-1 text-xs text-neutral-500">Kawasan industri modern</p>
                </Link>
                <Link
                  href="/kawasan-industri/grand-batang-city"
                  className="rounded-xl border border-brand-100 bg-white p-4 transition duration-300 hover:border-brand-500"
                >
                  <p className="font-bold text-brand-900">KEK Batang</p>
                  <p className="mt-1 text-xs text-neutral-500">Industropolis Batang</p>
                </Link>
              </div>
            </div>
            <div className="relative min-h-[200px] md:min-h-[260px]">
              <SafeImage
                src={KEK_HERO_IMAGE}
                alt="Kawasan Ekonomi Khusus Jawa Tengah"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <KawasanGrid kawasan={kawasan} />
        </Container>
      </section>
    </>
  )
}
