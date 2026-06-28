'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormField, FormSection } from '@/components/form/FormSection'
import { inputClass } from '@/components/form/form-styles'

const companyFields = [
  { label: 'NIB', placeholder: '13 digit NIB', required: true },
  { label: 'Nama Perusahaan', placeholder: 'PT. / CV. / ...', required: true },
  { label: 'Jenis Usaha', placeholder: 'Contoh: Manufaktur', required: true },
  { label: 'Telepon Perusahaan', placeholder: '+62 24 xxxx xxxx', required: true },
  { label: 'Induk Perusahaan', placeholder: 'Nama induk perusahaan', required: true },
  { label: 'Negara Asal', placeholder: 'Indonesia', required: true },
]

const leaderFields = [
  { label: 'Nama Pimpinan', placeholder: 'Nama direktur / pimpinan', required: true },
  { label: 'Telepon Pimpinan', placeholder: '+62 8xx-xxxx-xxxx', required: true },
]

const uploadFields = [
  {
    label: 'File Pakta Integritas',
    hint: 'Maks. 1 MB, format PDF',
    template: true,
  },
  {
    label: 'File KTP',
    hint: 'Maks. 1 MB, format PDF',
  },
  {
    label: 'File Permohonan Direktur',
    hint: 'Surat permohonan direktur ke Kepala DPMPTSP, maks. 1 MB, format PDF',
  },
]

export function PermohonanInsentifForm() {
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
        <h1 className="text-3xl font-bold">Permohonan Insentif</h1>
        <p className="mt-2 text-sm text-white/80">
          Sistem Informasi Insentif Daerah (SINIDA) — Provinsi Jawa Tengah
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <form className="space-y-6">
          <FormSection icon="🏢" title="DATA PERUSAHAAN">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {companyFields.map((field) => (
                <FormField key={field.label} {...field} />
              ))}
              <div className="min-w-0 space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Alamat Perusahaan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Alamat lengkap perusahaan"
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </FormSection>

          <FormSection icon="👤" title="DATA PIMPINAN">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {leaderFields.map((field) => (
                <FormField key={field.label} {...field} />
              ))}
              <div className="min-w-0 space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Alamat Pimpinan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Alamat lengkap pimpinan"
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </FormSection>

          <FormSection icon="📎" title="UPLOAD PERSYARATAN">
            <div className="space-y-6">
              {uploadFields.map((field) => (
                <div key={field.label} className="min-w-0 space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs leading-relaxed text-neutral-500">{field.hint}</p>
                  {field.template && (
                    <a
                      href="#"
                      className="inline-block text-sm text-brand-500 underline hover:text-brand-600"
                    >
                      Download template Pakta Integritas
                    </a>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    className="box-border w-full min-w-0 text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
                  />
                </div>
              ))}
            </div>
          </FormSection>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 rounded-lg border border-brand-200 bg-white py-3 text-sm font-semibold text-neutral-700 transition duration-300 hover:bg-brand-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
            >
              Kirim Permohonan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
