'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SafeImage } from '@/components/ui/SafeImage'
import { infraItems } from '@/lib/home-data'
import { resolveImageUrl } from '@/lib/images'

interface ApiInfraItem {
  id: number
  nama: string
  detail: string
  icon: string | null
  gambar: string | null
}

interface InfraSectionProps {
  items?: ApiInfraItem[]
}

function isUsableTitle(nama: string | null | undefined): boolean {
  if (!nama?.trim()) return false
  // Seed/placeholder dari factory lokal
  return !/^contoh\b/i.test(nama.trim())
}

function isImageSrc(value: string | null | undefined): boolean {
  if (!value) return false
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('/') ||
    value.includes('/')
  )
}

export function InfraSection({ items }: InfraSectionProps) {
  const list = (items ?? []).map((item, index) => {
    const fallback = infraItems[index]
    return {
      key: String(item.id),
      title: isUsableTitle(item.nama) ? item.nama : (fallback?.title ?? ''),
      description: item.detail || fallback?.description || '',
      icon: item.icon || fallback?.icon || '🏭',
      gambar: item.gambar,
    }
  })

  const gallery = list
    .map((item) => ({
      title: item.title,
      src: item.gambar ? resolveImageUrl(item.gambar) : null,
    }))
    .filter((item): item is { title: string; src: string } => Boolean(item.src))

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
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
      if (gallery.length <= 1) return
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxOpen, gallery.length])

  function openLightbox(itemGambar: string | null) {
    if (!itemGambar || gallery.length === 0) return
    const resolved = resolveImageUrl(itemGambar)
    const index = gallery.findIndex((g) => g.src === resolved)
    setActiveIndex(index >= 0 ? index : 0)
    setLightboxOpen(true)
  }

  const lightbox =
    lightboxOpen && gallery.length > 0 ? (
      <div className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/90 p-4 md:p-10">
        <button
          type="button"
          onClick={() => setLightboxOpen(false)}
          className="absolute inset-0 z-10 cursor-pointer"
          tabIndex={-1}
          aria-hidden="true"
        />

        <p className="absolute top-4 left-4 z-30 text-sm font-medium tracking-widest text-white/70 md:top-6 md:left-6">
          <span className="text-white">{activeIndex + 1}</span>/{gallery.length}
        </p>

        <button
          type="button"
          onClick={() => setLightboxOpen(false)}
          className="absolute top-4 right-4 z-30 rounded-full border border-white/20 bg-white/15 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 md:top-6 md:right-6"
          aria-label="Tutup"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {gallery.length > 1 ? (
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length)}
            className="absolute top-1/2 left-3 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25 md:left-6"
            aria-label="Sebelumnya"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : null}

        <div className="pointer-events-none relative z-20 flex h-full w-full flex-col items-center justify-center">
          <div className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <SafeImage
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].title || `Infrastruktur ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>

        {gallery.length > 1 ? (
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i + 1) % gallery.length)}
            className="absolute top-1/2 right-3 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25 md:right-6"
            aria-label="Berikutnya"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : null}
      </div>
    ) : null

  return (
    <section className="bg-brand-50 px-6 py-16">
      <Container>
        <SectionHeader
          label="Infrastruktur"
          title="Infrastruktur Unggulan"
          description="Jawa Tengah didukung infrastruktur modern yang menghubungkan berbagai wilayah strategis demi mendukung kelancaran investasi."
        />
        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-brand-200 bg-white px-6 py-12 text-center text-neutral-400">
            Data infrastruktur kosong
          </p>
        ) : (
          <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((item) => {
              const imageSrc = item.gambar || (isImageSrc(item.icon) ? item.icon : null)
              const emoji = !imageSrc ? item.icon || '🏭' : null
              const hasGambar = Boolean(item.gambar)

              return (
                <div
                  key={item.key}
                  className="flex h-full gap-4 rounded-xl border border-cjip-border bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,99,36,0.12)]"
                >
                  <div
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-brand-100 text-2xl"
                    aria-hidden="true"
                  >
                    {imageSrc ? (
                      <SafeImage
                        src={resolveImageUrl(imageSrc)}
                        alt=""
                        fill
                        className="object-contain p-1.5"
                        sizes="48px"
                      />
                    ) : (
                      emoji
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    {item.title ? (
                      <h4 className="mb-1 font-semibold text-brand-900">{item.title}</h4>
                    ) : null}
                    <p className="line-clamp-3 text-[0.85rem] leading-relaxed text-content-muted">
                      {item.description}
                    </p>
                    {hasGambar ? (
                      <button
                        type="button"
                        onClick={() => openLightbox(item.gambar)}
                        className="mt-auto inline-block cursor-pointer pt-2 text-left text-[0.8rem] font-semibold text-brand-500 transition duration-300 hover:underline"
                      >
                        Baca Selengkapnya →
                      </button>
                    ) : (
                      <span className="mt-auto inline-block pt-2 text-[0.8rem] font-semibold text-neutral-300">
                        Baca Selengkapnya →
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </section>
  )
}
