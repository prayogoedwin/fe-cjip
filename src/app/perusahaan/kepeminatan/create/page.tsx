import { CreateKepeminatanForm } from '@/components/perusahaan/CreateKepeminatanForm'
import { PageHeader } from '@/components/perusahaan/ui'
import { fetchKepeminatanMeta, fetchProfil } from '@/lib/api/perusahaan-server'

export default async function CreateKepeminatanPage() {
  const [profil, metaRes] = await Promise.all([fetchProfil(), fetchKepeminatanMeta()])

  const personal = profil?.data?.personal
  const perusahaan = profil?.data?.perusahaan

  const defaults = {
    name: personal?.name ?? '',
    email: personal?.email ?? '',
    jabatan: personal?.jabatan ?? '',
    no_hp: personal?.no_hp ?? '',
    nama_perusahaan: (perusahaan?.nama_perusahaan as string | null | undefined) ?? '',
    jenis_usaha: (perusahaan?.jenis_usaha as string | null | undefined) ?? '',
    alamat_perusahaan: (perusahaan?.alamat_perusahaan as string | null | undefined) ?? '',
    negara_asal: (perusahaan?.negara_asal as string | null | undefined) ?? 'Indonesia',
    induk_perusahaan: (perusahaan?.induk_perusahaan as string | null | undefined) ?? '',
  }

  const meta = metaRes?.data ?? {
    negara: ['Indonesia'],
    kabkota: [],
    proyek: [],
    sektor: [
      'Industri',
      'Infrastruktur',
      'Pertanian',
      'Pariwisata',
      'Properti',
      'Energi',
      'Jasa',
      'Lainnya',
    ],
  }

  return (
    <div>
      <PageHeader title="Create Kepeminatan" breadcrumbs="Kepeminatan > Create" />
      <CreateKepeminatanForm defaults={defaults} meta={meta} />
    </div>
  )
}
