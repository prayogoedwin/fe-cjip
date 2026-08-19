'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { perusahaanBff } from '@/lib/api/perusahaan-client'
import { SignaturePad } from '@/components/perusahaan/SignaturePad'
import {
  Field,
  PanelCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/perusahaan/ui'

export type KepeminatanContactDefaults = {
  name: string
  email: string
  jabatan: string
  no_hp: string
  nama_perusahaan: string
  jenis_usaha: string
  alamat_perusahaan: string
  negara_asal: string
  induk_perusahaan: string
}

export type KepeminatanFormMeta = {
  negara: string[]
  kabkota: Array<{ id: number; nama: string }>
  proyek: Array<{ id: number; nama: string }>
  sektor: string[]
}

function num(v: FormDataEntryValue | null): number | null {
  if (v == null || v === '') return null
  const n = Number(String(v).replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

export function CreateKepeminatanForm({
  defaults,
  meta,
}: {
  defaults: KepeminatanContactDefaults
  meta: KepeminatanFormMeta
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [interest, setInterest] = useState(false)
  const [localPlan, setLocalPlan] = useState<0 | 1>(1)

  const negaraOptions = useMemo(() => {
    const list = [...(meta.negara ?? [])]
    if (defaults.negara_asal && !list.includes(defaults.negara_asal)) {
      list.unshift(defaults.negara_asal)
    }
    if (!list.includes('Indonesia')) list.unshift('Indonesia')
    return list
  }, [meta.negara, defaults.negara_asal])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)

    const body: Record<string, unknown> = {
      name: String(fd.get('name') ?? '').trim(),
      jabatan: String(fd.get('jabatan') ?? '').trim(),
      no_hp: String(fd.get('no_hp') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      nama_perusahaan: String(fd.get('nama_perusahaan') ?? '').trim(),
      jenis_usaha: String(fd.get('jenis_usaha') ?? '').trim(),
      alamat_perusahaan: String(fd.get('alamat_perusahaan') ?? '').trim(),
      negara_asal: String(fd.get('negara_asal') ?? '').trim(),
      induk_perusahaan: String(fd.get('induk_perusahaan') ?? '').trim(),
      interest_invesment: interest,
      proyek_id: interest ? num(fd.get('proyek_id')) : null,
      sektor: interest ? String(fd.get('sektor') ?? '').trim() || null : null,
      rencana_bidang_usaha: String(fd.get('rencana_bidang_usaha') ?? '').trim(),
      status_investasi: num(fd.get('status_investasi')) ?? 0,
      prefensi_lokasi: num(fd.get('prefensi_lokasi')),
      local_plan: localPlan,
      nilai_investasi: localPlan === 0 ? num(fd.get('nilai_investasi')) : null,
      nilai_investasi_rupiah: localPlan === 1 ? num(fd.get('nilai_investasi_rupiah')) : null,
      local_worker_plan: num(fd.get('local_worker_plan')) ?? 0,
      local_worker_exis: num(fd.get('local_worker_exis')) ?? 0,
      foreign_worker_plan: num(fd.get('foreign_worker_plan')) ?? 0,
      foreign_worker_exis: num(fd.get('foreign_worker_exis')) ?? 0,
      deskripsi_proyek: String(fd.get('deskripsi_proyek') ?? '').trim(),
      jadwal_proyek: String(fd.get('jadwal_proyek') ?? '').trim() || null,
      signature: String(fd.get('signature') ?? '').trim() || null,
    }

    try {
      await perusahaanBff('kepeminatan', { method: 'POST', body })
      router.push('/perusahaan/kepeminatan')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}

      <PanelCard title="Detail Kontak / Contact Detail">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nama Lengkap / Full Name" required>
            <input name="name" className={inputClass} defaultValue={defaults.name} required />
          </Field>
          <Field label="Jabatan / Job Title" required>
            <input name="jabatan" className={inputClass} defaultValue={defaults.jabatan} required />
          </Field>
          <Field label="No. Telpon / Phone Number" required>
            <input name="no_hp" className={inputClass} defaultValue={defaults.no_hp} required />
          </Field>
          <Field label="Alamat Email / Email Address" required>
            <input
              name="email"
              type="email"
              className={inputClass}
              defaultValue={defaults.email}
              required
            />
          </Field>
          <Field label="Nama Perusahaan / Company Name" required>
            <input
              name="nama_perusahaan"
              className={inputClass}
              defaultValue={defaults.nama_perusahaan}
              required
            />
          </Field>
          <Field label="Bidang Usaha Saat ini / Business Field" required>
            <input
              name="jenis_usaha"
              className={inputClass}
              defaultValue={defaults.jenis_usaha}
              required
            />
          </Field>
          <Field label="Alamat Perusahaan / Company Address" required className="md:col-span-2">
            <textarea
              name="alamat_perusahaan"
              className={textareaClass}
              defaultValue={defaults.alamat_perusahaan}
              required
            />
          </Field>
          <Field label="Asal Negara" required>
            <select
              name="negara_asal"
              className={inputClass}
              defaultValue={defaults.negara_asal || 'Indonesia'}
              required
            >
              <option value="">Pilih negara...</option>
              {negaraOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Induk Perusahaan / Parent Company" required>
            <input
              name="induk_perusahaan"
              className={inputClass}
              defaultValue={defaults.induk_perusahaan}
              required
            />
          </Field>
        </div>
      </PanelCard>

      <PanelCard title="INVESTMENT INTEREST / Kepeminatan Investasi">
        <div className="space-y-4">
          <label className="flex items-start gap-3 text-sm text-content-main">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-brand-200 text-brand-500"
              checked={interest}
              onChange={(e) => setInterest(e.target.checked)}
            />
            <span>
              Apakah Kepeminatan dengan Proyek Jawa Tengah / What is the Interest in Central Java
              Project?
            </span>
          </label>

          {interest ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Proyek Investasi / Project Interest">
                <select name="proyek_id" className={inputClass}>
                  <option value="">Select an option</option>
                  {meta.proyek.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Sektor Investasi / Sector" required>
                <select name="sektor" className={inputClass} required={interest}>
                  <option value="">Select an option</option>
                  {meta.sektor.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          ) : null}

          <Field label="Rencana bidang usaha" required>
            <input name="rencana_bidang_usaha" className={inputClass} required />
          </Field>

          <Field label="Status investasi" required>
            <div className="flex flex-wrap gap-4 pt-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="status_investasi" value={0} defaultChecked required />
                NEW (GREENFIELD) / BARU
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="status_investasi" value={1} />
                EXPANSION (BROWNFIELD) / EXPANSI
              </label>
            </div>
          </Field>

          <Field label="Prefensi Lokasi / Location Preference" required>
            <select name="prefensi_lokasi" className={inputClass} required>
              <option value="">Select an option</option>
              {meta.kabkota.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nama}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Mata Uang / Currency" required>
            <div className="flex flex-wrap gap-4 pt-1 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="local_plan"
                  value={0}
                  checked={localPlan === 0}
                  onChange={() => setLocalPlan(0)}
                />
                USD
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="local_plan"
                  value={1}
                  checked={localPlan === 1}
                  onChange={() => setLocalPlan(1)}
                />
                Rupiah
              </label>
            </div>
          </Field>

          {localPlan === 0 ? (
            <Field label="Nilai Investasi Dalam USD" required>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-content-muted">
                  USD
                </span>
                <input
                  name="nilai_investasi"
                  type="number"
                  min={0}
                  step="any"
                  className={`${inputClass} pl-14`}
                  required
                />
              </div>
            </Field>
          ) : (
            <Field label="Nilai Investasi Dalam Rupiah" required>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-content-muted">
                  Rp.
                </span>
                <input
                  name="nilai_investasi_rupiah"
                  type="number"
                  min={0}
                  step="any"
                  className={`${inputClass} pl-12`}
                  required
                />
              </div>
            </Field>
          )}

          <div className="rounded-lg border border-brand-100 p-4">
            <p className="mb-3 text-sm font-semibold text-brand-900">Local Worker / TKI</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Plan / Rencana" required>
                <div className="relative">
                  <input
                    name="local_worker_plan"
                    type="number"
                    min={0}
                    defaultValue={0}
                    className={`${inputClass} pr-28`}
                    required
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-content-muted">
                    People / Orang
                  </span>
                </div>
              </Field>
              <Field label="Existing / Eksisting" required>
                <div className="relative">
                  <input
                    name="local_worker_exis"
                    type="number"
                    min={0}
                    defaultValue={0}
                    className={`${inputClass} pr-28`}
                    required
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-content-muted">
                    People / Orang
                  </span>
                </div>
              </Field>
            </div>
          </div>

          <div className="rounded-lg border border-brand-100 p-4">
            <p className="mb-3 text-sm font-semibold text-brand-900">Foreign Worker / TKA</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Plan / Rencana" required>
                <div className="relative">
                  <input
                    name="foreign_worker_plan"
                    type="number"
                    min={0}
                    defaultValue={0}
                    className={`${inputClass} pr-28`}
                    required
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-content-muted">
                    People / Orang
                  </span>
                </div>
              </Field>
              <Field label="Existing / Eksisting" required>
                <div className="relative">
                  <input
                    name="foreign_worker_exis"
                    type="number"
                    min={0}
                    defaultValue={0}
                    className={`${inputClass} pr-28`}
                    required
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-content-muted">
                    People / Orang
                  </span>
                </div>
              </Field>
            </div>
          </div>
        </div>
      </PanelCard>

      <PanelCard title="Jadwal Proyek / Timeline Project">
        <div className="space-y-4">
          <Field label="Deskripsi Proyek / Project Description" required>
            <textarea name="deskripsi_proyek" className={textareaClass} required />
          </Field>
          <Field label="Tanggal Proyek / Project Date" required>
            <input name="jadwal_proyek" type="date" className={inputClass} required />
          </Field>
          <Field label="Tanda Tangan / Signature" required>
            <SignaturePad required />
          </Field>
        </div>
      </PanelCard>

      <div className="flex flex-wrap gap-2">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Create'}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.back()}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  )
}
