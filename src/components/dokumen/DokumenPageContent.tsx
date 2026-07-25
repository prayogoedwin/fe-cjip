import { Suspense } from 'react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { DokumenCard } from '@/components/dokumen/DokumenCard'
import { DokumenSearch } from '@/components/dokumen/DokumenSearch'
import { DokumenPagination } from '@/components/dokumen/DokumenPagination'
import { fetchDokumenList } from '@/lib/api'

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export async function DokumenPageContent({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params.q?.trim() || undefined
  const page = Math.max(1, Number(params.page) || 1)

  const { data, meta } = await fetchDokumenList({ q, page, perPage: 9 })
  const total = meta?.total ?? data.length
  const lastPage = meta?.last_page ?? 1
  const currentPage = meta?.current_page ?? page

  return (
    <>
      <PageHero
        label="Informasi"
        title="Publikasi & Dokumen"
        description="Informasi, panduan, dan video terbaru."
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Publikasi & Dokumen' }]}
      />

      <section className="px-6 py-12">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-brand-900">Publikasi & Dokumen</h2>
              <p className="mt-1 text-sm text-neutral-500">Informasi, panduan, dan video terbaru.</p>
            </div>
            <Suspense fallback={null}>
              <DokumenSearch initialQuery={q ?? ''} />
            </Suspense>
          </div>

          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-200 bg-white px-6 py-16 text-center">
              <p className="text-lg font-medium text-brand-900">Belum ada publikasi ditemukan</p>
              <p className="mt-1 text-sm text-neutral-500">
                {q ? 'Coba kata kunci lain.' : 'Silakan cek kembali nanti.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.map((item) => (
                <DokumenCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <Suspense fallback={null}>
            <DokumenPagination
              currentPage={currentPage}
              totalPages={lastPage}
              resultText={`Menampilkan ${data.length} dari ${total} publikasi`}
            />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
