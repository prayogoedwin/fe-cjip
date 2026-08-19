'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { KEMITRAAN_SUBNAV } from '@/lib/perusahaan-nav'

export default function KemitraanLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-56">
        <div className="rounded-xl border border-brand-100 bg-white p-2 shadow-sm">
          {KEMITRAAN_SUBNAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition last:mb-0 ${
                  active
                    ? 'bg-brand-50 font-semibold text-brand-500'
                    : 'text-content-muted hover:bg-brand-50'
                }`}
              >
                <span>{item.label}</span>
                {'badge' in item ? (
                  <span className="rounded-full border border-brand-100 px-1.5 text-[10px] text-brand-500">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
