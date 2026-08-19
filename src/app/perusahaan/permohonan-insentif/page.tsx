import Link from 'next/link'
import { EmptyState, PageHeader, PanelCard, PrimaryButton } from '@/components/perusahaan/ui'
import { fetchSinidaList } from '@/lib/api/perusahaan-server'

export default async function PermohonanInsentifListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const res = await fetchSinidaList(page ? Number(page) : 1)
  const items = res?.data ?? []
  const meta = res?.meta

  return (
    <div>
      <PageHeader
        title="Permohonan Insentif"
        breadcrumbs="Permohonan Insentif > List"
        action={
          <Link href="/perusahaan/permohonan-insentif/create">
            <PrimaryButton>+ Permohonan Insentif</PrimaryButton>
          </Link>
        }
      />
      <PanelCard>
        {items.length === 0 ? (
          <EmptyState label="No Permohonan Insentif" />
        ) : (
          <ul className="divide-y divide-brand-100">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium text-brand-900">Permohonan #{item.id}</p>
                  <p className="text-sm text-content-muted">{item.created_at || ''}</p>
                </div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-500">
                  {item.status || '-'}
                </span>
              </li>
            ))}
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
