import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'SIDIKERJO',
  'Sistem Informasi Ketenagakerjaan Jawa Tengah — integrasi data ketenagakerjaan terpadu',
)

export default function SidikerjoPage() {
  return (
    <>
      <div className="mt-[68px] bg-gradient-to-br from-brand-900 to-brand-600 px-6 py-16 text-center text-white">
        <p className="mb-2 text-sm font-bold tracking-widest text-amber-400 uppercase">SIDIKERJO</p>
        <h1 className="text-3xl font-bold md:text-4xl">Sistem Informasi Ketenagakerjaan</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 md:text-base">
          Platform terintegrasi data ketenagakerjaan Jawa Tengah untuk mendukung investasi dan
          pengembangan SDM
        </p>
      </div>

      <div className="border-b border-brand-100 bg-white px-6 py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: '🏥', label: 'SIRUSA' },
              { icon: '➕', label: '' },
              { icon: '🎓', label: 'Dapodik' },
              { icon: '➕', label: '' },
              { icon: '💼', label: 'Ayo Kerjo' },
            ].map((item, i) =>
              item.label ? (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-brand-100 px-5 py-3"
                >
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <span className="font-semibold text-brand-900">{item.label}</span>
                </div>
              ) : (
                <span key={i} className="text-xl text-brand-300" aria-hidden="true">+</span>
              ),
            )}
          </div>
        </Container>
      </div>

      <section className="px-6 py-12">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-brand-900">Tentang SIDIKERJO</h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              SIDIKERJO (Sistem Informasi Ketenagakerjaan Jawa Tengah) mengintegrasikan data dari
              berbagai sumber untuk memberikan gambaran komprehensif tentang kondisi ketenagakerjaan
              di Jawa Tengah, mendukung keputusan investasi dan kebijakan pembangunan SDM.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '36,9 Jt', label: 'Total Penduduk' },
              { value: '18,2 Jt', label: 'Angkatan Kerja' },
              { value: '1,2 Jt', label: 'Pencari Kerja' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-brand-100 bg-brand-50 p-5">
                <p className="text-2xl font-bold text-brand-500">{stat.value}</p>
                <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: '📊', title: 'Data Real-time', desc: 'Akses data ketenagakerjaan terkini dari berbagai sumber terintegrasi.' },
              { icon: '🗺️', title: 'Peta Ketenagakerjaan', desc: 'Visualisasi sebaran tenaga kerja dan peluang kerja per wilayah.' },
              { icon: '📈', title: 'Analisis Tren', desc: 'Analisis tren pasar kerja untuk mendukung perencanaan investasi.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-brand-100 bg-white p-6 text-center shadow-sm">
                <div className="mb-3 text-4xl" aria-hidden="true">{feature.icon}</div>
                <h4 className="mb-2 font-semibold text-brand-900">{feature.title}</h4>
                <p className="text-sm text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: 'Infografis Ketenagakerjaan', href: '#', emoji: '📊' },
              { title: 'Peta Sebaran Tenaga Kerja', href: '#', emoji: '🗺️' },
            ].map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="flex items-center gap-5 rounded-xl border border-brand-100 bg-white p-6 shadow-sm transition duration-300 hover:border-brand-300"
              >
                <span className="text-5xl" aria-hidden="true">{tile.emoji}</span>
                <div>
                  <h4 className="font-semibold text-brand-900">{tile.title}</h4>
                  <p className="text-sm text-brand-500">Lihat selengkapnya →</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
