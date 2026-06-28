'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SearchBox } from '@/components/ui/SearchBox'
import { Pagination } from '@/components/ui/Pagination'

const umkData = [
  { no: 1, tahun: '2026', sumber: 'Kep. Gub. Nomor 100.3.3.1/505', kabkota: 'Kabupaten Kudus', nilai: 'Rp 2.818.585' },
  { no: 2, tahun: '2026', sumber: 'Kep. Gub. Nomor 100.3.3.1/505', kabkota: 'Kabupaten Cilacap', nilai: 'Rp 2.773.184' },
  { no: 3, tahun: '2026', sumber: 'Kep. Gub. Nomor 100.3.3.1/505', kabkota: 'Kabupaten Jepara', nilai: 'Rp 2.756.501' },
  { no: 4, tahun: '2026', sumber: 'Kep. Gub. Nomor 100.3.3.1/505', kabkota: 'Kabupaten Batang', nilai: 'Rp 2.708.520' },
  { no: 5, tahun: '2026', sumber: 'Kep. Gub. Nomor 100.3.3.1/505', kabkota: 'Kota Pekalongan', nilai: 'Rp 2.700.926' },
]

const pendidikanData = [
  { no: 1, nama: 'SD Bina Bangsa School', kabkota: 'Kota Semarang', jenis: 'Sekolah Dasar' },
  { no: 2, nama: 'SD Semarang Multinational School', kabkota: 'Kota Semarang', jenis: 'Sekolah Dasar' },
  { no: 3, nama: 'SD Mountainview Christian School', kabkota: 'Kota Salatiga', jenis: 'Sekolah Dasar' },
  { no: 4, nama: 'SD Semarang Multinational School', kabkota: 'Kota Semarang', jenis: 'Sekolah Dasar' },
  { no: 5, nama: 'SD Permata Bangsa Semarang', kabkota: 'Kota Semarang', jenis: 'Sekolah Dasar' },
]

export function DataUmkSection() {
  const [tab, setTab] = useState<'umk' | 'pendidikan'>('umk')

  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader
          label="Data"
          title="Data UMK"
          description="UMK Jawa Tengah 2025 berkisar antara Rp 2.170.475 di Banjarnegara hingga Rp 3.454.827 di Kota Semarang."
        />

        <div className="mb-5 flex gap-2 border-b-2 border-cjip-border pb-2">
          {[
            { id: 'umk' as const, label: 'UMK Jawa Tengah' },
            { id: 'pendidikan' as const, label: 'Pendidikan' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
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

        <SearchBox className="mb-4" />

        {tab === 'umk' ? (
          <>
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
                  {umkData.map((row, i) => (
                    <tr
                      key={row.no}
                      className={`border-b border-cjip-border ${i % 2 === 1 ? 'bg-brand-50' : 'bg-white'} hover:bg-brand-200`}
                    >
                      <td className="px-4 py-3 text-content-main">{row.no}</td>
                      <td className="px-4 py-3 text-content-main">{row.tahun}</td>
                      <td className="px-4 py-3 text-content-main">{row.sumber}</td>
                      <td className="px-4 py-3 text-content-main">{row.kabkota}</td>
                      <td className="px-4 py-3 font-medium text-content-main">{row.nilai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalPages={21} resultText="Showing 1 to 5 of 105 results" />
          </>
        ) : (
          <>
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
                  {pendidikanData.map((row, i) => (
                    <tr
                      key={row.no}
                      className={`border-b border-cjip-border ${i % 2 === 1 ? 'bg-brand-50' : 'bg-white'} hover:bg-brand-200`}
                    >
                      <td className="px-4 py-3 text-content-main">{row.no}</td>
                      <td className="px-4 py-3 text-content-main">{row.nama}</td>
                      <td className="px-4 py-3 text-content-main">{row.kabkota}</td>
                      <td className="px-4 py-3 text-content-main">{row.jenis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalPages={5} resultText="Showing 1 to 5 of 23 results" />
          </>
        )}
      </Container>
    </section>
  )
}
