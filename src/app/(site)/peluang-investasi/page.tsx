import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { ProyekListing } from '@/components/ui/ProyekListing'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { createPageMetadata } from '@/lib/page-metadata'
import { mockPeluang } from '@/lib/mock-data'

export const metadata: Metadata = createPageMetadata(
  'Kesiapan Proyek',
  'Temukan proyek investasi siap ditawarkan di Jawa Tengah berdasarkan tingkat kesiapan',
)

export default function PeluangInvestasiPage() {
  return (
    <>
      <PageHero
        label="Proyek Investasi"
        title="Kesiapan Proyek"
        description="Daftar proyek investasi Jawa Tengah berdasarkan tingkat kesiapan dan potensi"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kesiapan Proyek' },
        ]}
      />

      <section className="px-6 py-12">
        <Container>
          <ProyekListing proyek={mockPeluang} />
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
