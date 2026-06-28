'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { SearchBox } from '@/components/ui/SearchBox'
import { Pagination } from '@/components/ui/Pagination'
import { CtaBanner } from '@/components/layout/CtaBanner'

const regionCards = [
  { nama: 'Kota Semarang', deskripsi: 'Ibu kota provinsi dengan infrastruktur lengkap dan pusat ekonomi.' },
  { nama: 'Kabupaten Kendal', deskripsi: 'Lokasi KEK Kendal dan kawasan industri strategis di pesisir utara.' },
  { nama: 'Kabupaten Batang', deskripsi: 'Kawasan Industri Terpadu Batang dan pelabuhan Tanjung Emas.' },
  { nama: 'Kota Surakarta', deskripsi: 'Pusat budaya Jawa dengan potensi pariwisata dan UMKM kuat.' },
  { nama: 'Kabupaten Magelang', deskripsi: 'Destinasi wisata Borobudur dan kawasan agropolitan.' },
  { nama: 'Kabupaten Kudus', deskripsi: 'Pusat industri tekstil dan manufaktur di Jawa Tengah.' },
  { nama: 'Kabupaten Demak', deskripsi: 'Kawasan industri Sayung dan akses logistik strategis.' },
  { nama: 'Kota Pekalongan', deskripsi: 'Kota batik dunia dengan industri kreatif berkembang.' },
]

export function ProfilJatengContent() {
  const [tarifTab, setTarifTab] = useState<'listrik' | 'air'>('listrik')

  return (
    <>
      <PageHero
        label="Profil"
        title="Profil Jawa Tengah"
        description="Mengenal lebih dekat potensi, sumber daya, dan daya tarik investasi Jawa Tengah"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Profil Jateng' }]}
      />

      <div className="relative h-64 w-full md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1600&q=80"
          alt="Panorama Jawa Tengah"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <section className="px-6 py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-brand-900">Tentang Jawa Tengah</h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Jawa Tengah merupakan provinsi yang terletak di tengah Pulau Jawa dengan luas wilayah
                  32.800,69 km². Dengan 35 kabupaten/kota, Jawa Tengah menjadi salah satu pusat ekonomi
                  nasional dengan pertumbuhan yang konsisten.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-brand-900">Sumber Daya Manusia</h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Jawa Tengah memiliki populasi lebih dari 36 juta jiwa dengan tingkat pendidikan yang
                  terus meningkat. Tenaga kerja di Jawa Tengah dikenal memiliki etos kerja tinggi dan
                  biaya kompetitif.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-brand-900">Biaya Investasi</h2>
                <div className="mb-4 flex gap-2">
                  {[
                    { id: 'listrik' as const, label: 'Tarif Listrik' },
                    { id: 'air' as const, label: 'Tarif Air' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTarifTab(tab.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ${
                        tarifTab === tab.id
                          ? 'bg-brand-500 text-white'
                          : 'border border-brand-100 text-neutral-700 hover:bg-brand-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <SearchBox className="mb-4" />
                <div className="overflow-x-auto rounded-xl border border-brand-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-brand-50 text-brand-900">
                      <tr>
                        <th className="px-4 py-3">No</th>
                        <th className="px-4 py-3">Golongan</th>
                        <th className="px-4 py-3">Daya</th>
                        <th className="px-4 py-3">Tarif (Rp/kWh)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { no: 1, gol: 'Rumah Tangga', daya: '900 VA', tarif: '1.352' },
                        { no: 2, gol: 'Bisnis', daya: '5.500 VA', tarif: '1.467' },
                        { no: 3, gol: 'Industri', daya: '14.000 VA', tarif: '1.114' },
                      ].map((row) => (
                        <tr key={row.no} className="border-t border-brand-50">
                          <td className="px-4 py-3">{row.no}</td>
                          <td className="px-4 py-3">{row.gol}</td>
                          <td className="px-4 py-3">{row.daya}</td>
                          <td className="px-4 py-3">{row.tarif}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination totalPages={3} />
              </div>
            </div>

            <aside className="space-y-4">
              {[
                { label: 'Luas Wilayah', value: '32.800 km²' },
                { label: 'Jumlah Penduduk', value: '36,9 Juta' },
                { label: 'Kabupaten/Kota', value: '35' },
                { label: 'PDRB 2024', value: 'Rp 1.820 T' },
                { label: 'Pertumbuhan Ekonomi', value: '4,95%' },
                { label: 'Realisasi Investasi', value: 'Rp 88,44 T' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50 px-4 py-3"
                >
                  <span className="text-sm text-neutral-600">{stat.label}</span>
                  <span className="font-bold text-brand-900">{stat.value}</span>
                </div>
              ))}
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-brand-50 px-6 py-12">
        <Container>
          <h2 className="mb-8 text-center text-2xl font-bold text-brand-900">Profil Wilayah</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {regionCards.map((region) => (
              <article
                key={region.nama}
                className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm"
              >
                <h4 className="mb-2 font-semibold text-brand-900">{region.nama}</h4>
                <p className="mb-3 text-sm text-neutral-600">{region.deskripsi}</p>
                <Link href="#" className="text-sm font-medium text-brand-500">
                  Selengkapnya →
                </Link>
              </article>
            ))}
          </div>
          <Pagination totalPages={5} />
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
