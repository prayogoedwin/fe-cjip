import Link from 'next/link'

const QUICK_LINKS = [
  { label: 'Kepeminatan', href: '/kepeminatan' },
  { label: 'Kemitraan', href: '/product-all' },
  { label: 'Permohonan Insentif', href: '/login?rdr=sinida' },
  { label: 'Sidikerjo', href: '/sidikerjo' },
  { label: 'Lapor Mikro', href: '/lapor-mikro' },
]

interface QuickLinksProps {
  variant?: 'bar' | 'overlay'
}

const linkBaseClass =
  'flex h-auto min-h-[48px] items-center justify-center rounded-full border-2 border-white/40 px-3 py-3 text-center text-[0.72rem] leading-[1.35] font-semibold tracking-wide text-white transition duration-300 hover:border-white/80 hover:bg-white/15 sm:min-h-0 sm:px-[1.6rem] sm:py-2.5 sm:text-[0.88rem] sm:leading-normal sm:whitespace-nowrap'

export function QuickLinks({ variant = 'bar' }: QuickLinksProps) {
  const isOverlay = variant === 'overlay'

  return (
    <div
      className={
        isOverlay
          ? 'grid grid-cols-2 gap-2 px-0 py-0 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:px-8 sm:py-3'
          : 'grid grid-cols-2 gap-2 bg-brand-900 px-3 py-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:px-8 sm:py-4'
      }
    >
      {QUICK_LINKS.map((link, index) => (
        <Link
          key={link.label}
          href={link.href}
          className={`${linkBaseClass} ${
            index === QUICK_LINKS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
          }`}
        >
          <span className="block sm:inline">{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
