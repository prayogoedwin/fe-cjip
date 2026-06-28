import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { KawasanGrid } from '@/components/kawasan/KawasanGrid'
import { createPageMetadata } from '@/lib/page-metadata'
import { mockKawasan } from '@/lib/mock-data'

export const metadata: Metadata = createPageMetadata(
  'Kawasan Industri',
  'Temukan kawasan industri strategis di Jawa Tengah — KEK, BUMN, dan swasta',
)

export default function KawasanIndustriPage() {
  return (
    <>
      <PageHero
        label="Investasi"
        title="Kawasan Industri"
        description="Kawasan industri strategis di Jawa Tengah dengan infrastruktur lengkap dan lokasi premium"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Kawasan Industri' }]}
      />

      <div className="bg-brand-500 px-6 py-8 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                KEK Unggulan
              </span>
              <h2 className="text-xl font-bold">Kawasan Ekonomi Khusus Jawa Tengah</h2>
              <p className="mt-1 text-sm text-white/80">
                KEK Kendal dan KEK Industropolis Batang — pusat industri terintegrasi
              </p>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-white/70">KEK Aktif</p>
              </div>
              <div>
                <p className="text-2xl font-bold">6.500+</p>
                <p className="text-xs text-white/70">Ha Total Luas</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <section className="px-6 py-12">
        <Container>
          <KawasanGrid kawasan={mockKawasan} />
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
