'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LOGO_WHITE } from '@/lib/assets'
import { PERUSAHAAN_MIKRO_NAV, PERUSAHAAN_NAV } from '@/lib/perusahaan-nav'

const STORAGE_KEY = 'cjip_perusahaan_sidebar_collapsed'

function NavIcon({ name }: { name: string }) {
  const common = 'h-4 w-4 shrink-0'
  switch (name) {
    case 'home':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
        </svg>
      )
    case 'user':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      )
    case 'grid':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    case 'interest':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      )
    case 'doc':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5" />
        </svg>
      )
    case 'calendar':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      )
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

function isActive(pathname: string, href: string) {
  if (href === '/perusahaan') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition ${collapsed ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PerusahaanSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  const pathname = usePathname()

  useEffect(() => {
    onCloseMobile()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const linkClass = (active: boolean, compact: boolean) =>
    `flex items-center gap-2.5 rounded-lg text-sm transition ${
      compact ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
    } ${
      active
        ? 'bg-brand-50 font-semibold text-brand-500 ring-1 ring-brand-100'
        : 'text-content-muted hover:bg-brand-50 hover:text-brand-900'
    }`

  const aside = (
    <aside
      className={`flex h-full flex-col border-r border-brand-100 bg-white transition-[width] duration-200 ${
        collapsed ? 'w-[4.5rem]' : 'w-64'
      }`}
    >
      <div
        className={`flex border-b border-white/10 bg-brand-900 px-2 ${
          collapsed
            ? 'h-auto flex-col items-center gap-1 py-3'
            : 'h-[68px] items-center justify-between gap-1 px-3'
        }`}
      >
        <Link
          href="/perusahaan"
          className={`flex min-w-0 items-center ${collapsed ? '' : 'gap-2'}`}
          onClick={onCloseMobile}
        >
          <Image
            src={LOGO_WHITE}
            alt="CJIP"
            width={collapsed ? 36 : 120}
            height={collapsed ? 36 : 40}
            className={collapsed ? 'h-8 w-8 object-contain' : 'h-9 w-auto max-w-[120px] object-contain'}
            priority
          />
          {!collapsed ? (
            <span className="text-xs font-medium leading-tight text-white">
              Panel
              <br />
              Perusahaan
            </span>
          ) : null}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          className="hidden shrink-0 rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white md:inline-flex"
          aria-label={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}
          title={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}
        >
          <ChevronIcon collapsed={collapsed} />
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          className="inline-flex shrink-0 rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Tutup menu"
        >
          <ChevronIcon collapsed={false} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {PERUSAHAAN_NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              onClick={onCloseMobile}
              className={linkClass(active, collapsed)}
            >
              <NavIcon name={item.icon} />
              {!collapsed ? item.label : null}
            </Link>
          )
        })}

        {!collapsed ? (
          <div className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-content-muted">
            Mikro
          </div>
        ) : (
          <div className="my-2 border-t border-brand-100" />
        )}
        {PERUSAHAAN_MIKRO_NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              onClick={onCloseMobile}
              className={linkClass(active, collapsed)}
            >
              <NavIcon name={item.icon} />
              {!collapsed ? item.label : null}
            </Link>
          )
        })}
      </nav>

      {!collapsed ? (
        <div className="border-t border-brand-100 p-3">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="block rounded-lg px-3 py-2 text-sm text-content-muted transition hover:bg-brand-50 hover:text-brand-900"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      ) : null}
    </aside>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden shrink-0 md:block">{aside}</div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Tutup menu"
            onClick={onCloseMobile}
          />
          <div className="absolute inset-y-0 left-0 z-50 shadow-xl">{aside}</div>
        </div>
      ) : null}
    </>
  )
}

export function usePerusahaanSidebarState() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === '1')
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {
      // ignore
    }
  }, [collapsed, ready])

  const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), [])
  const openMobile = useCallback(() => {
    setCollapsed(false)
    setMobileOpen(true)
  }, [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return {
    collapsed,
    mobileOpen,
    toggleCollapsed,
    openMobile,
    closeMobile,
  }
}
