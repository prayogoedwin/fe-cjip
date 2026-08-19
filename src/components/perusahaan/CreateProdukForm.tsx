'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { perusahaanBff } from '@/lib/api/perusahaan-client'
import {
  Field,
  PageHeader,
  PanelCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/perusahaan/ui'

export function CreateProdukForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    // Normalize checkbox
    if (!fd.get('is_active')) fd.set('is_active', '0')
    else fd.set('is_active', '1')

    try {
      const res = await perusahaanBff<{ slug?: string }>('kemitraan/produk-saya', {
        method: 'POST',
        formData: fd,
      })
      const slug = res.data?.slug
      router.push(slug ? `/perusahaan/kemitraan/produk-saya/${slug}` : '/perusahaan/kemitraan/produk-saya')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal membuat produk.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader title="Create Produk Saya" breadcrumbs="Kemitraan > Produk Saya > Create" />
      <PanelCard>
        <form onSubmit={(e) => void onSubmit(e)} className="space-y-5" encType="multipart/form-data">
          {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
          <Field label="Nama Produk" required>
            <input name="name" className={inputClass} placeholder="Masukan Nama Produk" required />
          </Field>
          <Field label="Deskripsi" required>
            <textarea
              name="description"
              className={textareaClass}
              placeholder="Masukan Deskripsi Singkat Produk"
              required
            />
          </Field>
          <Field label="Sampul Produk" required>
            <input name="image_cover" type="file" accept="image/*" required className="text-sm" />
          </Field>
          <Field label="Galeri Produk" required>
            <input
              name="image_gallery[]"
              type="file"
              accept="image/*"
              multiple
              required
              className="text-sm"
            />
            <p className="mt-1 text-xs text-content-muted">Maksimal 5 gambar, tiap file ≤ 1 MB</p>
          </Field>
          <label className="flex items-center gap-2 text-sm text-content-muted">
            <input type="checkbox" name="is_active" defaultChecked />
            Status aktif
          </label>
          <div className="flex flex-wrap gap-2">
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Create'}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => router.back()}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </PanelCard>
    </div>
  )
}
