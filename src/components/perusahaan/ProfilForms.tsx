'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { perusahaanBff } from '@/lib/api/perusahaan-client'
import {
  Field,
  FileDropzone,
  PanelCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/perusahaan/ui'

type ProfilData = {
  personal: {
    name: string
    email: string
    no_hp?: string | null
    jabatan?: string | null
    avatar?: string | null
  }
  perusahaan: {
    nib?: string | null
    nama_perusahaan?: string | null
    jenis_usaha?: string | null
    telepon_perusahaan?: string | null
    induk_perusahaan?: string | null
    negara_asal?: string | null
    alamat_perusahaan?: string | null
    nama_pimpinan?: string | null
    telepon_pimpinan?: string | null
    alamat_pimpinan?: string | null
  } | null
}

export function ProfilForms({ initial }: { initial: ProfilData }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  async function savePersonal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading('personal')
    const fd = new FormData(e.currentTarget)
    try {
      await perusahaanBff('profil/personal', {
        method: 'PUT',
        body: {
          name: fd.get('name'),
          email: fd.get('email'),
          no_hp: fd.get('no_hp'),
          jabatan: fd.get('jabatan'),
        },
      })
      setOk('Informasi personal tersimpan.')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan.')
    } finally {
      setLoading(null)
    }
  }

  async function savePerusahaan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading('perusahaan')
    const fd = new FormData(e.currentTarget)
    try {
      await perusahaanBff('profil/perusahaan', {
        method: 'PUT',
        body: Object.fromEntries(fd.entries()),
      })
      setOk('Informasi perusahaan tersimpan.')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan.')
    } finally {
      setLoading(null)
    }
  }

  async function savePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading('password')
    const fd = new FormData(e.currentTarget)
    try {
      await perusahaanBff('profil/password', {
        method: 'PUT',
        body: {
          current_password: fd.get('current_password'),
          password: fd.get('password'),
          password_confirmation: fd.get('password_confirmation'),
        },
      })
      setOk('Password diperbarui.')
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memperbarui password.')
    } finally {
      setLoading(null)
    }
  }

  async function saveAvatar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading('avatar')
    const fd = new FormData(e.currentTarget)
    try {
      await perusahaanBff('profil/avatar', { method: 'POST', formData: fd })
      setOk('Foto profil diperbarui.')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal upload foto.')
    } finally {
      setLoading(null)
    }
  }

  const c = initial.perusahaan

  return (
    <div className="space-y-6">
      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}
      {ok ? (
        <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-600">{ok}</p>
      ) : null}

      <PanelCard title="Foto Profil">
        <form onSubmit={(e) => void saveAvatar(e)} className="space-y-3">
          {initial.personal.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={initial.personal.avatar}
              alt="Avatar"
              className="mb-3 h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <FileDropzone hint="JPG/PNG, maksimal 1 MB" />
          )}
          <input type="file" name="avatar" accept="image/*" required className="text-sm" />
          <PrimaryButton type="submit" disabled={loading === 'avatar'}>
            {loading === 'avatar' ? 'Mengunggah...' : 'Upload Foto'}
          </PrimaryButton>
        </form>
      </PanelCard>

      <PanelCard title="Informasi Personal">
        <form onSubmit={(e) => void savePersonal(e)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" required>
              <input name="name" className={inputClass} defaultValue={initial.personal.name} required />
            </Field>
            <Field label="Email" required>
              <input
                name="email"
                type="email"
                className={inputClass}
                defaultValue={initial.personal.email}
                required
              />
            </Field>
            <Field label="No. HP" required>
              <input name="no_hp" className={inputClass} defaultValue={initial.personal.no_hp ?? ''} required />
            </Field>
            <Field label="Jabatan" required>
              <input
                name="jabatan"
                className={inputClass}
                defaultValue={initial.personal.jabatan ?? ''}
                required
              />
            </Field>
          </div>
          <div className="flex justify-end">
            <PrimaryButton type="submit" disabled={loading === 'personal'}>
              {loading === 'personal' ? 'Menyimpan...' : 'Simpan'}
            </PrimaryButton>
          </div>
        </form>
      </PanelCard>

      <PanelCard title="Informasi Perusahaan">
        <form onSubmit={(e) => void savePerusahaan(e)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="NIB" required>
              <input name="nib" className={inputClass} defaultValue={c?.nib ?? ''} required />
            </Field>
            <Field label="Nama perusahaan" required>
              <input
                name="nama_perusahaan"
                className={inputClass}
                defaultValue={c?.nama_perusahaan ?? ''}
                required
              />
            </Field>
            <Field label="Jenis usaha" required>
              <input
                name="jenis_usaha"
                className={inputClass}
                defaultValue={c?.jenis_usaha ?? ''}
                required
              />
            </Field>
            <Field label="Telp. Perusahaan" required>
              <input
                name="telepon_perusahaan"
                className={inputClass}
                defaultValue={c?.telepon_perusahaan ?? ''}
                required
              />
            </Field>
            <Field label="Induk Perusahaan">
              <input
                name="induk_perusahaan"
                className={inputClass}
                defaultValue={c?.induk_perusahaan ?? ''}
              />
            </Field>
            <Field label="Asal Negara" required>
              <input
                name="negara_asal"
                className={inputClass}
                defaultValue={c?.negara_asal ?? 'Indonesia'}
                required
              />
            </Field>
            <Field label="Alamat perusahaan" required className="md:col-span-2">
              <textarea
                name="alamat_perusahaan"
                className={textareaClass}
                defaultValue={c?.alamat_perusahaan ?? ''}
                required
              />
            </Field>
            <Field label="Nama Pimpinan" required>
              <input
                name="nama_pimpinan"
                className={inputClass}
                defaultValue={c?.nama_pimpinan ?? ''}
                required
              />
            </Field>
            <Field label="Telp. Pimpinan" required>
              <input
                name="telepon_pimpinan"
                className={inputClass}
                defaultValue={c?.telepon_pimpinan ?? ''}
                required
              />
            </Field>
            <Field label="Alamat Pimpinan" required className="md:col-span-2">
              <textarea
                name="alamat_pimpinan"
                className={textareaClass}
                defaultValue={c?.alamat_pimpinan ?? ''}
                required
              />
            </Field>
          </div>
          <div className="flex justify-end">
            <PrimaryButton type="submit" disabled={loading === 'perusahaan'}>
              {loading === 'perusahaan' ? 'Menyimpan...' : 'Simpan'}
            </PrimaryButton>
          </div>
        </form>
      </PanelCard>

      <PanelCard>
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <div>
            <h2 className="text-sm font-semibold text-brand-900">Password</h2>
            <p className="mt-1 text-sm text-content-muted">Perbarui password akun secara berkala.</p>
          </div>
          <form
            onSubmit={(e) => void savePassword(e)}
            className="space-y-3 rounded-xl border border-brand-100 bg-brand-50/40 p-4"
          >
            <Field label="Current password" required>
              <input name="current_password" type="password" className={inputClass} required />
            </Field>
            <Field label="New password" required>
              <input name="password" type="password" className={inputClass} required />
            </Field>
            <Field label="Confirm password" required>
              <input name="password_confirmation" type="password" className={inputClass} required />
            </Field>
            <div className="flex justify-end gap-2">
              <SecondaryButton type="reset">Batal</SecondaryButton>
              <PrimaryButton type="submit" disabled={loading === 'password'}>
                {loading === 'password' ? 'Menyimpan...' : 'Update'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </PanelCard>
    </div>
  )
}
