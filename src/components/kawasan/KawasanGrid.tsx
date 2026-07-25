'use client'

import Link from 'next/link'
import { SafeImage } from '@/components/ui/SafeImage'
import { useMemo, useState } from 'react'
import { Pagination } from '@/components/ui/Pagination'
import type { KawasanIndustri } from '@/types'

const TYPE_FILTERS = ['Semua', 'KEK', 'BUMN', 'Swasta'] as const
const PER_PAGE = 9

function shortLokasi(lokasi: string | null | undefined): string {
  if (!lokasi?.trim()) return ''
  const match = lokasi.match(/(Kabupaten|Kota)\s+[^,]+/i)
  if (match) return match[0].trim()
  const parts = lokasi
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => !/^indonesia$/i.test(p) && !/^jawa tengah$/i.test(p))
  if (parts.length >= 2) return parts.slice(-2).join(', ')
  if (parts.length === 1) return parts[0].length > 36 ? `${parts[0].slice(0, 36)}…` : parts[0]
  return lokasi.length > 36 ? `${lokasi.slice(0, 36)}…` : lokasi
}

function shortLuas(luas: string | null | undefined): string | null {
  if (!luas?.trim() || luas.trim() === '-') return null
  const ha = luas.match(/[\d.,]+\s*Ha\b/i)
  if (ha) return ha[0]
  const cleaned = luas.replace(/<[^>]+>/g, '').trim()
  if (cleaned.length <= 28) return cleaned
  return null
}

function plainText(value: string | null | undefined): string {
  if (!value) return ''
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

interface KawasanGridProps {
  kawasan: KawasanIndustri[]
}

export function KawasanGrid({ kawasan }: KawasanGridProps) {
  const [typeFilter, setTypeFilter] = useState<string>('Semua')
  const [lokasiFilter, setLokasiFilter] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const lokasiOptions = useMemo(() => {
    const set = new Set(
      kawasan.map((item) => shortLokasi(item.lokasi)).filter(Boolean),
    )
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'id'))
  }, [kawasan])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return kawasan.filter((item) => {
      const badge = item.badge ?? ''
      const matchType =
        typeFilter === 'Semua' ||
        badge.toLowerCase() === typeFilter.toLowerCase() ||
        (typeFilter === 'KEK' &&
          (item.nama.toLowerCase().includes('kek') ||
            item.nama.toLowerCase().includes('ekonomi khusus')))

      const itemLokasi = shortLokasi(item.lokasi)
      const matchLokasi = !lokasiFilter || itemLokasi === lokasiFilter

      const deskripsi = plainText(item.deskripsi)
      const matchQuery =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.lokasi.toLowerCase().includes(q) ||
        deskripsi.toLowerCase().includes(q) ||
        badge.toLowerCase().includes(q)

      return matchType && matchLokasi && matchQuery
    })
  }, [kawasan, typeFilter, lokasiFilter, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  function resetPage() {
    setPage(1)
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-neutral-500">Tipe:</span>
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setTypeFilter(filter)
                resetPage()
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                typeFilter === filter
                  ? 'bg-brand-500 text-white'
                  : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={lokasiFilter}
            onChange={(e) => {
              setLokasiFilter(e.target.value)
              resetPage()
            }}
            className="w-full rounded-lg border border-brand-100 bg-white px-4 py-2.5 text-sm sm:max-w-[240px]"
          >
            <option value="">Semua Lokasi</option>
            {lokasiOptions.map((lokasi) => (
              <option key={lokasi} value={lokasi}>
                {lokasi}
              </option>
            ))}
          </select>
          <label className="relative block w-full flex-1">
            <span className="sr-only">Cari kawasan</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                resetPage()
              }}
              placeholder="Cari kawasan industri..."
              className="w-full rounded-lg border border-brand-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-200 bg-white px-6 py-12 text-center text-sm text-neutral-500">
          Tidak ada kawasan yang cocok dengan filter atau pencarian Anda.
        </p>
      ) : (
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((item) => {
            const lokasi = shortLokasi(item.lokasi)
            const luas = shortLuas(item.luas)
            const deskripsi = plainText(item.deskripsi)

            return (
              <article
                key={item.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(26,99,36,0.14)]"
              >
                <div className="relative h-[200px] w-full shrink-0 bg-brand-50">
                  <SafeImage
                    src={item.thumbnail}
                    alt={item.nama}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {item.badge ? (
                    <span className="absolute top-3 left-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 line-clamp-2 min-h-[2.75rem] text-base font-bold text-brand-900">
                    <Link
                      href={`/kawasan-industri/${item.slug}`}
                      className="transition duration-300 hover:text-brand-500"
                    >
                      {item.nama}
                    </Link>
                  </h3>

                  <div className="mb-3 space-y-1 text-[0.8rem] text-neutral-500">
                    {lokasi ? (
                      <p className="flex items-start gap-1.5">
                        <span aria-hidden="true">📍</span>
                        <span className="line-clamp-1">{lokasi}</span>
                      </p>
                    ) : null}
                    {luas ? (
                      <p className="flex items-start gap-1.5">
                        <span aria-hidden="true">📐</span>
                        <span className="line-clamp-1">{luas}</span>
                      </p>
                    ) : null}
                  </div>

                  <p className="mb-4 line-clamp-3 flex-1 text-[0.84rem] leading-relaxed text-neutral-600">
                    {deskripsi || 'Informasi kawasan belum tersedia.'}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-brand-50 pt-3">
                    <span className="text-xs text-neutral-500">Kawasan Industri</span>
                    <Link
                      href={`/kawasan-industri/${item.slug}`}
                      className="text-sm font-semibold text-brand-500 transition duration-300 hover:underline"
                    >
                      Detail →
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {filtered.length > 0 ? (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          resultText={`Menampilkan ${paged.length} dari ${filtered.length} kawasan`}
        />
      ) : null}
    </>
  )
}
