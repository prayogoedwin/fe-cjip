import { CreateSinidaForm } from '@/components/perusahaan/CreateSinidaForm'
import { PageHeader } from '@/components/perusahaan/ui'
import { fetchProfil } from '@/lib/api/perusahaan-server'

function laravelOrigin() {
  const api = process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://127.0.0.1:8000/api'
  return api.replace(/\/api\/?$/, '') || 'http://127.0.0.1:8000'
}

export default async function CreatePermohonanInsentifPage() {
  const profil = await fetchProfil()
  const p = profil?.data?.perusahaan

  const defaults = {
    nib: (p?.nib as string | null | undefined) ?? '',
    nama_perusahaan: (p?.nama_perusahaan as string | null | undefined) ?? '',
    jenis_usaha: (p?.jenis_usaha as string | null | undefined) ?? '',
    telepon_perusahaan: (p?.telepon_perusahaan as string | null | undefined) ?? '',
    induk_perusahaan: (p?.induk_perusahaan as string | null | undefined) ?? '',
    negara_asal: (p?.negara_asal as string | null | undefined) ?? 'Indonesia',
    alamat_perusahaan: (p?.alamat_perusahaan as string | null | undefined) ?? '',
    nama_pimpinan: (p?.nama_pimpinan as string | null | undefined) ?? '',
    telepon_pimpinan: (p?.telepon_pimpinan as string | null | undefined) ?? '',
    alamat_pimpinan: (p?.alamat_pimpinan as string | null | undefined) ?? '',
  }

  return (
    <div>
      <PageHeader
        title="Create Permohonan Insentif"
        breadcrumbs="Permohonan Insentif > Create"
      />
      <CreateSinidaForm defaults={defaults} paktaBaseUrl={laravelOrigin()} />
    </div>
  )
}
