'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { CtaBanner } from '@/components/layout/CtaBanner'

const faqNav = [
  { id: 'prosedur', icon: '📋', label: 'Prosedur Investasi' },
  { id: 'lisensi', icon: '📄', label: 'Mendapatkan Lisensi' },
  { id: 'insentif', icon: '🎁', label: 'Insentif' },
  { id: 'tax', icon: '💰', label: 'Tax Holiday' },
  { id: 'privasi', icon: '🔒', label: 'Kebijakan Privasi' },
  { id: 'layanan', icon: '📞', label: 'Layanan Bantuan' },
]

const accordionData: Record<string, { q: string; a: string }[]> = {
  prosedur: [
    { q: 'Bagaimana cara memulai investasi di Jawa Tengah?', a: 'Investor dapat memulai dengan mengakses platform CJIP, memilih proyek yang diminati, dan mengajukan Letter of Intent melalui formulir kepeminatan.' },
    { q: 'Berapa lama proses perizinan investasi?', a: 'Dengan sistem OSS dan layanan DPMPTSP, proses perizinan dapat diselesaikan dalam 1-3 hari kerja untuk investasi yang memenuhi persyaratan.' },
    { q: 'Apakah tersedia pendampingan untuk investor asing?', a: 'Ya, DPMPTSP Jateng menyediakan layanan pendampingan investasi untuk PMA maupun PMDN.' },
  ],
  lisensi: [
    { q: 'Lisensi apa saja yang diperlukan untuk investasi?', a: 'Tergantung sektor, umumnya meliputi NIB, izin lokasi, izin lingkungan, dan izin operasional sesuai KBLI.' },
    { q: 'Di mana mengurus perizinan investasi?', a: 'Perizinan dapat diurus melalui OSS (Online Single Submission) atau kantor DPMPTSP Provinsi Jawa Tengah.' },
  ],
  insentif: [
    { q: 'Insentif apa yang tersedia untuk investor?', a: 'Insentif meliputi tax holiday, tax allowance, kemudahan perizinan, dan insentif daerah sesuai peraturan yang berlaku.' },
    { q: 'Bagaimana cara mengajukan insentif?', a: 'Pengajuan insentif dapat dilakukan melalui formulir permohonan insentif di platform CJIP.' },
  ],
  tax: [
    { q: 'Apa itu Tax Holiday?', a: 'Tax Holiday adalah pembebasan pajak penghasilan badan untuk periode tertentu bagi investor di sektor prioritas.' },
    { q: 'Siapa yang berhak mendapat Tax Holiday?', a: 'Investor di sektor prioritas dengan nilai investasi minimum sesuai ketentuan peraturan perundang-undangan.' },
  ],
}

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={item.q} className="overflow-hidden rounded-xl border border-brand-100 bg-white">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-brand-900"
          >
            {item.q}
            <span className="text-brand-500">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="border-t border-brand-50 px-5 py-4 text-sm leading-relaxed text-neutral-600">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function PanduanContent() {
  const [activeSection, setActiveSection] = useState('prosedur')

  return (
    <>
      <PageHero
        label="Informasi"
        title="Syarat & Ketentuan"
        description="Panduan lengkap prosedur investasi, perizinan, dan layanan bantuan di Jawa Tengah"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="px-6 py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <nav className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-3 text-xs font-bold tracking-widest text-brand-500 uppercase">
                Navigasi
              </p>
              <ul className="space-y-1">
                {faqNav.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveSection(item.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition duration-300 ${
                        activeSection === item.id
                          ? 'bg-brand-500 text-white'
                          : 'text-neutral-700 hover:bg-brand-50'
                      }`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              {['prosedur', 'lisensi', 'insentif', 'tax'].includes(activeSection) && (
                <div>
                  <h2 className="mb-6 text-xl font-bold text-brand-900">
                    {faqNav.find((n) => n.id === activeSection)?.label}
                  </h2>
                  <Accordion items={accordionData[activeSection] ?? []} />
                </div>
              )}

              {activeSection === 'privasi' && (
                <div>
                  <h2 className="mb-6 text-xl font-bold text-brand-900">Kebijakan Privasi</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { title: 'Pengumpulan Data', desc: 'Data yang dikumpulkan meliputi informasi kontak dan profil investasi yang Anda berikan secara sukarela.' },
                      { title: 'Penggunaan Data', desc: 'Data digunakan untuk memproses permohonan investasi dan meningkatkan layanan platform CJIP.' },
                      { title: 'Keamanan Data', desc: 'Kami menerapkan standar keamanan untuk melindungi data pribadi pengguna platform.' },
                      { title: 'Hak Pengguna', desc: 'Pengguna berhak mengakses, memperbarui, atau menghapus data pribadi mereka.' },
                    ].map((card) => (
                      <div key={card.title} className="rounded-xl border border-brand-100 bg-white p-5">
                        <h4 className="mb-2 font-semibold text-brand-900">{card.title}</h4>
                        <p className="text-sm text-neutral-600">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'layanan' && (
                <div>
                  <h2 className="mb-6 text-xl font-bold text-brand-900">Layanan Bantuan</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { title: 'WhatsApp DPMPTSP', value: '+62 811-2949-326', href: 'https://wa.me/628112949326' },
                      { title: 'Email', value: 'cjip.jatengprov@gmail.com', href: 'mailto:cjip.jatengprov@gmail.com' },
                      { title: 'Telepon', value: '(024) 351-5451', href: 'tel:+62243515451' },
                      { title: 'Alamat', value: 'Jl. Mgr Sugiyopranoto No.1, Semarang', href: '#' },
                    ].map((card) => (
                      <a
                        key={card.title}
                        href={card.href}
                        target={card.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="rounded-xl border border-brand-100 bg-white p-5 transition duration-300 hover:border-brand-300"
                      >
                        <h4 className="mb-1 font-semibold text-brand-900">{card.title}</h4>
                        <p className="text-sm text-brand-500">{card.value}</p>
                      </a>
                    ))}
                  </div>
                  <p className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
                    ✅ Layanan konsultasi investasi DPMPTSP Jawa Tengah <strong>GRATIS</strong> untuk
                    seluruh calon investor.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Siap Berinvestasi?"
        description="Ajukan Letter of Intent Anda sekarang dan mulai perjalanan investasi di Jawa Tengah."
        buttonLabel="Ajukan Kepeminatan"
        buttonHref="/kepeminatan"
      />
    </>
  )
}
