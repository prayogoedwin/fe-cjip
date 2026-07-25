import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SafeImage } from '@/components/ui/SafeImage'
import { resolveImageUrl } from '@/lib/images'

const DEFAULT_IMAGE =
  'https://cjip.jatengprov.go.id/storage/settings/gambar/F43a03QEw9olouMBnWHfSyKqcfWoEs-metacGV0YSBqYXdhIHRlbmdhaC5wbmc=-.png'

interface WhyInvestSectionProps {
  opening?: {
    title: string
    desc: string
    image: string | null
  }
}

export function WhyInvestSection({ opening }: WhyInvestSectionProps) {
  const title = opening?.title || 'Mengapa Berinvestasi Di Jawa Tengah?'
  const desc =
    opening?.desc ||
    'Jawa Tengah menawarkan iklim investasi yang kondusif dengan pertumbuhan ekonomi yang positif, infrastruktur yang terus berkembang, serta biaya tenaga kerja yang kompetitif.\n\nDidukung masyarakat yang ramah dan etos kerja tinggi, Jawa Tengah menjadi pilihan strategis bagi investor yang ingin tumbuh bersama wilayah penuh potensi.\n\nTahun 2025, UMK berkisar antara Rp 2.170.475 (Banjarnegara) hingga Rp 3.454.827 (Kota Semarang), memberikan fleksibilitas biaya produksi.'
  const image = resolveImageUrl(opening?.image) || DEFAULT_IMAGE
  const paragraphs = desc.split(/\n\n+/).filter(Boolean)

  return (
    <section className="px-6 py-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-xl sm:h-[340px] lg:h-[380px]">
            <SafeImage
              src={image}
              alt="Peta Jawa Tengah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionLabel>Mengapa Jawa Tengah?</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.4rem,3vw,2rem)] font-bold text-brand-900">{title}</h2>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="mb-4 text-[0.95rem] leading-relaxed text-content-muted">
                {p}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { value: 'Rp 88,44 T', label: 'Realisasi Investasi 2024' },
                { value: '4,95%', label: 'Pertumbuhan Ekonomi' },
                { value: '35', label: 'Kabupaten/Kota' },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="rounded-lg bg-brand-900 px-5 py-2.5 text-[0.82rem] font-semibold text-white"
                >
                  <span className="block text-[1.3rem] font-extrabold">{chip.value}</span>
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
