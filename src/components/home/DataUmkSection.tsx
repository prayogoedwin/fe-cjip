'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Pagination } from '@/components/ui/Pagination'
import { fetchPendidikan, fetchUmk } from '@/lib/api'
import type { ApiMeta } from '@/lib/api/client'

const PER_PAGE = 5

type UmkRow = {
  id: number
  tahun: string
  sumber: string
  kabkota: string
  nilai: string
}

type PendidikanRow = {
  id: number
  nama: string
  kabkota: string
  jenis: string
}

interface DataUmkSectionProps {
  umkSection?: { title: string; desc: string; image: string | null }
}

export function DataUmkSection({ umkSection }: DataUmkSectionProps) {
  const [tab, setTab] = useState<'umk' | 'pendidikan'>('umk')
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [initialLoading, setInitialLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const [umkRows, setUmkRows] = useState<UmkRow[]>([])
  const [pendidikanRows, setPendidikanRows] = useState<PendidikanRow[]>([])
  const [meta, setMeta] = useState<ApiMeta | null>(null)

  const requestIdRef = useRef(0)
  const hasLoadedOnce = useRef(false)

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current
    const isFirst = !hasLoadedOnce.current

    if (isFirst) setInitialLoading(true)
    else setRefreshing(true)
    setError('')

    try {
      if (tab === 'umk') {
        const res = await fetchUmk({ page, perPage: PER_PAGE, q: appliedQuery || undefined })
        if (requestId !== requestIdRef.current) return

        if (!res) {
          setUmkRows([])
          setMeta(null)
          setError('Gagal memuat data UMK dari API. Pastikan Laravel lokal berjalan.')
          return
        }

        startTransition(() => {
          setUmkRows(
            res.data.map((row) => ({
              id: row.id,
              tahun: String(row.tahun),
              sumber: row.sumber_data,
              kabkota: row.kabkota ?? '-',
              nilai: row.nilai_umr,
            })),
          )
          setMeta(res.meta ?? null)
        })
      } else {
        const res = await fetchPendidikan({
          page,
          perPage: PER_PAGE,
          q: appliedQuery || undefined,
        })
        if (requestId !== requestIdRef.current) return

        if (!res) {
          setPendidikanRows([])
          setMeta(null)
          setError('Gagal memuat data pendidikan dari API. Pastikan Laravel lokal berjalan.')
          return
        }

        startTransition(() => {
          setPendidikanRows(
            res.data.map((row) => ({
              id: row.id,
              nama: row.nama,
              kabkota: row.kabkota ?? '-',
              jenis: row.jenis_sekolah,
            })),
          )
          setMeta(res.meta ?? null)
        })
      }

      hasLoadedOnce.current = true
    } finally {
      if (requestId === requestIdRef.current) {
        setInitialLoading(false)
        setRefreshing(false)
      }
    }
  }, [tab, page, appliedQuery])

  useEffect(() => {
    void load()
  }, [load])

  function handleSearch() {
    setPage(1)
    setAppliedQuery(query.trim())
  }

  function handleTabChange(next: 'umk' | 'pendidikan') {
    if (next === tab) return
    hasLoadedOnce.current = false
    setTab(next)
    setPage(1)
    setQuery('')
    setAppliedQuery('')
  }

  function handlePageChange(nextPage: number) {
    if (nextPage === page || refreshing || isPending) return
    setPage(nextPage)
  }

  const busy = refreshing || isPending
  const rowsCount = tab === 'umk' ? umkRows.length : pendidikanRows.length
  const from = meta ? (meta.current_page - 1) * meta.per_page + (rowsCount > 0 ? 1 : 0) : 0
  const to = meta ? (meta.current_page - 1) * meta.per_page + rowsCount : 0
  const total = meta?.total ?? 0
  const lastPage = meta?.last_page ?? 1
  const rowOffset = meta?.current_page ? (meta.current_page - 1) * meta.per_page : 0

  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader
          label="Data"
          title={umkSection?.title || 'Data UMK'}
          description={
            umkSection?.desc ||
            'Data Upah Minimum Kabupaten/Kota dan pendidikan di Provinsi Jawa Tengah.'
          }
        />

        <div className="mb-5 flex gap-2 border-b-2 border-cjip-border pb-2">
          {[
            { id: 'umk' as const, label: 'UMK Jawa Tengah' },
            { id: 'pendidikan' as const, label: 'Pendidikan' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTabChange(t.id)}
              className={`rounded-t-md px-4 py-2 text-[0.83rem] font-semibold transition duration-300 ${
                tab === t.id
                  ? 'border border-brand-500 bg-brand-500 text-white'
                  : 'border border-transparent text-content-muted hover:text-content-main'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="search"
            placeholder="Cari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            className="flex-1 rounded-lg border border-cjip-border px-3.5 py-2.5 text-[0.85rem] text-content-main outline-none focus:border-brand-500 focus:shadow-[0_0_0_2px_rgba(26,99,36,0.12)]"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={busy}
            className="rounded-lg bg-brand-500 px-4 py-2.5 text-[0.85rem] font-semibold text-white transition duration-300 hover:bg-brand-900 disabled:opacity-60"
          >
            Cari
          </button>
        </div>

        {error ? (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </p>
        ) : null}

        {initialLoading ? (
          <div className="overflow-hidden rounded-[10px] border border-cjip-border bg-white">
            <div className="h-11 bg-brand-900" />
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className={`h-12 border-b border-cjip-border px-4 ${i % 2 === 1 ? 'bg-brand-50' : 'bg-white'}`}
              >
                <div className="mt-4 h-3 w-3/4 animate-pulse rounded bg-brand-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className={`transition-opacity duration-200 ${busy ? 'pointer-events-none opacity-55' : 'opacity-100'}`}>
            {tab === 'umk' ? (
              <div className="overflow-x-auto rounded-[10px] border border-cjip-border">
                <table className="w-full border-collapse text-left text-[0.84rem]">
                  <thead>
                    <tr className="bg-brand-900">
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">No</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Tahun</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Sumber Data</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Kabupaten/Kota</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Nilai UMK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {umkRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-content-muted">
                          Data UMK belum tersedia.
                        </td>
                      </tr>
                    ) : (
                      umkRows.map((row, i) => (
                        <tr
                          key={row.id}
                          className={`border-b border-cjip-border ${i % 2 === 1 ? 'bg-brand-50' : 'bg-white'} hover:bg-brand-200`}
                        >
                          <td className="px-4 py-3 text-content-main">{rowOffset + i + 1}</td>
                          <td className="px-4 py-3 text-content-main">{row.tahun}</td>
                          <td className="px-4 py-3 text-content-main">{row.sumber}</td>
                          <td className="px-4 py-3 text-content-main">{row.kabkota}</td>
                          <td className="px-4 py-3 font-medium text-content-main">{row.nilai}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-[10px] border border-cjip-border">
                <table className="w-full border-collapse text-left text-[0.84rem]">
                  <thead>
                    <tr className="bg-brand-900">
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">No</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Nama</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Kabkota</th>
                      <th className="px-4 py-3 font-semibold whitespace-nowrap text-white">Jenis Sekolah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendidikanRows.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-content-muted">
                          Data pendidikan belum tersedia.
                        </td>
                      </tr>
                    ) : (
                      pendidikanRows.map((row, i) => (
                        <tr
                          key={row.id}
                          className={`border-b border-cjip-border ${i % 2 === 1 ? 'bg-brand-50' : 'bg-white'} hover:bg-brand-200`}
                        >
                          <td className="px-4 py-3 text-content-main">{rowOffset + i + 1}</td>
                          <td className="px-4 py-3 text-content-main">{row.nama}</td>
                          <td className="px-4 py-3 text-content-main">{row.kabkota}</td>
                          <td className="px-4 py-3 text-content-main">{row.jenis}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination
              totalPages={lastPage}
              currentPage={page}
              onPageChange={handlePageChange}
              resultText={`Showing ${from} to ${to} of ${total} results`}
            />
          </div>
        )}
      </Container>
    </section>
  )
}
