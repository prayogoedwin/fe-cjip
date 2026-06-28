import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { mockBerita } from '@/lib/mock-data'

const kawasanPreview = [
  {
    title: 'Kawasan Industri Wijayakusuma',
    image: 'https://images.unsplash.com/photo-1565793979894-5e7d3ea92e72?w=600&q=80',
    description:
      'BUMN pengembang kawasan industri terbaik dengan 250 ha lahan siap bangun, lokasi strategis dekat tol, pelabuhan, dan bandara di Kota Semarang.',
  },
  {
    title: 'Jatengland Industrial Park Sayung',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    description:
      'Pengembang dan pengelola kawasan industri Jatengland Industrial Park Sayung (JIPS), anak perusahaan Mugan Group.',
  },
  {
    title: 'Grand Batang City',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
    description:
      'Kawasan Industri Terpadu Batang, konsorsium antara PT PP, PT KIW, PT Perkebunan Nusantara IX, dan Perumda Aneka Usaha Batang.',
  },
]

export function KawasanPreview() {
  return (
    <section className="px-6 py-16">
      <Container>
        <SectionHeader label="Kawasan" title="Kawasan Industri" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {kawasanPreview.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-xl border border-cjip-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,99,36,0.14)]"
            >
              <div className="relative h-[200px]">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="33vw" />
              </div>
              <span className="mx-4 mt-4 inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-[0.68rem] font-bold tracking-widest text-brand-900 uppercase">
                Industrial Area
              </span>
              <div className="px-4 pt-2 pb-5">
                <h4 className="mb-2 text-[0.95rem] font-semibold text-brand-900">{item.title}</h4>
                <p className="line-clamp-3 text-[0.83rem] leading-relaxed text-content-muted">
                  {item.description}
                </p>
                <Link
                  href="/kawasan-industri"
                  className="mt-3 inline-block text-[0.8rem] font-semibold text-brand-500 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>
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

export function BeritaPreview() {
  const berita = [
    {
      slug: 'jateng-perluas-kerja-sama-investasi',
      judul: 'Jateng Perluas Kerja Sama Investasi dengan Tiongkok, Fokus pada Energi Terbarukan',
      tanggal: '24 May 2026',
      thumbnail:
        'https://cjip.jatengprov.go.id/storage/berita/2026/01KTB3PYF7T2G7QYH3JGZ6ZCRP.jpg',
      excerpt:
        'Gubernur Jawa Tengah Ahmad Luthfi terus mendorong promosi potensi investasi daerah kepada investor domestik dan mancanegara.',
    },
    ...mockBerita.slice(1).map((b) => ({
      slug: b.slug,
      judul: b.judul,
      tanggal: b.tanggal,
      thumbnail: b.thumbnail.startsWith('http')
        ? b.thumbnail
        : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
      excerpt: b.excerpt,
    })),
  ]

  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader label="Terkini" title="Berita" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {berita.slice(0, 6).map((item) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-xl border border-cjip-border bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(26,99,36,0.12)]"
            >
              <div className="relative h-[185px]">
                <Image
                  src={item.thumbnail}
                  alt={item.judul}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <div className="px-4 pt-4 pb-5">
                <p className="mb-1 text-[0.75rem] font-semibold text-brand-500">{item.tanggal}</p>
                <h4 className="mb-2 line-clamp-2 text-[0.9rem] leading-snug font-semibold text-content-main">
                  {item.judul}
                </h4>
                <p className="line-clamp-2 text-[0.82rem] text-content-muted">{item.excerpt}</p>
                <Link
                  href="/berita"
                  className="mt-3 inline-block text-[0.8rem] font-semibold text-brand-500 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>
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
