'use client'

import { useMemo, useState } from 'react'
import { ProyekCard } from '@/components/ui/ProyekCard'
import { SearchBox } from '@/components/ui/SearchBox'
import { Pagination } from '@/components/ui/Pagination'
import type { PeluangInvestasi } from '@/types'

const statusTabs = [
  { id: 'all', label: 'Semua', icon: '📋' },
  { id: 'siap', label: 'Ditawarkan', icon: '✅' },
  { id: 'strategis', label: 'Strategis', icon: '⭐' },
  { id: 'prospektif', label: 'Prospektif', icon: '🔭' },
  { id: 'potensial', label: 'Potensial', icon: '💡' },
] as const

interface ProyekListingProps {
  proyek: PeluangInvestasi[]
  variant?: 'default' | 'sektor'
  sektorFilter?: string
}

export function ProyekListing({ proyek, variant = 'default', sektorFilter }: ProyekListingProps) {
  const [status, setStatus] = useState<string>('all')

  const filtered = useMemo(() => {
    return proyek.filter((p) => {
      const matchStatus = status === 'all' || p.status === status
      const matchSektor = !sektorFilter || p.sektor === sektorFilter
      const matchSearch = true
      return matchStatus && matchSektor && matchSearch
    })
  }, [proyek, status, sektorFilter])

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatus(tab.id)}
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
          <SearchBox placeholder="Cari proyek..." />
        </div>
        <select className="rounded-lg border border-brand-100 px-4 py-2.5 text-sm">
          <option>Semua Sektor</option>
          <option>Manufaktur</option>
          <option>Pariwisata</option>
          <option>Energi</option>
        </select>
        <select className="rounded-lg border border-brand-100 px-4 py-2.5 text-sm">
          <option>Semua Wilayah</option>
          <option>Kota Semarang</option>
          <option>Kabupaten Kendal</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-neutral-500">
        Menampilkan {filtered.length} proyek
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProyekCard key={item.id} proyek={item} variant={variant} />
        ))}
      </div>

      <Pagination totalPages={8} resultText={`Menampilkan ${filtered.length} dari ${proyek.length} proyek`} />
    </>
  )
}
