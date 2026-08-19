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

interface RegisterFormProps {
  rdr?: string
}

function formatApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.body?.errors) {
      const messages = Object.values(err.body.errors).flat()
      if (messages.length) return messages.join(' ')
    }
    if (err.status === 422) return err.message || 'Data tidak valid.'
    return err.message
  }
  if (err instanceof Error) return err.message
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

export function RegisterForm({ rdr }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const loginHref = rdr ? `/login?rdr=${encodeURIComponent(rdr)}` : '/login'

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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          password_confirmation: passwordConfirmation,
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
            Daftarkan akun perusahaan Anda untuk mengakses fitur investasi, SINIDA, dan peluang di
            Jawa Tengah.
          </p>
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
          <h1 className="mb-1 text-2xl font-bold text-brand-900">Sign up</h1>
          <p className="mb-6 text-sm text-neutral-500">
            or{' '}
            <Link href={loginHref} className="font-semibold text-brand-500 hover:text-brand-600">
              sign in to your account
            </Link>
          </p>

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-brand-100 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Email <span className="text-red-500">*</span>
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
                  autoComplete="new-password"
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
              <p className="mt-1.5 text-xs text-neutral-500">
                Password minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  name="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Ulangi password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-brand-100 px-4 py-2.5 pr-24 text-sm outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-brand-500"
                >
                  {showPasswordConfirmation ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Verifikasi <span className="text-red-500">*</span>
              </label>
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
              {loading ? 'Memproses...' : 'Sign up'}
            </button>
          </form>

          <hr className="my-5 border-brand-100" />
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
