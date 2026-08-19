import { EmptyState, PageHeader, PanelCard } from '@/components/perusahaan/ui'
import { fetchMinat } from '@/lib/api/perusahaan-server'

export default async function MinatMasukPage() {
  const res = await fetchMinat('masuk')
  const items = (res?.data ?? []) as Array<{
    id: number
    status?: boolean
    status_label?: string
    product?: { name?: string }
    peminat?: { name?: string; email?: string }
  }>

  return (
    <div>
      <PageHeader title="Minat Masuk" breadcrumbs="Kemitraan > Minat Masuk > List" />
      <PanelCard>
        {items.length === 0 ? (
          <EmptyState label="No Minat Masuk" />
        ) : (
          <ul className="divide-y divide-brand-100">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium text-brand-900">{item.product?.name || 'Produk'}</p>
                  <p className="text-sm text-content-muted">
                    {item.peminat?.name} · {item.peminat?.email}
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-500">
                  {item.status_label || (item.status ? 'Disetujui' : 'Menunggu')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </PanelCard>
    </div>
  )
}
