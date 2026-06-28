import Image from 'next/image'
import Link from 'next/link'
import { LOGO_WHITE } from '@/lib/assets'

export function Footer() {
  return (
    <footer className="bg-brand-900 px-6 pt-12 pb-6 text-white/80">
      <div className="mx-auto grid max-w-container gap-10 border-b border-white/10 pb-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="mb-4">
            <Image
              src={LOGO_WHITE}
              alt="Logo CJIP Jawa Tengah"
              width={637}
              height={839}
              className="h-11 w-auto object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-white/65">
            Central Java Investment Platform — Digitizing the promotion of investment opportunities
            in Central Java.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li className="flex gap-2">
              <span aria-hidden="true">📍</span>
              Jl. Mgr Sugiyopranoto No.1, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang,
              Jawa Tengah
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">✉️</span>
              cjip.jatengprov@gmail.com
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">📱</span>
              +62 811-2949-326 (WhatsApp Only)
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: 'https://www.youtube.com/channel/UCjAtDv9NUaCo9jNytDZm8hw', label: 'YouTube' },
              { href: 'https://www.facebook.com/dpmptspjateng/', label: 'Facebook' },
              { href: 'https://www.instagram.com/centraljavainvest/', label: 'Instagram' },
              { href: 'https://twitter.com/PPID_PTSPJateng', label: 'Twitter' },
              { href: 'mailto:cjip.jatengprov@gmail.com', label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs transition duration-300 hover:bg-white/10"
              >
                {social.label[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">Tautan</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://web.dpmptsp.jatengprov.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/65 transition duration-300 hover:text-white"
              >
                Website DPMPTSP
              </a>
            </li>
            <li>
              <a
                href="https://dpmptsp.jatengprov.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/65 transition duration-300 hover:text-white"
              >
                Portal DPMPTSP
              </a>
            </li>
            <li>
              <a
                href="https://perizinan.jatengprov.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/65 transition duration-300 hover:text-white"
              >
                Siap Jateng
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">Navigasi</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-white/65 transition duration-300 hover:text-white">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/profil-jateng"
                className="text-white/65 transition duration-300 hover:text-white"
              >
                Profil Jateng
              </Link>
            </li>
            <li>
              <Link
                href="/kawasan-industri"
                className="text-white/65 transition duration-300 hover:text-white"
              >
                Kawasan Industri
              </Link>
            </li>
            <li>
              <Link href="/berita" className="text-white/65 transition duration-300 hover:text-white">
                Berita
              </Link>
            </li>
            <li>
              <Link
                href="/peluang-investasi"
                className="text-white/65 transition duration-300 hover:text-white"
              >
                Peluang Investasi
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-container text-center text-[0.78rem] text-white/45">
        © Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Provinsi Jawa Tengah
      </p>
    </footer>
  )
}
