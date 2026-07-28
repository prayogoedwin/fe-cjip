'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import { FormField, FormSection } from '@/components/form/FormSection'
import { inputClass, selectClass } from '@/components/form/form-styles'
import { submitKepeminatan } from '@/lib/api'
import { ApiError } from '@/lib/api/client'

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'

const steps = [
  { num: 1, label: 'Detail Kontak' },
  { num: 2, label: 'Kepeminatan' },
  { num: 3, label: 'Jadwal Proyek' },
]

const contactFields = [
  {
    name: 'name',
    label: 'Nama Lengkap / Full Name',
    placeholder: 'Masukkan nama lengkap',
    required: true,
  },
  {
    name: 'jabatan',
    label: 'Jabatan / Job Title',
    placeholder: 'Contoh: Direktur Utama',
    required: true,
  },
  {
    name: 'no_hp',
    label: 'No. Telepon / Phone Number',
    placeholder: '+62 8xx-xxxx-xxxx',
    required: true,
  },
  {
    name: 'email',
    label: 'Alamat Email / Email Address',
    placeholder: 'email@perusahaan.com',
    required: true,
    type: 'email',
  },
  {
    name: 'nama_perusahaan',
    label: 'Nama Perusahaan / Company Name',
    placeholder: 'PT. / CV. / ...',
    required: true,
  },
  {
    name: 'jenis_usaha',
    label: 'Bidang Usaha Saat Ini / Business Field',
    placeholder: 'Contoh: Manufaktur Elektronik',
    required: true,
  },
]

function formatApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.body?.errors) {
      const messages = Object.values(err.body.errors).flat()
      if (messages.length) return messages.join(' ')
    }
    return err.message
  }
  if (err instanceof Error) return err.message
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

export function KepeminatanForm() {
  const [projectType, setProjectType] = useState<'greenfield' | 'brownfield'>('greenfield')
  const [currency, setCurrency] = useState<'usd' | 'rupiah'>('usd')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!turnstileToken) {
      setError('Silakan selesaikan verifikasi terlebih dahulu.')
      return
    }

    setLoading(true)

    const form = e.currentTarget
    const fd = new FormData(form)

    const payload: Record<string, unknown> = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      jabatan: String(fd.get('jabatan') ?? '').trim(),
      no_hp: String(fd.get('no_hp') ?? '').trim(),
      nama_perusahaan: String(fd.get('nama_perusahaan') ?? '').trim(),
      jenis_usaha: String(fd.get('jenis_usaha') ?? '').trim(),
      alamat_perusahaan: String(fd.get('alamat_perusahaan') ?? '').trim(),
      negara_asal: String(fd.get('negara_asal') ?? '').trim(),
      project_type: projectType,
      sektor: String(fd.get('sektor') ?? '').trim() || undefined,
      prefensi_lokasi: String(fd.get('prefensi_lokasi') ?? '').trim() || undefined,
      currency,
      jadwal_proyek: String(fd.get('jadwal_proyek') ?? '').trim(),
      jadwal_selesai: String(fd.get('jadwal_selesai') ?? '').trim() || undefined,
      other_information: String(fd.get('other_information') ?? '').trim() || undefined,
      turnstile_token: turnstileToken,
    }

    try {
      const res = await submitKepeminatan(payload)
      setSuccessMessage(res.data.message || 'Pengajuan Letter of Intent berhasil dikirim.')
      setSuccess(true)
      form.reset()
      setProjectType('greenfield')
      setCurrency('usd')
      setTurnstileToken(null)
    } catch (err) {
      setError(formatApiError(err))
      setTurnstileToken(null)
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

        {success ? (
          <div className="rounded-xl border border-brand-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-brand-900">Berhasil Dikirim</h2>
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
                Kirim Lagi
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
            <FormSection icon="👤" title="DETAIL KONTAK / Contact Detail">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                {contactFields.map((field) => (
                  <FormField key={field.name} {...field} />
                ))}
                <div className="min-w-0 space-y-1.5 sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Alamat Perusahaan / Company Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="alamat_perusahaan"
                    placeholder="Jalan, Kota, Provinsi, Negara"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0 space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">
                    Negara Asal / Country of Origin <span className="text-red-500">*</span>
                  </label>
                  <select name="negara_asal" required className={selectClass}>
                    <option value="">Pilih negara...</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="China">China</option>
                    <option value="Jepang">Jepang</option>
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
                    {(['greenfield', 'brownfield'] as const).map((type) => (
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
                    <select name="sektor" className={selectClass}>
                      <option value="">Pilih sektor...</option>
                      <option value="Manufaktur">Manufaktur</option>
                      <option value="Pariwisata">Pariwisata</option>
                      <option value="Energi">Energi</option>
                    </select>
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Kabupaten/Kota</label>
                    <select name="prefensi_lokasi" className={selectClass}>
                      <option value="">Pilih wilayah...</option>
                      <option value="Kota Semarang">Kota Semarang</option>
                      <option value="Kabupaten Kendal">Kabupaten Kendal</option>
                    </select>
                  </div>
                </div>

                <div className="min-w-0 space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Mata Uang Investasi</label>
                  <div className="flex flex-wrap gap-3">
                    {(['usd', 'rupiah'] as const).map((cur) => (
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
                    <label className="block text-sm font-medium text-neutral-700">
                      Tanggal Mulai <span className="text-red-500">*</span>
                    </label>
                    <input type="date" name="jadwal_proyek" required className={inputClass} />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <label className="block text-sm font-medium text-neutral-700">Estimasi Selesai</label>
                    <input type="date" name="jadwal_selesai" className={inputClass} />
                  </div>
                </div>

                <div className="min-w-0 space-y-1.5">
                  <label className="block text-sm font-medium text-neutral-700">Catatan Tambahan</label>
                  <textarea
                    name="other_information"
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

            <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Verifikasi <span className="text-red-500">*</span>
              </label>
              <p className="mb-3 text-xs text-neutral-500">
                Centang kotak di bawah untuk konfirmasi bahwa Anda bukan robot.
              </p>
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                options={{
                  theme: 'light',
                  size: 'normal',
                  appearance: 'always',
                }}
                onSuccess={(token) => {
                  setTurnstileToken(token)
                  setError('')
                }}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
              />
            </div>

            <p className="text-xs text-neutral-500">
              <span className="text-red-500">*</span> Wajib diisi
            </p>

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex-1 rounded-lg border border-brand-100 py-3 text-center text-sm font-medium text-neutral-700 transition duration-300 hover:bg-white"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={!turnstileToken || loading}
                className="flex-1 rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Mengirim...' : 'Simpan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
