import type { Metadata } from 'next'
import { HeroSlider } from '@/components/home/HeroSlider'
import { WhyInvestSection } from '@/components/home/WhyInvestSection'
import { InfraSection } from '@/components/home/InfraSection'
import { LazyEconomyCharts } from '@/components/home/LazyEconomyCharts'
import { DataUmkSection } from '@/components/home/DataUmkSection'
import { KawasanPreview, BeritaPreview } from '@/components/home/KawasanBeritaPreview'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchBeranda } from '@/lib/api'
import { resolveImageUrl, DEFAULT_IMAGE } from '@/lib/images'
import type { HeroSlide } from '@/lib/home-data'

export const metadata: Metadata = createPageMetadata(
  'Central Java Investment Platform',
  'Digitizing the promotion of investment opportunities in Central Java',
)

export default async function HomePage() {
  const berandaRes = await fetchBeranda()
  const beranda = berandaRes?.data

  const slides: HeroSlide[] | undefined = beranda?.sliders?.length
    ? beranda.sliders.map((s) => ({
        image: resolveImageUrl(s.foto),
        fallback: DEFAULT_IMAGE,
        title: s.title,
        description: s.desc,
      }))
    : undefined

  return (
    <>
      <HeroSlider slides={slides} />
      <WhyInvestSection opening={beranda?.pembuka?.opening} />
      <InfraSection items={beranda?.pembuka?.infrastrukturs} />
      <LazyEconomyCharts grafik={beranda?.grafik} />
      <DataUmkSection umkSection={beranda?.grafik?.umk_section} />
      <KawasanPreview items={beranda?.kawasan} />
      <BeritaPreview items={beranda?.berita} />
    </>
  )
}
