'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FormField, FormSection } from '@/components/form/FormSection'
import { inputClass, selectClass } from '@/components/form/form-styles'

const steps = [
  { num: 1, label: 'Detail Kontak' },
  { num: 2, label: 'Kepeminatan' },
  { num: 3, label: 'Jadwal Proyek' },
]

const contactFields = [
  { label: 'Nama Lengkap / Full Name', placeholder: 'Masukkan nama lengkap', required: true },
  { label: 'Jabatan / Job Title', placeholder: 'Contoh: Direktur Utama', required: true },
  { label: 'No. Telepon / Phone Number', placeholder: '+62 8xx-xxxx-xxxx', required: true },
  { label: 'Alamat Email / Email Address', placeholder: 'email@perusahaan.com', required: true },
  { label: 'Nama Perusahaan / Company Name', placeholder: 'PT. / CV. / ...', required: true },
  {
    label: 'Bidang Usaha Saat Ini / Business Field',
    placeholder: 'Contoh: Manufaktur Elektronik',
    required: true,
  },
]

export function KepeminatanForm() {
  const [projectType, setProjectType] = useState('greenfield')
  const [currency, setCurrency] = useState('usd')

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="flex items-center justify-between border-b border-brand-100 bg-white px-6 py-4">
        <Link href="/">
          <Image
            src="https://cjip.jatengprov.go.id/images/cjip.png"
            alt="Logo CJIP"
            width={120}
            height={44}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>
        <Link href="/" className="text-sm text-brand-500 transition duration-300 hover:text-brand-600">
          ← Kembali ke Beranda
        </Link>
      </div>

      <div className="bg-gradient-to-br from-brand-900 to-brand-500 px-6 py-12 text-center text-white">
        <Image
          src="https://cjip.jatengprov.go.id/images/logo_jateng.svg"
          alt="Logo Provinsi Jawa Tengah"
          width={80}
          height={80}
          className="mx-auto mb-4 h-16 w-auto"
        />
        <h1 className="text-3xl font-bold">Letter of Intent</h1>
        <p className="mt-2 text-sm text-white/80">Profil Minat Investasi (Investment Account Profile)</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                  {step.num}
                </div>
                <span className="mt-1 text-xs text-neutral-600">{step.label}</span>
              </div>
              {i < steps.length - 1 && <div className="mx-3 mb-5 h-0.5 w-16 bg-brand-200" />}
            </div>
          ))}
        </div>

        <form className="space-y-6">
          <FormSection icon="👤" title="DETAIL KONTAK / Contact Detail">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {contactFields.map((field) => (
                <FormField key={field.label} {...field} />
              ))}
              <div className="min-w-0 space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Alamat Perusahaan / Company Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Jalan, Kota, Provinsi, Negara"
                  required
                  className={inputClass}
                />
              </div>
              <div className="min-w-0 space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">
                  Negara Asal / Country of Origin <span className="text-red-500">*</span>
                </label>
                <select required className={selectClass}>
                  <option value="">Pilih negara...</option>
                  <option>Indonesia</option>
                  <option>Singapore</option>
                  <option>China</option>
                  <option>Jepang</option>
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection icon="💼" title="KEPEMINATAN / Investment Interest">
            <div className="space-y-5">
              <div className="min-w-0 space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Tipe Proyek <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {['greenfield', 'brownfield'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm capitalize transition duration-300 ${
                        projectType === type
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-brand-100 text-neutral-600 hover:bg-brand-50'
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full border-2 ${
                          projectType === type ? 'border-brand-500 bg-brand-500' : 'border-neutral-300'
                        }`}
                      />
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="min-w-0 space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Sektor Investasi</label>
                  <select className={selectClass}>
                    <option>Pilih sektor...</option>
                    <option>Manufaktur</option>
                    <option>Pariwisata</option>
                    <option>Energi</option>
                  </select>
                </div>
                <div className="min-w-0 space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Kabupaten/Kota</label>
                  <select className={selectClass}>
                    <option>Pilih wilayah...</option>
                    <option>Kota Semarang</option>
                    <option>Kabupaten Kendal</option>
                  </select>
                </div>
              </div>

              <div className="min-w-0 space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Mata Uang Investasi</label>
                <div className="flex flex-wrap gap-3">
                  {['usd', 'rupiah'].map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => setCurrency(cur)}
                      className={`rounded-lg border px-4 py-2.5 text-sm uppercase transition duration-300 ${
                        currency === cur
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-brand-100 text-neutral-600'
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection icon="📅" title="JADWAL PROYEK / Project Timeline">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="min-w-0 space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Tanggal Mulai</label>
                  <input type="date" className={inputClass} />
                </div>
                <div className="min-w-0 space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Estimasi Selesai</label>
                  <input type="date" className={inputClass} />
                </div>
              </div>

              <div className="min-w-0 space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">Catatan Tambahan</label>
                <textarea
                  rows={4}
                  placeholder="Tambahkan informasi relevan lainnya..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="min-w-0 space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Tanda Tangan Digital</label>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-brand-200 bg-brand-50 text-sm text-neutral-400">
                  Area tanda tangan — klik untuk menggambar
                </div>
                <button type="button" className="text-sm text-brand-500">
                  Hapus Tanda Tangan
                </button>
              </div>
            </div>
          </FormSection>

          <p className="text-xs text-neutral-500">
            <span className="text-red-500">*</span> Wajib diisi
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="flex-1 rounded-lg border border-brand-100 py-3 text-center text-sm font-medium text-neutral-700 transition duration-300 hover:bg-white"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
