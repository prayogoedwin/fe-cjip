import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Lapor Mikro',
  'Sistem Informasi Monitoring dan Evaluasi Kinerja Investasi Mikro Jawa Tengah',
)

export default function LaporMikroPage() {
  return (
    <>
      <div className="mt-[68px] bg-gradient-to-br from-brand-900 to-brand-600 px-6 py-16 text-center text-white">
        <p className="mb-2 text-sm font-bold tracking-widest text-amber-400 uppercase">SIMIKE</p>
        <h1 className="text-3xl font-bold md:text-4xl">Lapor Mikro</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80">
          Sistem Informasi Monitoring dan Evaluasi Kinerja Investasi Mikro
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {['Transparan', 'Akuntabel', 'Partisipatif'].map((badge) => (
            <span key={badge} className="rounded-full border border-white/30 px-3 py-1 text-xs">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <section className="px-6 py-12">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-brand-900">Tentang Program</h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Lapor Mikro merupakan program pemantauan dan evaluasi investasi mikro di Jawa Tengah.
              Program ini memungkinkan pelaku usaha mikro melaporkan perkembangan investasi mereka
              secara berkala untuk mendukung kebijakan pembangunan ekonomi daerah.
            </p>
          </div>

          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📝', title: 'Pelaporan Mudah', desc: 'Formulir pelaporan online yang sederhana dan dapat diakses kapan saja.' },
              { icon: '📊', title: 'Monitoring Real-time', desc: 'Pantau perkembangan investasi mikro secara real-time di seluruh Jateng.' },
              { icon: '🎯', title: 'Evaluasi Kinerja', desc: 'Evaluasi kinerja investasi mikro untuk perbaikan kebijakan.' },
              { icon: '🤝', title: 'Dukungan Pemerintah', desc: 'Akses ke program bantuan dan insentif pemerintah daerah.' },
              { icon: '📱', title: 'Akses Mobile', desc: 'Laporkan dari mana saja melalui perangkat mobile.' },
              { icon: '🔒', title: 'Data Aman', desc: 'Keamanan data terjamin sesuai standar pemerintah.' },
            ].map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                <div className="mb-3 text-3xl" aria-hidden="true">{benefit.icon}</div>
                <h4 className="mb-2 font-semibold text-brand-900">{benefit.title}</h4>
                <p className="text-sm text-neutral-600">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-brand-900">Alur Pelaporan</h2>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { step: 1, title: 'Login', desc: 'Masuk ke akun CJIP Anda' },
                { step: 2, title: 'Isi Formulir', desc: 'Lengkapi data pelaporan mikro' },
                { step: 3, title: 'Kirim Laporan', desc: 'Submit laporan periode berjalan' },
                { step: 4, title: 'Verifikasi', desc: 'Tim verifikasi memproses laporan' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <h4 className="mb-1 font-semibold text-brand-900">{item.title}</h4>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-xl bg-brand-50 p-8 text-center">
            <h3 className="mb-2 text-xl font-bold text-brand-900">Mulai Melaporkan</h3>
            <p className="mb-5 text-sm text-neutral-600">
              Login ke akun CJIP Anda untuk mengakses fitur pelaporan mikro
            </p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
            >
              Login Sekarang
            </Link>
          </div>

          <div className="rounded-xl border border-brand-100 bg-white p-8 text-center">
            <h3 className="mb-2 font-semibold text-brand-900">Rekapitulasi Laporan</h3>
            <p className="mx-auto mb-5 max-w-lg text-sm text-neutral-600">
              Grafik rekapitulasi SIMIKE hanya tersedia setelah login sebagai perusahaan terdaftar.
            </p>
            <Link
              href="/login?rdr=perusahaan"
              className="inline-block rounded-lg border border-brand-500 px-6 py-2.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
            >
              Login untuk Melihat Rekap
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
