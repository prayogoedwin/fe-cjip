'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { SafeImage } from '@/components/ui/SafeImage'
import { resolveImageUrl } from '@/lib/images'

export interface PartnerLogoItem {
  id?: number | string
  href: string
  src: string
  alt: string
}

interface PartnersCarouselProps {
  partners?: Array<{ id: number; name: string; url: string; logo: string | null }>
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  )
}

const LOOP_COPIES = 3

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const loopingRef = useRef(false)

  const list: PartnerLogoItem[] = useMemo(
    () =>
      (partners ?? []).map((p) => ({
        id: p.id,
        href: p.url || '#',
        src: resolveImageUrl(p.logo),
        alt: p.name,
      })),
    [partners],
  )

  const looped = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copy) =>
        list.map((item, index) => ({
          ...item,
          key: `${copy}-${item.id ?? item.alt}-${index}`,
        })),
      ).flat(),
    [list],
  )

  const getSetWidth = useCallback(() => {
    const el = scrollerRef.current
    if (!el || list.length === 0) return 0
    // Total scrollable content is LOOP_COPIES sets; one set ≈ scrollWidth / LOOP_COPIES
    return el.scrollWidth / LOOP_COPIES
  }, [list.length])

  const jumpToMiddle = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const setWidth = getSetWidth()
    if (setWidth <= 0) return
    loopingRef.current = true
    el.scrollLeft = setWidth
    requestAnimationFrame(() => {
      loopingRef.current = false
    })
  }, [getSetWidth])

  const normalizeLoop = useCallback(() => {
    const el = scrollerRef.current
    if (!el || loopingRef.current) return
    const setWidth = getSetWidth()
    if (setWidth <= 0) return

    // Keep scroll inside the middle copy so left/right always have room
    if (el.scrollLeft <= setWidth * 0.15) {
      loopingRef.current = true
      el.scrollLeft += setWidth
      requestAnimationFrame(() => {
        loopingRef.current = false
      })
    } else if (el.scrollLeft >= setWidth * 1.85) {
      loopingRef.current = true
      el.scrollLeft -= setWidth
      requestAnimationFrame(() => {
        loopingRef.current = false
      })
    }
  }, [getSetWidth])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || list.length === 0) return

    jumpToMiddle()

    const onScroll = () => normalizeLoop()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', jumpToMiddle)

    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', jumpToMiddle)
    }
  }, [jumpToMiddle, list.length, normalizeLoop])

  function scrollByCards(dir: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.75, 360)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  if (list.length === 0) {
    return (
      <section className="border-y border-cjip-border bg-[#f4f7f5] px-4 py-10 sm:px-6">
        <p className="mx-auto max-w-container text-center text-sm text-neutral-400">
          Data partner kosong
        </p>
      </section>
    )
  }

  return (
    <section className="border-y border-cjip-border bg-[#f4f7f5] px-4 py-10 sm:px-6">
      <div className="relative mx-auto max-w-container">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Partner sebelumnya"
          className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cjip-border bg-white text-brand-900 shadow-sm transition duration-300 hover:bg-brand-50 sm:-left-2"
        >
          <Chevron dir="left" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-8 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {looped.map((partner) => (
            <a
              key={partner.key}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.alt}
              className="flex h-[88px] w-[160px] shrink-0 items-center justify-center rounded-xl border border-cjip-border/80 bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(26,99,36,0.1)] sm:h-[96px] sm:w-[180px]"
            >
              <SafeImage
                src={partner.src}
                alt={partner.alt}
                width={140}
                height={48}
                className="max-h-12 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Partner berikutnya"
          className="absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cjip-border bg-white text-brand-900 shadow-sm transition duration-300 hover:bg-brand-50 sm:-right-2"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </section>
  )
}
