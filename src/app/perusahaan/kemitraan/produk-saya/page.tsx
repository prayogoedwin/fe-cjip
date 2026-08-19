import Link from 'next/link'
import { EmptyState, PageHeader, PanelCard, PrimaryButton } from '@/components/perusahaan/ui'
import { fetchProdukList } from '@/lib/api/perusahaan-server'

export default async function ProdukSayaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q, page } = await searchParams
  const res = await fetchProdukList({ q, page: page ? Number(page) : 1, mine: true })
  const items = res?.data ?? []
  const meta = res?.meta

  return (
    <div>
      <PageHeader
        title="Produk Saya"
        breadcrumbs="Kemitraan > Produk Saya > List"
        action={
          <Link href="/perusahaan/kemitraan/produk-saya/create">
            <PrimaryButton>+ Produk</PrimaryButton>
          </Link>
        }
      />
      <PanelCard>
        {items.length === 0 ? (
          <EmptyState label="No Produk Saya" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <article key={p.id} className="rounded-xl border border-brand-100 p-4">
                <h3 className="font-bold text-brand-900">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-content-muted">{p.description}</p>
                <div className="mt-3">
                  <Link
                    href={`/perusahaan/kemitraan/produk-saya/${p.slug}`}
                    className="inline-block rounded-lg border border-brand-100 bg-white px-2 py-2 text-xs font-medium text-content-main transition hover:bg-brand-50"
                  >
                    Lihat Detail
                  </Link>
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
