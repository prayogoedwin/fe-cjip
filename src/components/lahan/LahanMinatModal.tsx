'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { submitLahanMinat } from '@/lib/api'
import { ApiError } from '@/lib/api/client'
import type { LahanItem } from '@/lib/lahan-data'

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'

interface LahanMinatModalProps {
  lahan: LahanItem
  open: boolean
  onClose: () => void
}

export function LahanMinatModal({ lahan, open, onClose }: LahanMinatModalProps) {
  const [nama, setNama] = useState('')
  const [noWa, setNoWa] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  function handleClose() {
    setNama('')
    setNoWa('')
    setTurnstileToken(null)
    setLoading(false)
    setSuccess(false)
    setError('')
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const namaTrim = nama.trim()
    const waNormalized = noWa.replace(/[^\d+]/g, '').replace(/^\+?62/, '0')

    if (!namaTrim || !waNormalized) {
      setError('Nama dan nomor WhatsApp wajib diisi.')
      return
    }
    if (namaTrim.length < 3) {
      setError('Nama minimal 3 karakter.')
      return
    }
    if (!/^(08|628|\+628)[0-9]{8,13}$/.test(waNormalized)) {
      setError('Format nomor WhatsApp tidak valid. Gunakan 08xxxxxxxxxx.')
      return
    }
    if (!turnstileToken) {
      setError('Silakan selesaikan verifikasi terlebih dahulu.')
      return
    }

    setLoading(true)
    try {
      await submitLahanMinat(lahan.slug, {
        nama: namaTrim,
        no_wa: waNormalized,
        turnstile_token: turnstileToken,
      })
      setSuccess(true)
    } catch (err) {
      if (err instanceof ApiError && err.body?.errors) {
        const messages = Object.values(err.body.errors).flat()
        setError(messages.join(' ') || err.message)
      } else {
        setError(err instanceof Error ? err.message : 'Gagal mengirim minat. Coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Tutup modal"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 rounded-full bg-brand-50 p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Tutup"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!success ? (
          <div className="p-8 pt-12">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-black tracking-tight text-brand-900">Form Minat</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Sampaikan minat investasi Anda pada lahan ini.
              </p>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
              <div>
                <label className="mb-1 ml-1 block text-xs font-bold text-brand-900 uppercase">
                  Nama Lengkap / Instansi
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: PT. Maju Bersama atau Budi Santoso"
                  className="w-full rounded-2xl border-none bg-brand-50 px-5 py-4 font-semibold text-brand-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="mb-1 ml-1 block text-xs font-bold text-brand-900 uppercase">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  value={noWa}
                  onChange={(e) => setNoWa(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full rounded-2xl border-none bg-brand-50 px-5 py-4 font-semibold text-brand-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="rounded-3xl border border-brand-100 bg-brand-50 p-4">
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  options={{ theme: 'light', size: 'normal', appearance: 'always' }}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              </div>

              {error ? <p className="text-center text-xs font-bold text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={!turnstileToken || loading}
                className="flex w-full items-center justify-center gap-3 rounded-[2rem] bg-brand-900 py-5 text-sm font-black text-white shadow-xl transition hover:bg-brand-500 active:scale-95 disabled:opacity-60"
              >
                {loading ? 'MEMPROSES...' : 'KIRIM MINAT SEKARANG'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-10 pt-16 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 shadow-xl ring-8 ring-brand-50">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-3xl font-black tracking-tight text-brand-900">Berhasil Terkirim!</h3>
            <p className="mb-8 text-sm leading-relaxed text-neutral-500">
              Tim verifikator atau PIC terkait akan segera menghubungi Anda melalui WhatsApp.
            </p>

            {lahan.namaPic && lahan.noTelpPic ? (
              <div className="relative mb-8 overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 p-6 text-left">
                <p className="mb-3 text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
                  Kontak PIC Pengelola
                </p>
                <p className="mb-1 text-lg leading-none font-black text-brand-900">{lahan.namaPic}</p>
                <p className="text-sm font-bold text-brand-500">{lahan.noTelpPic}</p>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-4 text-xs font-black tracking-[0.3em] text-neutral-400 uppercase transition hover:text-neutral-600"
            >
              Tutup Halaman
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
