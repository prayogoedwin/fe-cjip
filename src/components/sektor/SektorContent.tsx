'use client'
import { useMemo, useState } from 'react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { ProyekListing } from '@/components/ui/ProyekListing'
import { SearchBox } from '@/components/ui/SearchBox'
import type { PeluangInvestasi, Sektor } from '@/types'

interface SektorContentProps {
  initialProyek?: PeluangInvestasi[]
  sektorList?: Sektor[]
  kabkotaOptions?: Array<{ id: number; nama: string }>
}

export function SektorContent({
  initialProyek = [],
  sektorList = [],
  kabkotaOptions = [],
}: SektorContentProps) {
  const [activeSektor, setActiveSektor] = useState('')
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [wilayah, setWilayah] = useState('')

  const filteredProyek = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return initialProyek.filter((p) => {
      const matchSektor =
        !activeSektor ||
        p.sektor === activeSektor ||
        p.sektor.toLowerCase() === activeSektor.toLowerCase()
      const matchWilayah = !wilayah || p.wilayah === wilayah
      const matchSearch =
        !query ||
        p.judul.toLowerCase().includes(query) ||
        (p.wilayah?.toLowerCase().includes(query) ?? false) ||
        (p.excerpt?.toLowerCase().includes(query) ?? false)

      return matchSektor && matchWilayah && matchSearch
    })
  }, [initialProyek, activeSektor, searchQuery, wilayah])

  return (
    <>
      <PageHero
        label="Proyek Investasi"
        title="Sektor"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Sektor' }]}
      />

      <section className="px-6 py-10 md:py-12">
        <Container>
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveSektor('')}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition duration-300 ${
                !activeSektor
                  ? 'bg-brand-500 text-white'
                  : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
              }`}
            >
              Semua
            </button>
            {sektorList.map((sektor) => (
              <button
                key={sektor.id}
                type="button"
                onClick={() => setActiveSektor(sektor.nama)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition duration-300 ${
                  activeSektor === sektor.nama
                    ? 'bg-brand-500 text-white'
                    : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
                }`}
              >
                {sektor.nama}
                {sektor.total ? ` (${sektor.total})` : ''}
              </button>
            ))}
          </div>

          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <SearchBox
                placeholder="Cari proyek..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={() => setSearchQuery(search)}
              />
            </div>
            <select
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="rounded-lg border border-brand-100 bg-white px-4 py-2.5 text-sm"
            >
              <option value="">Semua Wilayah</option>
              {kabkotaOptions.map((item) => (
                <option key={item.id} value={item.nama}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>

          <ProyekListing proyek={filteredProyek} variant="sektor" hideFilters />
        </Container>
      </section>
    </>
  )
}
