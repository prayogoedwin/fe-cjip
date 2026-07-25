'use client'

import { useMemo, useState } from 'react'
import { ProyekCard } from '@/components/ui/ProyekCard'
import { SearchBox } from '@/components/ui/SearchBox'
import { Pagination } from '@/components/ui/Pagination'
import type { PeluangInvestasi, Sektor } from '@/types'

const statusTabs = [
  { id: 'all', label: 'Semua', icon: '📋' },
  { id: 'siap', label: 'Ditawarkan', icon: '✅' },
  { id: 'strategis', label: 'Strategis', icon: '⭐' },
  { id: 'prospektif', label: 'Prospektif', icon: '🔭' },
  { id: 'potensial', label: 'Potensial', icon: '💡' },
] as const

const PER_PAGE = 9

interface ProyekListingProps {
  proyek: PeluangInvestasi[]
  variant?: 'default' | 'sektor'
  sektorFilter?: string
  hideFilters?: boolean
  sektorOptions?: Sektor[]
  kabkotaOptions?: Array<{ id: number; nama: string }>
}

export function ProyekListing({
  proyek,
  variant = 'default',
  sektorFilter,
  hideFilters = false,
  sektorOptions = [],
  kabkotaOptions = [],
}: ProyekListingProps) {
  const [status, setStatus] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sektor, setSektor] = useState('')
  const [wilayah, setWilayah] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const activeSektor = sektorFilter || sektor

    return proyek.filter((p) => {
      const matchStatus = status === 'all' || p.status === status
      const matchSektor =
        !activeSektor ||
        p.sektor === activeSektor ||
        p.sektor.toLowerCase() === activeSektor.toLowerCase()
      const matchWilayah = !wilayah || p.wilayah === wilayah
      const matchSearch =
        !query ||
        p.judul.toLowerCase().includes(query) ||
        (p.wilayah?.toLowerCase().includes(query) ?? false) ||
        (p.excerpt?.toLowerCase().includes(query) ?? false) ||
        p.sektor.toLowerCase().includes(query)

      return matchStatus && matchSektor && matchWilayah && matchSearch
    })
  }, [proyek, status, sektorFilter, sektor, wilayah, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  function applySearch() {
    setSearchQuery(search)
    setPage(1)
  }

  return (
    <>
      {!hideFilters && (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setStatus(tab.id)
                  setPage(1)
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition duration-300 ${
                  status === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
                }`}
              >
                <span aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <SearchBox
                placeholder="Cari proyek..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={applySearch}
              />
            </div>
            <select
              value={sektor}
              onChange={(e) => {
                setSektor(e.target.value)
                setPage(1)
              }}
              className="rounded-lg border border-brand-100 bg-white px-4 py-2.5 text-sm"
            >
              <option value="">Semua Sektor</option>
              {sektorOptions.map((item) => (
                <option key={item.id} value={item.nama}>
                  {item.nama}
                  {item.total ? ` (${item.total})` : ''}
                </option>
              ))}
            </select>
            <select
              value={wilayah}
              onChange={(e) => {
                setWilayah(e.target.value)
                setPage(1)
              }}
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
        </>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-neutral-500">
          <p className="font-medium">Proyek tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paged.map((item) => (
            <ProyekCard key={item.id} proyek={item} variant={variant} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          resultText={`Menampilkan ${paged.length} dari ${filtered.length} proyek`}
        />
      )}
    </>
  )
}
