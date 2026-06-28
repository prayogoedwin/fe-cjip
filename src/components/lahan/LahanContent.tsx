'use client'

import { useState } from 'react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { CtaBanner } from '@/components/layout/CtaBanner'

const kabkotaOptions = [
  'Semua Kabupaten/Kota',
  'Kota Semarang',
  'Kabupaten Kendal',
  'Kabupaten Batang',
  'Kabupaten Demak',
  'Kabupaten Kudus',
]

const assetSamples = [
  { id: 1, nama: 'Lahan Industri Sayung', luas: '5 Ha', status: 'Siap Pakai', peruntukan: 'Industri', lokasi: 'Kabupaten Demak', tags: ['Industri'] },
  { id: 2, nama: 'Kavling Agro Semarang', luas: '12 Ha', status: 'Tersedia', peruntukan: 'Agro', lokasi: 'Kabupaten Semarang', tags: ['Agro'] },
  { id: 3, nama: 'Tanah Komersial Solo', luas: '2 Ha', status: 'Siap Pakai', peruntukan: 'Komersial', lokasi: 'Kota Surakarta', tags: ['Komersial'] },
  { id: 4, nama: 'Lahan Energi Batang', luas: '20 Ha', status: 'Tersedia', peruntukan: 'Energi', lokasi: 'Kabupaten Batang', tags: ['Energi'] },
  { id: 5, nama: 'Kavling Industri Kendal', luas: '8 Ha', status: 'Siap Pakai', peruntukan: 'Industri', lokasi: 'Kabupaten Kendal', tags: ['Industri'] },
  { id: 6, nama: 'Lahan Pariwisata Magelang', luas: '3 Ha', status: 'Tersedia', peruntukan: 'Pariwisata', lokasi: 'Kabupaten Magelang', tags: ['Pariwisata'] },
]

export function LahanContent() {
  const [selectedKab, setSelectedKab] = useState('Semua Kabupaten/Kota')

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-br from-brand-900 to-brand-600 px-6 py-14 text-center text-white">
        <p className="mb-2 text-sm font-bold tracking-widest text-amber-400 uppercase">BUHANSIP</p>
        <h1 className="text-3xl font-bold md:text-4xl">Lahan Siap Pakai</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
          Basis Data Unit Hak Atas Nasib Sertifikat Investasi Provinsi Jawa Tengah
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {['Terintegrasi', 'Transparan', 'Real-time'].map((badge) => (
            <span key={badge} className="rounded-full border border-white/30 px-3 py-1 text-xs">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-brand-100 bg-white px-6 py-6">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: '156', label: 'Total Lahan' },
              { value: '2.450 Ha', label: 'Total Luas' },
              { value: '28', label: 'Kab/Kota' },
              { value: '89', label: 'Siap Pakai' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-brand-100 p-4 text-center">
                <p className="text-2xl font-bold text-brand-500">{stat.value}</p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <section className="px-6 py-12">
        <Container>
          <div className="mb-8 flex flex-col gap-3 rounded-xl border border-brand-100 bg-brand-50 p-5 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-brand-900">
                Kabupaten/Kota
              </label>
              <select
                value={selectedKab}
                onChange={(e) => setSelectedKab(e.target.value)}
                className="w-full rounded-lg border border-brand-100 px-4 py-2.5 text-sm"
              >
                {kabkotaOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-brand-600"
            >
              Cari Lahan
            </button>
          </div>

          {selectedKab === 'Semua Kabupaten/Kota' ? (
            <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50 py-16 text-center">
              <p className="text-4xl" aria-hidden="true">🗺️</p>
              <p className="mt-3 font-medium text-brand-900">Pilih kabupaten/kota untuk melihat lahan</p>
              <p className="mt-1 text-sm text-neutral-500">
                Gunakan filter di atas untuk menampilkan data lahan siap pakai
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-neutral-500">Menampilkan {assetSamples.length} lahan di {selectedKab}</p>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {assetSamples.map((asset) => (
                  <article
                    key={asset.id}
                    className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm"
                  >
                    <div className="flex h-36 items-center justify-center bg-brand-50 text-4xl">🏞️</div>
                    <div className="p-4">
                      <div className="mb-2 flex flex-wrap gap-1">
                        {asset.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="mb-2 font-semibold text-brand-900">{asset.nama}</h4>
                      <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-neutral-500">
                        <span>📐 {asset.luas}</span>
                        <span>✅ {asset.status}</span>
                        <span>📋 {asset.peruntukan}</span>
                        <span>📍 {asset.lokasi}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-brand-50 px-4 py-3">
                      <span className="text-xs text-neutral-500">{asset.lokasi}</span>
                      <a href="#" className="text-sm font-medium text-brand-500">
                        Detail →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <Pagination totalPages={3} />
            </>
          )}
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
