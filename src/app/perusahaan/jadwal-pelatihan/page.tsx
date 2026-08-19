import { EmptyState, PageHeader, PanelCard } from '@/components/perusahaan/ui'
import { fetchJadwalPelatihan } from '@/lib/api/perusahaan-server'

export default async function JadwalPelatihanPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  const { page, q } = await searchParams
  const res = await fetchJadwalPelatihan(page ? Number(page) : 1, q)
  const items = (res?.data ?? []) as Array<Record<string, unknown>>
  const meta = res?.meta

  return (
    <div>
      <PageHeader title="Jadwal Pelatihan" breadcrumbs="Mikro > Jadwal Pelatihan > List" />
      <PanelCard>
        {items.length === 0 ? (
          <EmptyState label="No Jadwal Pelatihan" />
        ) : (
          <ul className="divide-y divide-brand-100">
            {items.map((item, idx) => {
              const title =
                (item.nama as string) ||
                (item.judul as string) ||
                (item.name as string) ||
                `Jadwal #${idx + 1}`
              return (
                <li key={idx} className="py-3">
                  <p className="font-medium text-brand-900">{title}</p>
                  <p className="text-xs text-content-muted line-clamp-2">
                    {JSON.stringify(item)}
                  </p>
                </li>
              )
            })}
          </ul>
        )}
        {meta && meta.last_page > 1 ? (
          <p className="mt-4 text-center text-xs text-content-muted">
            Halaman {meta.current_page} / {meta.last_page} · Total {meta.total}
          </p>
        ) : null}
      </PanelCard>
    </div>
  )
}
