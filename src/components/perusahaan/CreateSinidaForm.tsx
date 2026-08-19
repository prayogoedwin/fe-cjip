'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { perusahaanBff } from '@/lib/api/perusahaan-client'
import {
  Field,
  PanelCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/perusahaan/ui'

export type SinidaDefaults = {
  nib: string
  nama_perusahaan: string
  jenis_usaha: string
  telepon_perusahaan: string
  induk_perusahaan: string
  negara_asal: string
  alamat_perusahaan: string
  nama_pimpinan: string
  telepon_pimpinan: string
  alamat_pimpinan: string
}

function FileField({
  name,
  label,
  required,
}: {
  name: string
  label: string
  required?: boolean
}) {
  return (
    <Field label={label} required={required}>
      <input
        name={name}
        type="file"
        accept="application/pdf"
        required={required}
        className="block w-full text-sm text-content-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
      />
      <p className="mt-1 text-xs text-content-muted">*file maksimal 1 MB, format .pdf</p>
    </Field>
  )
}

export function CreateSinidaForm({
  defaults,
  paktaBaseUrl,
}: {
  defaults: SinidaDefaults
  paktaBaseUrl: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(defaults)

  function update<K extends keyof SinidaDefaults>(key: K, value: SinidaDefaults[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const templateUrl = useMemo(() => {
    const q = new URLSearchParams({
      nama: form.nama_perusahaan || '',
      alamat_perusahaan: form.alamat_perusahaan || '',
      telepon_perusahaan: form.telepon_perusahaan || '',
      nama_pimpinan: form.nama_pimpinan || '',
      alamat_pimpinan: form.alamat_pimpinan || '',
      telepon_pimpinan: form.telepon_pimpinan || '',
    })
    return `${paktaBaseUrl.replace(/\/$/, '')}/pakta-integritas?${q.toString()}`
  }, [form, paktaBaseUrl])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await perusahaanBff('sinida', { method: 'POST', formData: fd })
      router.push('/perusahaan/permohonan-insentif')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim permohonan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="space-y-4" encType="multipart/form-data">
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}

      <PanelCard title="Perusahaan">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="NIB" required>
            <input
              name="nib"
              className={inputClass}
              value={form.nib}
              onChange={(e) => update('nib', e.target.value)}
              minLength={13}
              maxLength={13}
              required
            />
          </Field>
          <Field label="Nama Perusahaan" required>
            <input
              name="nama_perusahaan"
              className={inputClass}
              value={form.nama_perusahaan}
              onChange={(e) => update('nama_perusahaan', e.target.value)}
              required
            />
          </Field>
          <Field label="Jenis Usaha" required>
            <input
              name="jenis_usaha"
              className={inputClass}
              value={form.jenis_usaha}
              onChange={(e) => update('jenis_usaha', e.target.value)}
              required
            />
          </Field>
          <Field label="Telepon Perusahaan" required>
            <input
              name="telepon_perusahaan"
              className={inputClass}
              value={form.telepon_perusahaan}
              onChange={(e) => update('telepon_perusahaan', e.target.value)}
              required
            />
          </Field>
          <Field label="Induk Perusahaan" required>
            <input
              name="induk_perusahaan"
              className={inputClass}
              value={form.induk_perusahaan}
              onChange={(e) => update('induk_perusahaan', e.target.value)}
              required
            />
          </Field>
          <Field label="Negara Asal" required>
            <input
              name="negara_asal"
              className={inputClass}
              value={form.negara_asal}
              onChange={(e) => update('negara_asal', e.target.value)}
              required
            />
          </Field>
          <Field label="Alamat Perusahaan" required className="md:col-span-2">
            <textarea
              name="alamat_perusahaan"
              className={textareaClass}
              value={form.alamat_perusahaan}
              onChange={(e) => update('alamat_perusahaan', e.target.value)}
              required
            />
          </Field>
          <Field label="Nama Pimpinan" required>
            <input
              name="nama_pimpinan"
              className={inputClass}
              value={form.nama_pimpinan}
              onChange={(e) => update('nama_pimpinan', e.target.value)}
              required
            />
          </Field>
          <Field label="Telepon Pimpinan" required>
            <input
              name="telepon_pimpinan"
              className={inputClass}
              value={form.telepon_pimpinan}
              onChange={(e) => update('telepon_pimpinan', e.target.value)}
              required
            />
          </Field>
          <Field label="Alamat Pimpinan" required className="md:col-span-2">
            <textarea
              name="alamat_pimpinan"
              className={textareaClass}
              value={form.alamat_pimpinan}
              onChange={(e) => update('alamat_pimpinan', e.target.value)}
              required
            />
          </Field>
        </div>
      </PanelCard>

      <PanelCard title="Upload Persyaratan">
        <div className="space-y-5">
          <div>
            <FileField name="pakta_integritas" label="File Pakta Integritas" required />
            <a
              href={templateUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-medium text-brand-500 underline hover:text-brand-600 hover:no-underline"
            >
              Download template Pakta Integritas
            </a>
          </div>
          <FileField name="file_ktp" label="File KTP" required />
          <FileField name="file_permohonan_direktur" label="File Permohonan Direktur" required />
        </div>
      </PanelCard>

      <div className="flex flex-wrap gap-2">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'Mengirim...' : 'Create'}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.back()}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  )
}
