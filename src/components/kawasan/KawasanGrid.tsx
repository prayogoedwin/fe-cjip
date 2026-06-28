'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import type { KawasanIndustri } from '@/types'

const filters = ['Semua', 'KEK', 'BUMN', 'Swasta']

interface KawasanGridProps {
  kawasan: KawasanIndustri[]
}

export function KawasanGrid({ kawasan }: KawasanGridProps) {
  const [activeFilter, setActiveFilter] = useState('Semua')

  const filtered =
    activeFilter === 'Semua'
      ? kawasan
      : kawasan.filter((k) => k.badge === activeFilter)

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
              activeFilter === filter
                ? 'bg-brand-500 text-white'
                : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm md:flex"
          >
            <div className="relative h-48 w-full shrink-0 md:h-auto md:w-72">
              <Image src={item.thumbnail} alt={item.nama} fill className="object-cover" sizes="288px" />
              {item.badge && (
                <span className="absolute top-3 left-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-bold text-brand-900">{item.nama}</h3>
              <div className="mb-3 flex flex-wrap gap-3 text-xs text-neutral-500">
                <span>📍 {item.lokasi}</span>
                <span>📐 {item.luas}</span>
                {item.kepemilikan && <span>🏢 {item.kepemilikan}</span>}
              </div>
              <p className="mb-4 flex-1 text-sm text-neutral-600">{item.deskripsi}</p>
              <div className="flex items-center justify-between border-t border-brand-50 pt-3">
                <span className="text-xs text-neutral-500">Kawasan Industri</span>
                <Link href="#" className="text-sm font-medium text-brand-500">
                  Lihat Detail →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination totalPages={5} />
    </>
  )
}
