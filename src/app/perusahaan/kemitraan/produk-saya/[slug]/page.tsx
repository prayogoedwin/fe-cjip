import Link from 'next/link'
import { MinatButton } from '@/components/perusahaan/MinatButton'
import { PageHeader, PanelCard } from '@/components/perusahaan/ui'
import { fetchProdukDetail } from '@/lib/api/perusahaan-server'

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const res = await fetchProdukDetail(slug)
  const data = res?.data as
    | {
        name?: string
        description?: string
        seller?: string
        thumbnail?: string
        created_at?: string
      }
    | undefined

  if (!data) {
    return (
      <div>
        <PageHeader title="Produk tidak ditemukan" breadcrumbs="Kemitraan > View" />
        <PanelCard>
          <Link href="/perusahaan/kemitraan/semua-produk" className="text-sm text-brand-500">
            ← Kembali
          </Link>
        </PanelCard>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={`View ${data.name}`}
        breadcrumbs={`Kemitraan > Semua Produk > ${data.name} > View`}
        action={<MinatButton slug={slug} />}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <PanelCard title="Gambar Produk">
          <div
            className="h-48 rounded-lg bg-brand-50 bg-cover bg-center"
            style={data.thumbnail ? { backgroundImage: `url(${data.thumbnail})` } : undefined}
          />
        </PanelCard>
        <PanelCard title="Informasi Produk">
          <h2 className="mb-4 text-xl font-bold text-brand-900">{data.name}</h2>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-content-muted">Mitra Pengelola</p>
              <p className="mt-1 text-sm font-medium text-brand-900">🏢 {data.seller || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-content-muted">Diposting pada</p>
              <p className="mt-1 text-sm font-medium text-brand-900">📅 {data.created_at || '-'}</p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs text-content-muted">Deskripsi Produk</p>
            <p className="text-sm text-content-main whitespace-pre-wrap">{data.description}</p>
          </div>
        </PanelCard>
      </div>
    </div>
  )
}
