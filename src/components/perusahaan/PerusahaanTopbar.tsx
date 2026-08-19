'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type MeUser = {
  id: number
  name: string
  email: string
}

export function PerusahaanTopbar({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const router = useRouter()
  const [user, setUser] = useState<MeUser | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const res = await fetch('/api/auth/me', { headers: { Accept: 'application/json' } })
        if (!res.ok) return
        const json = (await res.json()) as { data?: MeUser }
        if (!cancelled && json.data) setUser(json.data)
      } catch {
        // ignore
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      router.replace('/login')
      router.refresh()
    }
  }

  const initial = (user?.name || user?.email || 'U').charAt(0).toUpperCase()

  return (
    <header className="flex h-[68px] items-center justify-between gap-4 bg-brand-900 px-4 shadow-navbar md:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Buka menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/50">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search"
            className="w-56 rounded-full border border-white/20 bg-white/10 py-2 pr-3 pl-8 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/40 focus:bg-white/15"
          />
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Notifikasi"
        >
          🔔
        </button>

        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white ring-1 ring-white/20"
            title={user?.email || user?.name || 'User'}
          >
            {initial}
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={loggingOut}
            className="rounded-md bg-gold-500 px-3 py-1.5 text-xs font-bold text-brand-900 shadow-[0_2px_12px_rgba(245,166,35,0.45)] transition hover:bg-amber-400 disabled:opacity-60"
          >
            {loggingOut ? '...' : 'Sign out'}
          </button>
        </div>
      </div>
    </header>
  )
}
