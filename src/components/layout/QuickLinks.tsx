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

export function QuickLinks({ variant = 'bar' }: QuickLinksProps) {
  const isOverlay = variant === 'overlay'

  return (
    <div
      className={
        isOverlay
          ? 'flex flex-wrap items-center justify-center gap-3 px-4 py-3 sm:px-8'
          : 'flex flex-wrap items-center justify-center gap-3 bg-brand-900 px-4 py-4 sm:px-8'
      }
    >
      {QUICK_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="rounded-full border-2 border-white/40 px-[1.6rem] py-2.5 text-[0.88rem] font-semibold tracking-wide whitespace-nowrap text-white transition duration-300 hover:border-white/80 hover:bg-white/15"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
