'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from '@/types'

interface NavbarLink extends NavItem {
  highlight?: boolean
}

const NAV_ITEMS: NavbarLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Jateng', href: '/profil-jateng' },
  {
    label: 'Proyek Investasi',
    href: '#',
    children: [
      { label: 'Kesiapan Proyek', href: '/peluang-investasi' },
      { label: 'Sektor', href: '/sektor' },
    ],
  },
  { label: 'Kawasan Industri', href: '/kawasan-industri' },
  {
    label: 'Informasi',
    href: '#',
    children: [
      { label: 'Berita', href: '/berita' },
      { label: 'FAQ', href: '/panduan-investasi' },
      { label: 'Publikasi & Dokumen', href: '#' },
    ],
  },
  { label: 'Peta', href: '/peta-investasi' },
  { label: 'Lahan', href: '/lahan-siap-pakai' },
  { label: 'CJIBF', href: '#', highlight: true },
]

const LANGUAGES = [
  { code: 'ID', label: 'Indonesia', flag: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/ID.svg' },
  { code: 'EN', label: 'English', flag: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg' },
  { code: 'CN', label: '中文', flag: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg' },
] as const

import { LOGO_WHITE } from '@/lib/assets'

function NavbarBrand() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src={LOGO_WHITE}
        alt="Central Java Investment Platform"
        width={637}
        height={839}
        className="h-11 w-auto object-contain"
        priority
      />
    </Link>
  )
}

interface NavDropdownProps {
  item: NavbarLink
  dropdownId: string
  isOpen: boolean
  isMobile: boolean
  isActive: boolean
  onToggle: (id: string) => void
}

function NavDropdown({ item, dropdownId, isOpen, isMobile, isActive, onToggle }: NavDropdownProps) {
  return (
    <li className="relative">
      <button
        type="button"
        className={`flex w-full items-center gap-1 rounded-md px-3 py-2 text-[0.85rem] font-medium text-white/90 transition duration-300 select-none hover:bg-white/10 hover:text-white lg:w-auto ${
          isActive ? 'bg-white/10 text-white' : ''
        }`}
        onClick={() => onToggle(dropdownId)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <span className="text-[0.6rem] opacity-70" aria-hidden="true">
          ▾
        </span>
      </button>
      <div
        className={`transition duration-300 ${
          isOpen ? 'block opacity-100' : 'hidden opacity-0'
        } ${
          isMobile
            ? 'static mt-1 rounded-lg border-0 bg-white/10 py-1 shadow-none'
            : 'absolute top-[calc(100%+8px)] left-0 z-[200] min-w-[200px] rounded-lg border border-cjip-border bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
        }`}
      >
        {item.children?.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            className={`block px-5 py-2.5 text-[0.85rem] transition duration-300 ${
              isMobile
                ? 'text-white/85 hover:bg-white/10 hover:text-white'
                : 'text-content-main hover:bg-brand-200 hover:text-brand-900'
            }`}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </li>
  )
}

interface NavLinkProps {
  item: NavbarLink
  isActive: boolean
}

function NavLinkItem({ item, isActive }: NavLinkProps) {
  const baseClass =
    'flex items-center gap-1 rounded-md px-3 py-2 text-[0.85rem] font-medium whitespace-nowrap transition duration-300'
  const normalClass = `${baseClass} text-white/90 hover:bg-white/10 hover:text-white ${
    isActive ? 'bg-white/10 text-white' : ''
  }`
  const highlightClass = `${baseClass} bg-brand-500 px-4 font-bold text-white hover:bg-brand-600`

  return (
    <li>
      <Link href={item.href} className={item.highlight ? highlightClass : normalClass}>
        {item.label}
      </Link>
    </li>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  function toggleDropdown(id: string) {
    setOpenDropdown((current) => (current === id ? null : id))
  }

  function isLinkActive(href: string, children?: NavItem[]): boolean {
    if (href !== '#' && pathname === href) return true
    return children?.some((child) => child.href !== '#' && pathname === child.href) ?? false
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 right-0 left-0 z-[1000] bg-brand-900 shadow-navbar"
    >
      <div className="mx-auto flex h-[68px] max-w-navbar items-center gap-8 px-6">
        <NavbarBrand />

        <ul
          id="main-nav"
          className={`${
            mobileOpen
              ? 'absolute top-[68px] right-0 left-0 z-[999] flex flex-col gap-1 border-t border-white/10 bg-brand-900 p-4'
              : 'hidden'
          } lg:relative lg:top-auto lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-0.5 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {NAV_ITEMS.map((item, index) => {
            const dropdownId = `drop-${index}`
            const active = isLinkActive(item.href, item.children)

            if (item.children) {
              return (
                <NavDropdown
                  key={item.label}
                  item={item}
                  dropdownId={dropdownId}
                  isOpen={openDropdown === dropdownId}
                  isMobile={mobileOpen}
                  isActive={active}
                  onToggle={toggleDropdown}
                />
              )
            }

            return <NavLinkItem key={item.label} item={item} isActive={active} />
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 rounded-md border border-white/20 px-2.5 py-1.5 text-[0.8rem] text-white/80 transition duration-300 hover:bg-white/10"
              onClick={() => toggleDropdown('drop-lang')}
              aria-expanded={openDropdown === 'drop-lang'}
              aria-haspopup="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LANGUAGES[0].flag}
                alt="Bendera Indonesia"
                className="h-3 w-[18px] rounded-sm object-cover"
              />
              ID ▾
            </button>
            <div
              className={`transition duration-300 ${
                openDropdown === 'drop-lang' ? 'block opacity-100' : 'hidden opacity-0'
              } absolute top-[calc(100%+6px)] right-0 z-[200] min-w-[170px] rounded-lg border border-cjip-border bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]`}
            >
              {LANGUAGES.map((lang) => (
                <a
                  key={lang.code}
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-[0.82rem] text-content-main transition duration-300 hover:bg-brand-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lang.flag}
                    alt={`Bendera ${lang.label}`}
                    className="h-3 w-[18px] rounded-sm object-cover"
                  />
                  {lang.label}
                </a>
              ))}
            </div>
          </div>

          <Link
            href="/login"
            className="rounded-md border border-white/35 bg-white/[0.08] px-4 py-1.5 text-[0.82rem] text-white transition duration-300 hover:bg-white/[0.18]"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          id="hamburger-btn"
          className="flex cursor-pointer flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        >
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
        </button>
      </div>
    </nav>
  )
}
