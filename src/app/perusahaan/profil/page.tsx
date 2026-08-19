import { PageHeader } from '@/components/perusahaan/ui'
import { ProfilForms } from '@/components/perusahaan/ProfilForms'
import { fetchProfil } from '@/lib/api/perusahaan-server'

export default async function PerusahaanProfilPage() {
  const res = await fetchProfil()
  const data = res?.data ?? {
    personal: { name: '', email: '', no_hp: '', jabatan: '', avatar: null },
    perusahaan: null,
  }

  return (
    <div>
      <PageHeader title="Profil" breadcrumbs="Perusahaan > Profil" />
      <ProfilForms initial={data} />
    </div>
  )
}
