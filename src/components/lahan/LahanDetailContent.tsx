'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { LahanItem } from '@/lib/lahan-data'
import { getLahanAlamat, getLahanMapsUrl } from '@/lib/lahan-data'
import { LahanGallery } from '@/components/lahan/LahanGallery'
import { LahanMinatModal } from '@/components/lahan/LahanMinatModal'

const STATUS_COLOR: Record<LahanItem['status'], string> = {
  Tersedia: 'bg-emerald-600/80 border-emerald-500',
  Tersewa: 'bg-red-600/80 border-red-500',
  Terjual: 'bg-red-600/80 border-red-500',
}

interface LahanDetailContentProps {
  lahan: LahanItem
}

export function LahanDetailContent({ lahan }: LahanDetailContentProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const alamat = getLahanAlamat(lahan)
  const mapsUrl = getLahanMapsUrl(lahan)

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      <div className="relative overflow-hidden bg-brand-900 py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Link
            href="/lahan-siap-pakai"
            className="mt-6 mb-6 inline-flex items-center font-semibold text-white transition hover:text-brand-100"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Lahan
          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md ${STATUS_COLOR[lahan.status]}`}
                >
                  {lahan.status}
                </span>
                {lahan.skema.map((skema) => (
                  <span
                    key={skema}
                    className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-black tracking-[0.1em] text-white uppercase backdrop-blur-md"
                  >
                    {skema}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl leading-tight font-extrabold text-white md:text-5xl">{lahan.nama}</h1>
              <p className="mt-4 flex items-center text-lg text-slate-300">
                <svg className="mr-2 h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {alamat}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="mb-1 text-sm font-bold tracking-widest text-slate-400 uppercase">Luas Total</span>
              <span className="text-4xl font-black text-white md:text-5xl">
                {lahan.luas} <small className="text-xl font-normal text-slate-400">m²</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <LahanGallery images={lahan.foto} nama={lahan.nama} />

            <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-sm">
              <h3 className="mb-8 flex items-center text-2xl font-black text-brand-900">
                <span className="mr-4 h-8 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                Deskripsi & Potensi Lahan
              </h3>
              <p className="mb-12 leading-relaxed text-neutral-600">{lahan.deskripsi}</p>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-2xl border border-brand-100 bg-brand-50/80 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-xs font-black tracking-wider text-brand-900 uppercase">
                    <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Legalitas & Status
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-brand-100 pb-2 text-sm">
                      <span className="text-neutral-500">Legalitas</span>
                      <span className="font-bold text-brand-900">{lahan.legalitas}</span>
                    </div>
                    <div className="text-sm">
                      <span className="mb-1 block text-neutral-500">Kondisi Eksisting:</span>
                      <span className="leading-relaxed font-semibold text-brand-900">{lahan.kondisiEksisting}</span>
                    </div>
                    <div className="text-sm">
                      <span className="mb-1 block text-neutral-500">Peruntukan Lahan:</span>
                      <span className="leading-relaxed font-semibold text-brand-900">{lahan.peruntukan}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-100 bg-brand-50/80 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-xs font-black tracking-wider text-brand-900 uppercase">
                    <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Infrastruktur
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm">
                      <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="text-neutral-500">Akses:</span>
                      <span className="font-bold text-brand-900">{lahan.akses}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span className="text-neutral-500">Air:</span>
                      <span className="font-bold text-brand-900">{lahan.air}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-neutral-500">Listrik:</span>
                      <span className="font-bold text-brand-900">{lahan.listrik}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit space-y-8 lg:sticky lg:top-10">
            {lahan.status === 'Tersedia' ? (
              <div className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 shadow-xl">
                <div
                  className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-brand-50 transition duration-500 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="relative z-10 mb-2 font-black text-brand-900">Tertarik Berinvestasi?</h3>
                <p className="relative z-10 mb-8 text-xs leading-relaxed text-neutral-500">
                  Hubungi pengelola lahan ini untuk informasi lebih lanjut.
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="relative z-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-900 py-5 text-sm font-black text-white shadow-lg transition hover:bg-brand-500 active:scale-95"
                >
                  <svg className="h-6 w-6 animate-pulse text-red-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  KIRIM MINAT SEKARANG
                </button>
              </div>
            ) : (
              <div className="rounded-3xl border border-brand-100 bg-brand-100 p-8 text-center">
                <svg className="mx-auto mb-4 h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-sm font-bold tracking-tighter text-neutral-500 uppercase">
                  Lahan Sudah {lahan.status}
                </p>
              </div>
            )}

            <div className="group relative overflow-hidden rounded-3xl bg-brand-900 p-8 text-white shadow-2xl">
              <div className="absolute -right-4 -bottom-4 opacity-10 transition duration-700 group-hover:scale-110" aria-hidden="true">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="relative z-10">
                <h4 className="mb-2 flex items-center gap-2 text-lg font-bold">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Lokasi Strategis
                </h4>
                <p className="mb-8 text-xs text-slate-400 italic">{alamat}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-6 py-3 font-bold text-emerald-400 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
                >
                  BUKA DI GOOGLE MAPS
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="mt-4 text-[10px] leading-relaxed text-slate-500">
                  *Gunakan link ini untuk mendapatkan petunjuk arah navigasi langsung ke lokasi lahan via Google Maps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LahanMinatModal lahan={lahan} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
