'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormField, FormSection } from '@/components/form/FormSection'
import { inputClass } from '@/components/form/form-styles'
import { ApiError, type ApiErrorBody } from '@/lib/api/client'

const companyFields = [
  { name: 'nib', label: 'NIB', placeholder: '13 digit NIB', required: true },
  { name: 'nama_perusahaan', label: 'Nama Perusahaan', placeholder: 'PT. / CV. / ...', required: true },
  { name: 'jenis_usaha', label: 'Jenis Usaha', placeholder: 'Contoh: Manufaktur', required: true },
  {
    name: 'telepon_perusahaan',
    label: 'Telepon Perusahaan',
    placeholder: '+62 24 xxxx xxxx',
    required: true,
  },
  {
    name: 'induk_perusahaan',
    label: 'Induk Perusahaan',
    placeholder: 'Nama induk perusahaan (opsional)',
    required: false,
  },
  { name: 'negara_asal', label: 'Negara Asal', placeholder: 'Indonesia', required: true },
]

const leaderFields = [
  { name: 'nama_pimpinan', label: 'Nama Pimpinan', placeholder: 'Nama direktur / pimpinan', required: true },
  {
    name: 'telepon_pimpinan',
    label: 'Telepon Pimpinan',
    placeholder: '+62 8xx-xxxx-xxxx',
    required: true,
  },
]

const uploadFields = [
  {
    name: 'pakta_integritas',
    label: 'File Pakta Integritas',
    hint: 'Maks. 1 MB, format PDF',
    template: true,
  },
  {
    name: 'file_ktp',
    label: 'File KTP',
    hint: 'Maks. 1 MB, format PDF',
  },
  {
    name: 'file_permohonan_direktur',
    label: 'File Permohonan Direktur',
    hint: 'Surat permohonan direktur ke Kepala DPMPTSP, maks. 1 MB, format PDF',
  },
]

function formatApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.body?.errors) {
      const messages = Object.values(err.body.errors).flat()
      if (messages.length) return messages.join(' ')
    }
    if (err.status === 401) return 'Sesi berakhir. Silakan login kembali.'
    return err.message
  }
  if (err instanceof Error) return err.message
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

export function PermohonanInsentifForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    setLoading(true)
    try {
      const response = await fetch('/api/sinida/permohonan', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      const json = (await response.json().catch(() => null)) as
        | {
            success?: boolean
            message?: string
            errors?: Record<string, string[]>
            data?: { message?: string }
          }
        | null

      if (!response.ok) {
        throw new ApiError(
          json?.message ?? `Request gagal (${response.status})`,
          response.status,
          (json as ApiErrorBody | null) ?? null,
        )
      }

      setSuccessMessage(json?.data?.message || 'Permohonan insentif berhasil dikirim.')
      setSuccess(true)
      form.reset()
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.replace('/login?rdr=sinida')
        return
      }
      setError(formatApiError(err))
    } finally {
      setLoading(false)
    }
  }

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
        {success ? (
          <div className="rounded-xl border border-brand-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-brand-900">Permohonan Terkirim</h2>
            <p className="mb-6 text-sm text-neutral-600">{successMessage}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => {
                  setSuccess(false)
                  setSuccessMessage('')
                }}
                className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
              >
                Ajukan Lagi
              </button>
              <Link
                href="/"
                className="rounded-lg border border-brand-100 px-6 py-3 text-center text-sm font-medium text-neutral-700 transition duration-300 hover:bg-white"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => void handleSubmit(e)}>
            <FormSection icon="🏢" title="DATA PERUSAHAAN">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                {companyFields.map((field) => (
                  <FormField key={field.name} {...field} />
                ))}
                <div className="min-w-0 space-y-1.5 sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Alamat Perusahaan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamat_perusahaan"
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
                  <FormField key={field.name} {...field} />
                ))}
                <div className="min-w-0 space-y-1.5 sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Alamat Pimpinan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamat_pimpinan"
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
                  <div key={field.name} className="min-w-0 space-y-2">
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
                      name={field.name}
                      accept=".pdf,application/pdf"
                      required
                      className="box-border w-full min-w-0 text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
                    />
                  </div>
                ))}
              </div>
            </FormSection>

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            ) : null}

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
                disabled={loading}
                className="flex-1 rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Mengirim...' : 'Kirim Permohonan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
