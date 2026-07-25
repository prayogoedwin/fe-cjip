import Image from 'next/image'
import Link from 'next/link'
import { LOGO_WHITE } from '@/lib/assets'
import { NAV_ITEMS } from '@/lib/nav-items'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

/**
 * Mostly server-rendered nav. Only LanguageSwitcher is a client island.
 * Mobile menu + dropdowns use native checkbox/details — no hydration cost.
 * Avoids headers() so pages stay statically generated.
 */
export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-[1000] bg-brand-900 shadow-navbar">
      <div className="mx-auto flex h-[68px] max-w-navbar items-center gap-8 px-6">
        <Link href="/" className="notranslate flex shrink-0 items-center">
          <Image
            src={LOGO_WHITE}
            alt="Central Java Investment Platform"
            width={160}
            height={44}
            className="h-11 w-auto object-contain"
          />
        </Link>

        <input id="nav-toggle" type="checkbox" className="peer/nav sr-only" />

        <ul
          id="main-nav"
          className="absolute top-[68px] right-0 left-0 z-[999] hidden flex-col gap-1 border-t border-white/10 bg-brand-900 p-4 peer-checked/nav:flex lg:relative lg:top-auto lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-0.5 lg:border-0 lg:bg-transparent lg:p-0"
        >
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <li key={item.label} className="relative">
                  <details className="group/nav">
                    <summary className="flex w-full cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-[0.85rem] font-medium text-white/90 transition duration-300 select-none hover:bg-white/10 hover:text-white lg:w-auto [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <span className="text-[0.6rem] opacity-70" aria-hidden="true">
                        ▾
                      </span>
                    </summary>
                    <div className="static mt-1 rounded-lg border-0 bg-white/10 py-1 shadow-none lg:absolute lg:top-[calc(100%+8px)] lg:left-0 lg:z-[200] lg:mt-0 lg:min-w-[200px] lg:border lg:border-cjip-border lg:bg-white lg:py-1.5 lg:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-2.5 text-[0.85rem] text-white/85 transition duration-300 hover:bg-white/10 hover:text-white lg:text-content-main lg:hover:bg-brand-200 lg:hover:text-brand-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                </li>
              )
            }

            const baseClass =
              'flex items-center gap-1 rounded-md px-3 py-2 text-[0.85rem] font-medium whitespace-nowrap transition duration-300'
            const className = item.highlight
              ? `${baseClass} bg-brand-500 px-4 font-bold text-white hover:bg-brand-600`
              : `${baseClass} text-white/90 hover:bg-white/10 hover:text-white`

            return (
              <li key={item.label}>
                <Link href={item.href} className={className}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />

          <Link
            href="/login"
            className="rounded-md bg-gold-500 px-4 py-1.5 text-[0.82rem] font-bold text-brand-900 shadow-[0_2px_12px_rgba(245,166,35,0.45)] transition duration-300 hover:bg-amber-400 hover:shadow-[0_4px_16px_rgba(245,166,35,0.55)]"
          >
            Login
          </Link>
        </div>

        <label
          htmlFor="nav-toggle"
          className="flex cursor-pointer flex-col gap-1.5 p-2 lg:hidden"
          aria-label="Buka menu navigasi"
        >
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-white" />
        </label>
      </div>
    </nav>
  )
}
