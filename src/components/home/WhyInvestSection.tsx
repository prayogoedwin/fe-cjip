import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function WhyInvestSection() {
  return (
    <section className="px-6 py-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-xl sm:h-[340px] lg:h-[380px]">
            <Image
              src="https://cjip.jatengprov.go.id/storage/settings/gambar/F43a03QEw9olouMBnWHfSyKqcfWoEs-metacGV0YSBqYXdhIHRlbmdhaC5wbmc=-.png"
              alt="Peta Jawa Tengah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionLabel>Mengapa Jawa Tengah?</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.4rem,3vw,2rem)] font-bold text-brand-900">
              Mengapa Berinvestasi Di Jawa Tengah?
            </h2>
            <p className="mb-4 text-[0.95rem] leading-relaxed text-content-muted">
              Jawa Tengah menawarkan iklim investasi yang kondusif dengan pertumbuhan ekonomi yang
              positif, infrastruktur yang terus berkembang, serta biaya tenaga kerja yang kompetitif.
            </p>
            <p className="mb-4 text-[0.95rem] leading-relaxed text-content-muted">
              Didukung masyarakat yang ramah dan etos kerja tinggi, Jawa Tengah menjadi pilihan
              strategis bagi investor yang ingin tumbuh bersama wilayah penuh potensi.
            </p>
            <p className="mb-6 text-[0.95rem] leading-relaxed text-content-muted">
              Tahun 2025, UMK berkisar antara <strong className="text-content-main">Rp 2.170.475</strong>{' '}
              (Banjarnegara) hingga <strong className="text-content-main">Rp 3.454.827</strong> (Kota
              Semarang), memberikan fleksibilitas biaya produksi.
            </p>
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
