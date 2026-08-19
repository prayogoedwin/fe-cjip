'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOGO_WHITE } from '@/lib/assets'
import { NAV_ITEMS } from '@/lib/nav-items'
import { isExternalUrl } from '@/lib/site-urls'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { AuthNavActions } from '@/components/layout/AuthNavActions'

export function Navbar() {
  const pathname = usePathname()
  const navItems = NAV_ITEMS
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function closeAll() {
    setOpenMenu(null)
    setMobileOpen(false)
  }

  return (
    <nav ref={navRef} className="fixed top-0 right-0 left-0 z-[1000] bg-brand-900 shadow-navbar">
      <div className="mx-auto flex h-[68px] max-w-navbar items-center gap-8 px-6">
        <Link href="/" className="notranslate flex shrink-0 items-center" onClick={closeAll}>
          <Image
            src={LOGO_WHITE}
            alt="Central Java Investment Platform"
            width={160}
            height={44}
            className="h-11 w-auto object-contain"
          />
        </Link>

        <ul
          id="main-nav"
          className={`${
            mobileOpen ? 'flex' : 'hidden'
          } absolute top-[68px] right-0 left-0 z-[999] flex-col gap-1 border-t border-white/10 bg-brand-900 p-4 lg:relative lg:top-auto lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-0.5 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {navItems.map((item) => {
            if (item.children) {
              const isOpen = openMenu === item.label
              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className="flex w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-[0.85rem] font-medium text-white/90 transition duration-300 select-none hover:bg-white/10 hover:text-white lg:w-auto"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <span className="text-[0.6rem] opacity-70" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  {isOpen ? (
                    <div
                      role="menu"
                      className="static mt-1 rounded-lg border-0 bg-white/10 py-1 shadow-none lg:absolute lg:top-[calc(100%+8px)] lg:left-0 lg:z-[200] lg:mt-0 lg:min-w-[200px] lg:border lg:border-cjip-border lg:bg-white lg:py-1.5 lg:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          role="menuitem"
                          className="block px-5 py-2.5 text-[0.85rem] text-white/85 transition duration-300 hover:bg-white/10 hover:text-white lg:text-content-main lg:hover:bg-brand-200 lg:hover:text-brand-900"
                          onClick={closeAll}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>
              )
            }

            const baseClass =
              'flex items-center gap-1 rounded-md px-3 py-2 text-[0.85rem] font-medium whitespace-nowrap transition duration-300'
            const className = item.highlight
              ? `${baseClass} bg-brand-500 px-4 font-bold text-white hover:bg-brand-600`
              : `${baseClass} text-white/90 hover:bg-white/10 hover:text-white`

            if (item.external || isExternalUrl(item.href)) {
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    onClick={closeAll}
                  >
                    {item.label}
                  </a>
                </li>
              )
            }

            return (
              <li key={item.label}>
                <Link href={item.href} className={className} onClick={closeAll}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          <AuthNavActions onNavigate={closeAll} />
        </div>

        <button
          type="button"
          className="flex cursor-pointer flex-col gap-1.5 p-2 lg:hidden"
          aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          onClick={() => {
            setMobileOpen((open) => !open)
            setOpenMenu(null)
          }}
        >
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
        </button>
      </div>
    </nav>
  )
}
