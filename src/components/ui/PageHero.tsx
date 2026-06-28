import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  label?: string
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
}

export function PageHero({ label, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <div className="mt-[68px] bg-gradient-to-br from-brand-900 to-brand-500 px-6 py-16 text-center md:py-20">
      {label && <SectionLabel variant="hero">{label}</SectionLabel>}
      <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white">{title}</h1>
      {description && (
        <p className="mx-auto mt-3 max-w-[580px] text-[0.95rem] text-white/80">{description}</p>
      )}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] text-white/65">
          {breadcrumbs.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-50" aria-hidden="true">›</span>}
              {item.href ? (
                <Link href={item.href} className="text-white/75 transition duration-300 hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
