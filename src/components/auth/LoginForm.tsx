'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Turnstile } from '@marsidev/react-turnstile'
import { LOGO_WHITE } from '@/lib/assets'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ApiError, type ApiErrorBody } from '@/lib/api/client'
import { getRedirectAfterLogin } from '@/lib/auth'

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'

interface LoginFormProps {
  rdr?: string
}

function formatApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.body?.errors) {
      const messages = Object.values(err.body.errors).flat()
      if (messages.length) return messages.join(' ')
    }
    if (err.status === 401) return err.message || 'Email atau password salah.'
    if (err.status === 422) return err.message || 'Data tidak valid.'
    return err.message
  }
  if (err instanceof Error) return err.message
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

export function LoginForm({ rdr }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const isSinidaLogin = rdr === 'sinida'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!turnstileToken) {
      setCaptchaError(true)
      return
    }
    setCaptchaError(false)
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          turnstile_token: turnstileToken,
        }),
      })

      const json = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; errors?: Record<string, string[]> }
        | null

      if (!response.ok) {
        throw new ApiError(
          json?.message ?? `Request gagal (${response.status})`,
          response.status,
          (json as ApiErrorBody | null) ?? null,
        )
      }

      router.push(getRedirectAfterLogin(rdr))
    } catch (err) {
      setError(formatApiError(err))
      setTurnstileToken(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-brand-900 to-brand-600 p-10 text-white lg:flex">
        <div>
          <Image
            src={LOGO_WHITE}
            alt="Logo CJIP"
            width={637}
            height={839}
            className="h-11 w-auto object-contain"
            priority
          />
        </div>
        <div>
          <h2 className="mb-4 text-3xl font-bold leading-tight">
            Selamat Datang di
            <br />
            Central Java Investment Platform
          </h2>
          <p className="mb-8 text-sm text-white/80">
            Platform digital investasi Provinsi Jawa Tengah. Temukan proyek, kawasan industri, dan
            peluang pertumbuhan ekonomi terbaik bersama kami.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'Rp 88,44 T', label: 'Realisasi Investasi 2024' },
              { value: '150+', label: 'Proyek Tersedia' },
              { value: '35', label: 'Kabupaten/Kota' },
              { value: '4,95%', label: 'Pertumbuhan Ekonomi' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-4">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-brand-50 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <Image
            src="https://cjip.jatengprov.go.id/images/cjip-small.svg"
            alt="Logo CJIP"
            width={100}
            height={40}
            className="mb-6 h-10 w-auto"
          />
          <h1 className="mb-1 text-2xl font-bold text-brand-900">Sign in</h1>
          <p className="mb-6 text-sm text-neutral-500">
            {isSinidaLogin
              ? 'Masuk ke akun perusahaan Anda untuk mengajukan Permohonan Insentif (SINIDA).'
              : 'Masuk ke akun CJIP Anda untuk mengakses semua fitur platform.'}
          </p>

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@perusahaan.com"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-brand-100 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-brand-100 px-4 py-2.5 pr-24 text-sm outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-brand-500"
                >
                  {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Verifikasi <span className="text-red-500">*</span>
              </label>
              <p className="mb-2 text-xs text-neutral-500">
                Centang kotak di bawah untuk konfirmasi bahwa Anda bukan robot.
              </p>
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                options={{
                  theme: 'light',
                  size: 'normal',
                  appearance: 'always',
                }}
                onSuccess={(token) => {
                  setTurnstileToken(token)
                  setCaptchaError(false)
                }}
                onExpire={() => setTurnstileToken(null)}
                onError={() => {
                  setTurnstileToken(null)
                  setCaptchaError(true)
                }}
              />
              {captchaError && (
                <p className="mt-2 text-xs text-red-500">
                  Silakan selesaikan verifikasi terlebih dahulu.
                </p>
              )}
            </div>

            {error ? (
              <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={!turnstileToken || loading}
              className="w-full rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Sign in'}
            </button>
          </form>

          <hr className="my-5 border-brand-100" />
          <p className="text-center text-sm text-neutral-500">
            Belum punya akun?{' '}
            <Link
              href={isSinidaLogin ? '/register?rdr=sinida' : '/register'}
              className="font-semibold text-brand-500 transition duration-300 hover:text-brand-600"
            >
              Daftar sekarang
            </Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link href="/" className="text-brand-500 transition duration-300 hover:text-brand-600">
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
