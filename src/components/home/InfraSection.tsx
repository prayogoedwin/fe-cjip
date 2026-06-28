import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { infraItems } from '@/lib/home-data'

export function InfraSection() {
  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader
          label="Infrastruktur"
          title="Infrastruktur Unggulan"
          description="Jawa Tengah didukung infrastruktur modern yang menghubungkan berbagai wilayah strategis demi mendukung kelancaran investasi."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {infraItems.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-cjip-border bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,99,36,0.12)]"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-100 text-2xl"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-brand-900">{item.title}</h4>
                <p className="text-[0.85rem] leading-relaxed text-content-muted">{item.description}</p>
                <Link
                  href="#"
                  className="mt-2 inline-block text-[0.8rem] font-semibold text-brand-500 transition duration-300 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
