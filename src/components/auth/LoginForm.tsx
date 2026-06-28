'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LOGO_WHITE } from '@/lib/assets'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getRedirectAfterLogin, setAuthCookie } from '@/lib/auth'

interface LoginFormProps {
  rdr?: string
}

export function LoginForm({ rdr }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const isSinidaLogin = rdr === 'sinida'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAuthCookie()
    router.push(getRedirectAfterLogin(rdr))
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

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="nama@perusahaan.com"
                required
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
                  placeholder="Masukkan password"
                  required
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
                Captcha <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <Image
                  src="https://cjip.jatengprov.go.id/captcha"
                  alt="Kode captcha verifikasi"
                  width={120}
                  height={44}
                  className="rounded border border-brand-100"
                />
                <input
                  type="text"
                  placeholder="Masukkan captcha"
                  required
                  className="flex-1 rounded-lg border border-brand-100 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  className="rounded-lg border border-brand-100 px-3 text-sm text-neutral-600 transition duration-300 hover:bg-brand-50"
                >
                  ↻
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-brand-600"
            >
              Sign in
            </button>
          </form>

          <hr className="my-5 border-brand-100" />
          <p className="text-center text-sm text-neutral-500">
            Belum punya akun?{' '}
            <a href="#" className="font-semibold text-brand-500">
              Daftar sekarang
            </a>
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
