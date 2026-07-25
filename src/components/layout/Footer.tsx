import Image from 'next/image'
import Link from 'next/link'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PartnersCarousel } from '@/components/layout/PartnersCarousel'
import { fetchFooter } from '@/lib/api'
import { LOGO_WHITE } from '@/lib/assets'

const DEFAULT_SOCIALS = [
  { href: 'https://www.youtube.com/channel/UCjAtDv9NUaCo9jNytDZm8hw', label: 'YouTube' },
  { href: 'https://www.facebook.com/dpmptspjateng/', label: 'Facebook' },
  { href: 'https://www.instagram.com/centraljavainvest/', label: 'Instagram' },
  { href: 'https://twitter.com/PPID_PTSPJateng', label: 'Twitter' },
]

const DEFAULT_LINKS = [
  { name: 'Website DPMPTSP', url: 'https://web.dpmptsp.jatengprov.go.id/' },
  { name: 'Portal DPMPTSP', url: 'https://dpmptsp.jatengprov.go.id/' },
  { name: 'Siap Jateng', url: 'https://perizinan.jatengprov.go.id/' },
]

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil-jateng', label: 'Profil Jateng' },
  { href: '/kawasan-industri', label: 'Kawasan Industri' },
  { href: '/berita', label: 'Berita' },
  { href: '/peluang-investasi', label: 'Peluang Investasi' },
]

export async function Footer() {
  const footerRes = await fetchFooter()
  const data = footerRes?.data

  const alamat =
    data?.alamat ||
    'Jl. Mgr Sugiyopranoto No.1, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah'
  const email = data?.email || 'cjip.jatengprov@gmail.com'
  const contact = data?.contact || '+62 811-2949-326'
  const copyright =
    data?.copyright ||
    'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Provinsi Jawa Tengah'
  const links = data?.links?.length ? data.links : DEFAULT_LINKS
  const socials =
    data?.medsos?.length
      ? data.medsos.map((m) => ({
          href: m.url || m.href || '#',
          label: m.name || m.label || 'Social',
        }))
      : [...DEFAULT_SOCIALS, { href: `mailto:${email}`, label: 'Email' }]

  const cta = data?.cta

  return (
    <>
      <PartnersCarousel partners={data?.partners} />
      <CtaBanner
        title={cta?.title}
        description={cta?.description}
        buttonLabel={cta?.button_label}
        buttonHref={cta?.button_href}
      />

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
                {alamat}
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">✉️</span>
                <a href={`mailto:${email}`} className="transition duration-300 hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">📱</span>
                {contact} (WhatsApp Only)
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={`${social.label}-${social.href}`}
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
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/65 transition duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">Navigasi</h5>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/65 transition duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-container text-center text-[0.78rem] text-white/45">
          © {new Date().getFullYear()} {copyright}
        </p>
      </footer>
    </>
  )
}
