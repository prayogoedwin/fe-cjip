'use client'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { SafeImage } from '@/components/ui/SafeImage'
import { LahanSearchBar } from '@/components/lahan/LahanSearchBar'
import { fetchLahanList } from '@/lib/api'
import { type LahanItem, type LahanStatus } from '@/lib/lahan-data'

const STATUS_RIBBON: Record<LahanStatus, string> = {
  Tersedia: 'bg-brand-500',
  Tersewa: 'bg-red-600',
  Terjual: 'bg-red-600',
}

function LahanCard({ item }: { item: LahanItem }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden bg-brand-50">
        <SafeImage
          src={item.thumbnail}
          alt={item.nama}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className={`absolute top-[1.1rem] left-[-3.1rem] z-10 w-[11rem] -rotate-45 py-1.5 text-center text-[0.7rem] font-extrabold tracking-widest text-white uppercase shadow-md ${STATUS_RIBBON[item.status]}`}
        >
          {item.status}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {item.skema.map((s) => (
            <span
              key={s}
              className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 text-[10px] font-black tracking-widest text-brand-700 uppercase"
            >
              {s}
            </span>
          ))}
        </div>

        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-brand-900 transition duration-300 group-hover:text-brand-500">
          {item.nama}
        </h3>
        <div className="mb-6 flex items-center text-sm text-neutral-500">
          <svg className="mr-1 h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {item.wilayah}
        </div>

        <div className="flex items-center justify-between border-t border-brand-50 pt-6">
          <div>
            <span className="text-xs font-bold tracking-tight text-neutral-400 uppercase">Luas Lahan</span>
            <p className="text-lg font-black text-brand-900">
              {item.luas} <small className="text-sm font-normal text-neutral-500">m²</small>
            </p>
          </div>
          <Link
            href={`/lahan-siap-pakai/${item.slug}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-900 transition duration-300 group-hover:bg-brand-500 group-hover:text-white"
            aria-label={`Detail ${item.nama}`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

interface LahanContentProps {
  initialData?: LahanItem[]
}

export function LahanContent({ initialData }: LahanContentProps) {
  const [items, setItems] = useState<LahanItem[]>(initialData ?? [])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [wilayah, setWilayah] = useState('')
  const [skema, setSkema] = useState('')
  const [status, setStatus] = useState('')

  const runSearch = useCallback(async (params: {
    q?: string
    wilayah?: string
    skema?: string
    status?: string
  }) => {
    setLoading(true)
    try {
      const { data } = await fetchLahanList({
        q: params.q || undefined,
        wilayah: params.wilayah || undefined,
        skema: params.skema || undefined,
        status: params.status || undefined,
        perPage: 50,
      })
      setItems(data)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!initialData?.length) {
      void runSearch({})
    }
  }, [initialData, runSearch])

  function handleSearch() {
    void runSearch({ q: query, wilayah, skema, status })
  }

  return (
    <>
      <div className="relative mt-[68px] overflow-hidden bg-brand-900 py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-transparent" />

        <Container>
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-lg border border-brand-500/30 bg-brand-500/20 px-3 py-1 text-xs font-black tracking-[0.2em] text-white uppercase backdrop-blur-sm">
                  BUHANSIP
                </span>
                <span className="text-xs font-medium tracking-wider text-white/60 uppercase">
                  Butuh Lahan Siap Pakai
                </span>
              </div>
              <h1 className="mb-6 text-3xl leading-tight font-extrabold text-white md:text-5xl">
                Temukan Peluang
                <br />
                <span className="bg-gradient-to-r from-brand-100 to-emerald-300 bg-clip-text text-transparent">
                  Investasi Lahan Strategis
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Melalui fitur <strong className="text-white">BUHANSIP</strong>, akses data lahan siap pakai
                yang telah terverifikasi untuk mendukung percepatan pembangunan dan investasi di Jawa Tengah.
              </p>
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="grid w-full max-w-md grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition duration-500 hover:rotate-0 -rotate-3">
                  <p className="text-2xl font-black tracking-tight text-white">Terverifikasi</p>
                  <p className="mt-1 text-xs font-bold tracking-widest text-white/60 uppercase">Data Akurat</p>
                </div>
                <div className="translate-y-8 rotate-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition duration-500 hover:rotate-0">
                  <p className="text-2xl font-black tracking-tight text-white">Strategis</p>
                  <p className="mt-1 text-xs font-bold tracking-widest text-white/60 uppercase">Lokasi Pilihan</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative z-20 -mt-10 px-6 md:-mt-12">
        <Container>
          <LahanSearchBar
            query={query}
            wilayah={wilayah}
            skema={skema}
            status={status}
            onQueryChange={setQuery}
            onWilayahChange={setWilayah}
            onSkemaChange={setSkema}
            onStatusChange={setStatus}
            onSearch={handleSearch}
          />
        </Container>
      </div>

      <section className="bg-brand-50/40 px-6 pb-16 pt-12 md:pt-16">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-900">Aset Tersedia</h2>
            <p className="text-neutral-500">
              {loading ? 'Memuat...' : `Menampilkan ${items.length} lokasi strategis`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-brand-100 bg-white py-12 text-center shadow-sm">
              <p className="font-medium text-neutral-400">
                Aset lahan tidak ditemukan untuk kategori filter ini.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <LahanCard key={item.id} item={item} />
                ))}
              </div>
              <Pagination totalPages={1} />
            </>
          )}
        </Container>
      </section>
    </>
  )
}
