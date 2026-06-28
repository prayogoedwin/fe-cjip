import type { Metadata } from 'next'
import { HeroSlider } from '@/components/home/HeroSlider'
import { WhyInvestSection } from '@/components/home/WhyInvestSection'
import { InfraSection } from '@/components/home/InfraSection'
import { EconomyCharts } from '@/components/home/EconomyCharts'
import { DataUmkSection } from '@/components/home/DataUmkSection'
import { KawasanPreview, BeritaPreview } from '@/components/home/KawasanBeritaPreview'
import { PartnersSection } from '@/components/home/PartnersSection'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Central Java Investment Platform',
  'Digitizing the promotion of investment opportunities in Central Java',
)

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <WhyInvestSection />
      <InfraSection />
      <EconomyCharts />
      <DataUmkSection />
      <KawasanPreview />
      <BeritaPreview />
      <PartnersSection />
      <CtaBanner />
    </>
  )
}
