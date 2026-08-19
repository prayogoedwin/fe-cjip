import Link from 'next/link'
import { MinatButton } from '@/components/perusahaan/MinatButton'
import { EmptyState, PageHeader, PanelCard } from '@/components/perusahaan/ui'
import { fetchProdukList } from '@/lib/api/perusahaan-server'

export default async function SemuaProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q, page } = await searchParams
  const res = await fetchProdukList({ q, page: page ? Number(page) : 1 })
  const items = res?.data ?? []
  const meta = res?.meta

  return (
    <div>
      <PageHeader title="Semua Produk" breadcrumbs="Kemitraan > Semua Produk > List" />
      <PanelCard>
        <form className="mb-4 flex justify-end">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search"
            className="w-full max-w-xs rounded-lg border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </form>

        {items.length === 0 ? (
          <EmptyState label="No Produk" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-xl border border-brand-100 bg-brand-50/30"
              >
                <div
                  className="h-36 bg-cover bg-center bg-brand-100"
                  style={p.thumbnail ? { backgroundImage: `url(${p.thumbnail})` } : undefined}
                />
                <div className="space-y-2 p-4">
                  <h3 className="font-bold text-brand-900">{p.name}</h3>
                  <p className="line-clamp-2 text-sm text-content-muted">{p.description}</p>
                  {p.seller ? (
                    <p className="text-xs font-medium text-brand-500">🏢 {p.seller}</p>
                  ) : null}
                  <div className="flex gap-2 pt-1">
                    <Link
                      href={`/perusahaan/kemitraan/produk-saya/${p.slug}`}
                      className="flex-1 rounded-lg border border-brand-100 bg-white px-2 py-2 text-center text-xs font-medium text-content-main transition hover:bg-brand-50"
                    >
                      Lihat Detail
                    </Link>
                    <MinatButton slug={p.slug} />
                  </div>
                </div>
              </article>
            ))}
          </div>
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
