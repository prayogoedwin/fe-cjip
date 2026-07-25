import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SafeImage } from '@/components/ui/SafeImage'
import { resolveImageUrl } from '@/lib/images'

interface KawasanPreviewItem {
  id: number
  nama: string
  slug: string
  foto: string | null
  deskripsi: string | null
}

interface BeritaPreviewItem {
  id: number
  title: string
  slug: string
  image: string | null
  excerpt: string | null
  created_at: string
}

export function KawasanPreview({ items }: { items?: KawasanPreviewItem[] }) {
  const kawasanPreview = (items ?? []).slice(0, 3).map((item) => ({
    title: item.nama,
    slug: item.slug,
    image: resolveImageUrl(item.foto),
    description: item.deskripsi ?? '',
    badge: 'Industrial Area',
  }))

  return (
    <section className="px-6 py-16">
      <Container>
        <SectionHeader label="Kawasan" title="Kawasan Industri" />
        {kawasanPreview.length === 0 ? (
          <p className="rounded-xl border border-dashed border-cjip-border bg-white px-6 py-12 text-center text-neutral-400">
            Data kawasan industri kosong
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {kawasanPreview.map((item) => (
              <article
                key={item.slug}
                className="overflow-hidden rounded-xl border border-cjip-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,99,36,0.14)]"
              >
                <div className="relative h-[200px]">
                  <SafeImage src={item.image} alt={item.title} fill className="object-cover" sizes="33vw" />
                </div>
                <span className="mx-4 mt-4 inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-[0.68rem] font-bold tracking-widest text-brand-900 uppercase">
                  {item.badge}
                </span>
                <div className="px-4 pt-2 pb-5">
                  <h4 className="mb-2 text-[0.95rem] font-semibold text-brand-900">{item.title}</h4>
                  <p className="line-clamp-3 text-[0.83rem] leading-relaxed text-content-muted">
                    {item.description}
                  </p>
                  <Link
                    href={`/kawasan-industri/${item.slug}`}
                    className="mt-3 inline-block text-[0.8rem] font-semibold text-brand-500 hover:underline"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            href="/kawasan-industri"
            className="inline-block rounded-lg border-2 border-brand-500 px-7 py-2.5 text-[0.85rem] font-bold text-brand-500 transition duration-300 hover:bg-brand-500 hover:text-white"
          >
            Kawasan Industri Lainnya
          </Link>
        </div>
      </Container>
    </section>
  )
}

export function BeritaPreview({ items }: { items?: BeritaPreviewItem[] }) {
  const berita = (items ?? []).slice(0, 6).map((b) => ({
    slug: b.slug,
    judul: b.title,
    tanggal: new Date(b.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    thumbnail: resolveImageUrl(b.image),
    excerpt: b.excerpt ?? '',
  }))

  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader label="Terkini" title="Berita" />
        {berita.length === 0 ? (
          <p className="rounded-xl border border-dashed border-cjip-border bg-white px-6 py-12 text-center text-neutral-400">
            Data berita kosong
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {berita.map((item) => (
              <article
                key={item.slug}
                className="overflow-hidden rounded-xl border border-cjip-border bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(26,99,36,0.12)]"
              >
                <div className="relative h-[180px]">
                  <SafeImage
                    src={item.thumbnail}
                    alt={item.judul}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="mb-1 text-[0.72rem] text-content-muted">{item.tanggal}</p>
                  <h4 className="mb-2 line-clamp-2 text-[0.92rem] font-semibold text-brand-900">
                    {item.judul}
                  </h4>
                  <p className="line-clamp-2 text-[0.8rem] leading-relaxed text-content-muted">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/berita/${item.slug}`}
                    className="mt-3 inline-block text-[0.8rem] font-semibold text-brand-500 hover:underline"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            href="/berita"
            className="inline-block rounded-lg border-2 border-brand-500 px-7 py-2.5 text-[0.85rem] font-bold text-brand-500 transition duration-300 hover:bg-brand-500 hover:text-white"
          >
            Berita Lainnya
          </Link>
        </div>
      </Container>
    </section>
  )
}
