import Image from 'next/image'
import Link from 'next/link'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PartnersCarousel } from '@/components/layout/PartnersCarousel'
import { fetchFooter } from '@/lib/api'
import { LOGO_WHITE } from '@/lib/assets'

type IconName = 'pin' | 'mail' | 'phone' | 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'link'

function FooterIcon({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) {
  const common = `${className} shrink-0`
  switch (name) {
    case 'pin':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      )
    case 'mail':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      )
    case 'phone':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M7 3h4.5A1.5 1.5 0 0 1 13 4.5v15A1.5 1.5 0 0 1 11.5 21H7A1.5 1.5 0 0 1 5.5 19.5v-15A1.5 1.5 0 0 1 7 3Z" />
          <path d="M8.5 18.5h2" strokeLinecap="round" />
        </svg>
      )
    case 'youtube':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.6V8.8l6.2 3.4-6.2 3.4Z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.2-1.3H17V3h-2.2C12.3 3 11 4.4 11 6.2v2.3H9v2.7h2V21h3.2v-9.8h2.3l.5-2.7h-2.8Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14.2 10.4 22 2h-1.9l-6.7 7.3L8 2H2.2l8.2 11.3L2.2 22H4l7.4-8.1L16.1 22H22l-7.8-11.6Zm-1.3 1.4-.8-1.1L5.1 3.3h2.8l5.2 7.1.8 1.1 6.9 9.3h-2.8l-5.5-7.5Z" />
        </svg>
      )
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M8 12h8M12 8l4 4-4 4" />
        </svg>
      )
  }
}

function socialIcon(label: string, href: string): IconName {
  const haystack = `${label} ${href}`.toLowerCase()
  if (haystack.includes('youtube') || haystack.includes('youtu.be')) return 'youtube'
  if (haystack.includes('facebook')) return 'facebook'
  if (haystack.includes('instagram')) return 'instagram'
  if (haystack.includes('twitter') || haystack.includes('x.com')) return 'twitter'
  if (haystack.includes('mailto') || haystack.includes('email')) return 'mail'
  return 'link'
}

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
              <li className="flex items-start gap-2">
                <FooterIcon name="pin" className="mt-0.5 h-4 w-4 text-white/80" />
                <span>{alamat}</span>
              </li>
              <li className="flex items-start gap-2">
                <FooterIcon name="mail" className="mt-0.5 h-4 w-4 text-white/80" />
                <a href={`mailto:${email}`} className="transition duration-300 hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FooterIcon name="phone" className="mt-0.5 h-4 w-4 text-white/80" />
                <span>{contact} (WhatsApp Only)</span>
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
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/90 transition duration-300 hover:bg-white/10 hover:text-white"
                >
                  <FooterIcon name={socialIcon(social.label, social.href)} className="h-3.5 w-3.5" />
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
