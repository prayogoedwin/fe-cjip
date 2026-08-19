'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { perusahaanBff } from '@/lib/api/perusahaan-client'

export function MinatButton({ slug }: { slug: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleClick() {
    setLoading(true)
    setMsg('')
    try {
      await perusahaanBff(`kemitraan/produk/${slug}/minat`, { method: 'POST', body: {} })
      setMsg('Minat terkirim')
      router.refresh()
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Gagal'
      setMsg(raw.length > 40 ? 'Gagal kirim minat' : raw)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1">
      <button
        type="button"
        disabled={loading}
        onClick={() => void handleClick()}
        className="w-full rounded-lg bg-brand-500 px-2 py-2 text-xs font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? '...' : msg || 'Minat Bermitra'}
      </button>
    </div>
  )
}
