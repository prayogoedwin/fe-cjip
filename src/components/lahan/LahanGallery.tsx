'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SafeImage } from '@/components/ui/SafeImage'

interface LahanGalleryProps {
  images: string[]
  nama: string
}

export function LahanGallery({ images, nama }: LahanGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (event.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxOpen, images.length])

  if (images.length === 0) return null

  const lightbox = lightboxOpen ? (
    <div className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/95 p-4 md:p-10">
      <button
        type="button"
        onClick={() => setLightboxOpen(false)}
        className="absolute inset-0 z-10 cursor-pointer"
        tabIndex={-1}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setLightboxOpen(false)}
        className="absolute top-4 right-4 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/25 md:top-6 md:right-6"
        aria-label="Tutup galeri"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Tutup
      </button>

      {images.length > 1 ? (
        <button
          type="button"
          onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25"
          aria-label="Foto sebelumnya"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : null}

      <div className="pointer-events-none relative z-20 flex h-full w-full flex-col items-center justify-center">
        <div className="relative h-[85vh] w-full max-w-5xl">
          <SafeImage
            src={images[activeIndex]}
            alt={`${nama} foto ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        <p className="mt-4 text-sm font-medium tracking-widest text-white/60 uppercase">
          Foto <span className="text-white">{activeIndex + 1}</span> / {images.length}
        </p>
      </div>

      {images.length > 1 ? (
        <button
          type="button"
          onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
          className="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25"
          aria-label="Foto berikutnya"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : null}
    </div>
  ) : null

  return (
    <>
      <div className="rounded-3xl border border-white bg-white p-3 shadow-xl shadow-brand-100/50">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative h-72 w-full cursor-zoom-in overflow-hidden rounded-2xl md:h-[480px]"
        >
          <SafeImage
            src={images[activeIndex]}
            alt={nama}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Lihat {images.length} Foto
          </div>
        </button>

        {images.length > 1 ? (
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setActiveIndex(index)
                  setLightboxOpen(true)
                }}
                className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  activeIndex === index ? 'border-brand-500 ring-4 ring-brand-100' : 'border-transparent'
                }`}
              >
                <SafeImage src={src} alt={`${nama} ${index + 1}`} fill className="object-cover" sizes="128px" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  )
}
