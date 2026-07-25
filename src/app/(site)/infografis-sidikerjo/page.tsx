import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { InfografisSidikerjoContent } from '@/components/sidikerjo/InfografisSidikerjoContent'
import { fetchInfografisSidikerjo } from '@/lib/api'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Infografis SIDIKERJO',
  'Infografis data ketenagakerjaan Jawa Tengah — perusahaan, tenaga kerja, potensi kelulusan, dan BKK',
)

export default async function InfografisSidikerjoPage() {
  const res = await fetchInfografisSidikerjo()
  const data = res?.data ?? null

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-br from-brand-900 to-brand-600 px-6 py-12 text-center text-white">
        <p className="mb-2 text-sm font-bold tracking-widest text-amber-400 uppercase">SIDIKERJO</p>
        <h1 className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl">
          INFOGRAFIS SIDIKERJO
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80">
          Visualisasi data ketenagakerjaan Jawa Tengah dari sumber terintegrasi
        </p>
        <Link
          href="/sidikerjo"
          className="mt-5 inline-block text-sm font-medium text-white/90 underline-offset-4 hover:underline"
        >
          ← Kembali ke SIDIKERJO
        </Link>
      </div>

      <section className="px-6 py-10">
        <Container>
          {data ? (
            <InfografisSidikerjoContent initial={data} />
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
              <p className="font-semibold text-brand-900">Data infografis belum tersedia</p>
              <p className="mt-2 text-sm text-neutral-500">
                Silakan coba lagi nanti atau hubungi administrator.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
