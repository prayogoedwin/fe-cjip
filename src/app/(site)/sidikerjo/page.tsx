import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'SIDIKERJO',
  'Sistem Informasi Ketenagakerjaan Jawa Tengah — integrasi data ketenagakerjaan terpadu',
)

const SIDIKERJO_CARDS = [
  {
    title: 'Infographis SIDIKERJO',
    href: '/infografis-sidikerjo',
    image: 'https://cjip.jatengprov.go.id/images/infographis_sidikerjo.png',
  },
  {
    title: 'Peta SIDIKERJO',
    href: '/peta-investasi',
    image: 'https://cjip.jatengprov.go.id/images/peta_sidikerjo.png',
  },
] as const

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
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-brand-900">{item.label}</span>
                </div>
              ) : (
                <span key={i} className="text-xl text-brand-300" aria-hidden="true">
                  +
                </span>
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

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {SIDIKERJO_CARDS.map((card) => (
              <Link key={card.title} href={card.href} className="group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-50 shadow-[0_8px_28px_rgba(26,99,36,0.12)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_36px_rgba(26,99,36,0.18)]">
                  <SafeImage
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
                <span className="sr-only">{card.title}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
