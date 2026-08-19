'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type AuthUser = { id: number; name: string; email: string }

export function AuthNavActions({ onNavigate }: { onNavigate?: () => void }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then(async (res) => {
        if (!res.ok) return null
        const json = (await res.json()) as { success?: boolean; data?: AuthUser }
        return json.success && json.data ? json.data : null
      })
      .then((data) => {
        if (!cancelled) {
          setUser(data)
          setReady(true)
        }
      })
      .catch(() => {
        if (!cancelled) setReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
    onNavigate?.()
    window.location.href = '/'
  }

  if (!ready) {
    return (
      <span className="inline-block min-w-[4.5rem] rounded-md px-4 py-1.5 text-[0.82rem] text-white/50">
        …
      </span>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/perusahaan"
          className="max-w-[120px] truncate rounded-md px-2 py-1.5 text-[0.78rem] font-medium text-white/90 hover:bg-white/10"
          onClick={onNavigate}
          title={user.email}
        >
          {user.name}
        </Link>
        <button
          type="button"
          onClick={() => void handleLogout()}
          className="rounded-md border border-white/25 px-3 py-1.5 text-[0.78rem] font-medium text-white/90 transition hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="rounded-md bg-gold-500 px-4 py-1.5 text-[0.82rem] font-bold text-brand-900 shadow-[0_2px_12px_rgba(245,166,35,0.45)] transition duration-300 hover:bg-amber-400 hover:shadow-[0_4px_16px_rgba(245,166,35,0.55)]"
      onClick={onNavigate}
    >
      Login
    </Link>
  )
}
