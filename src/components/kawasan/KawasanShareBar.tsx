'use client'

import { useState } from 'react'

interface KawasanShareBarProps {
  nama: string
  url: string
}

export function KawasanShareBar({ nama, url }: KawasanShareBarProps) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedNama = encodeURIComponent(nama)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
      <span className="w-full text-center text-sm font-semibold text-brand-900 sm:w-auto sm:text-left">
        Bagikan:
      </span>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="rounded-lg bg-neutral-500 px-3 py-1.5 text-sm text-white transition duration-300 hover:bg-neutral-600"
      >
        {copied ? 'Tersalin' : 'Salin URL'}
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1877F2] px-3 py-1.5 text-sm text-white transition duration-300 hover:opacity-90"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedNama}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1DA1F2] px-3 py-1.5 text-sm text-white transition duration-300 hover:opacity-90"
      >
        Twitter
      </a>
      <a
        href={`https://wa.me/?text=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#25D366] px-3 py-1.5 text-sm text-white transition duration-300 hover:opacity-90"
      >
        WhatsApp
      </a>
    </div>
  )
}
