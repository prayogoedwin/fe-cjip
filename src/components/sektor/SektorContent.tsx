'use client'

import { useState } from 'react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { ProyekListing } from '@/components/ui/ProyekListing'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { mockPeluang, mockSektor } from '@/lib/mock-data'

export function SektorContent() {
  const [activeSektor, setActiveSektor] = useState(mockSektor[0].nama)

  return (
    <>
      <PageHero
        label="Proyek Investasi"
        title="Sektor"
        description="Jelajahi peluang investasi berdasarkan sektor unggulan Jawa Tengah"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Sektor' }]}
      />

      <section className="px-6 py-12">
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {mockSektor.map((sektor) => (
              <button
                key={sektor.id}
                type="button"
                onClick={() => setActiveSektor(sektor.nama)}
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition duration-300 ${
                  activeSektor === sektor.nama
                    ? 'bg-brand-500 text-white'
                    : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
                }`}
              >
                <span aria-hidden="true">{sektor.icon}</span>
                <span>{sektor.nama}</span>
                <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">{sektor.total}</span>
              </button>
            ))}
          </div>

          <ProyekListing proyek={mockPeluang} variant="sektor" sektorFilter={activeSektor} />
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
