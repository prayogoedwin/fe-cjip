import { EmptyState, PageHeader, PanelCard } from '@/components/perusahaan/ui'
import { fetchLaporMikro } from '@/lib/api/perusahaan-server'

export default async function LaporMikroPage() {
  const data = await fetchLaporMikro()
  const nib = data?.nib?.data
  const proyek = (data?.proyek?.data ?? []) as Array<{
    id_proyek?: string
    judul_kbli?: string
    alamat_usaha?: string
  }>
  const lapor = (data?.lapor?.data ?? []) as Array<{
    id: number
    year?: number
    proyek_id?: string
  }>

  return (
    <div>
      <PageHeader title="Lapor Mikro" breadcrumbs="Lapor Mikro > List" />

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <PanelCard>
          <p className="text-sm text-content-muted">
            {nib?.found
              ? `NIB ${nib.nib}${nib.nama_perusahaan ? ` · ${nib.nama_perusahaan}` : ''} · ${nib.proyek_count ?? 0} proyek`
              : nib?.message || 'Data NIB tidak ditemukan.'}
          </p>
        </PanelCard>
        <PanelCard title="Daftar Proyek Anda">
          {proyek.length === 0 ? (
            <p className="text-sm text-content-muted">Belum ada proyek terkait NIB.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {proyek.map((p) => (
                <li key={p.id_proyek} className="text-brand-900">
                  {p.id_proyek} — {p.judul_kbli || p.alamat_usaha || '-'}
                </li>
              ))}
            </ul>
          )}
        </PanelCard>
      </div>

      <PanelCard>
        {lapor.length === 0 ? (
          <EmptyState label="No Lapor Mikro" />
        ) : (
          <ul className="divide-y divide-brand-100">
            {lapor.map((item) => (
              <li key={item.id} className="flex justify-between py-3 text-sm">
                <span className="font-medium text-brand-900">Lapor #{item.id}</span>
                <span className="text-content-muted">
                  Tahun {item.year} · Proyek {item.proyek_id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </PanelCard>
    </div>
  )
}
