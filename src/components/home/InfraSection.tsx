import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SafeImage } from '@/components/ui/SafeImage'
import { infraItems } from '@/lib/home-data'
import { resolveImageUrl } from '@/lib/images'

interface ApiInfraItem {
  id: number
  nama: string
  detail: string
  icon: string | null
  gambar: string | null
}

interface InfraSectionProps {
  items?: ApiInfraItem[]
}

function isUsableTitle(nama: string | null | undefined): boolean {
  if (!nama?.trim()) return false
  // Seed/placeholder dari factory lokal
  return !/^contoh\b/i.test(nama.trim())
}

function isImageSrc(value: string | null | undefined): boolean {
  if (!value) return false
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('/') ||
    value.includes('/')
  )
}

export function InfraSection({ items }: InfraSectionProps) {
  const list = (items ?? []).map((item, index) => {
    const fallback = infraItems[index]
    return {
      key: String(item.id),
      title: isUsableTitle(item.nama) ? item.nama : (fallback?.title ?? ''),
      description: item.detail || fallback?.description || '',
      icon: item.icon || fallback?.icon || '🏭',
      gambar: item.gambar,
    }
  })

  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader
          label="Infrastruktur"
          title="Infrastruktur Unggulan"
          description="Jawa Tengah didukung infrastruktur modern yang menghubungkan berbagai wilayah strategis demi mendukung kelancaran investasi."
        />
        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-brand-200 bg-white px-6 py-12 text-center text-neutral-400">
            Data infrastruktur kosong
          </p>
        ) : (
        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((item) => {
            const imageSrc = item.gambar || (isImageSrc(item.icon) ? item.icon : null)
            const emoji = !imageSrc ? item.icon || '🏭' : null

            return (
            <div
              key={item.key}
              className="flex h-full gap-4 rounded-xl border border-cjip-border bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,99,36,0.12)]"
            >
              <div
                className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-brand-100 text-2xl"
                aria-hidden="true"
              >
                {imageSrc ? (
                  <SafeImage
                    src={resolveImageUrl(imageSrc)}
                    alt=""
                    fill
                    className="object-contain p-1.5"
                    sizes="48px"
                  />
                ) : (
                  emoji
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                {item.title ? (
                  <h4 className="mb-1 font-semibold text-brand-900">{item.title}</h4>
                ) : null}
                <p className="line-clamp-3 text-[0.85rem] leading-relaxed text-content-muted">
                  {item.description}
                </p>
                <Link
                  href="#"
                  className="mt-auto pt-2 inline-block text-[0.8rem] font-semibold text-brand-500 transition duration-300 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
            )
          })}
        </div>
        )}
      </Container>
    </section>
  )
}
