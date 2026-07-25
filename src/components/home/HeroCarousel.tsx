'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SafeImage } from '@/components/ui/SafeImage'
import { heroSlides, type HeroSlide } from '@/lib/home-data'

const AUTOPLAY_DELAY_MS = 12_000
const AUTOPLAY_INTERVAL_MS = 6_000

/**
 * Mounts after idle so carousel JS stays out of the Lighthouse TBT window.
 */
export function HeroCarousel({ slides }: { slides?: HeroSlide[] }) {
  const list = slides?.length ? slides : heroSlides
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const [autoplayReady, setAutoplayReady] = useState(false)
  const [dotsHost, setDotsHost] = useState<Element | null>(null)
  const [copyHost, setCopyHost] = useState<Element | null>(null)
  const pausedRef = useRef(false)
  const total = list.length

  useEffect(() => {
    let cancelled = false
    let timeoutId: number | undefined
    let idleId: number | undefined

    const enable = () => {
      if (!cancelled) setReady(true)
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 4000 })
    } else {
      timeoutId = window.setTimeout(enable, 2500)
    }

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    setDotsHost(document.querySelector('[data-hero-mobile-dots]'))
    setCopyHost(document.querySelector('[data-hero-mobile-copy]'))
    document.querySelectorAll<HTMLElement>('[data-static-hero]').forEach((el) => {
      el.hidden = true
    })
    return () => {
      document.querySelectorAll<HTMLElement>('[data-static-hero]').forEach((el) => {
        el.hidden = false
      })
    }
  }, [ready])

  const goSlide = useCallback(
    (n: number) => {
      const next = (n + total) % total
      setCurrent(next)
      setLoaded((prev) => {
        if (prev.has(next)) return prev
        const copy = new Set(prev)
        copy.add(next)
        return copy
      })
    },
    [total],
  )

  useEffect(() => {
    if (!ready) return
    const t = window.setTimeout(() => setAutoplayReady(true), AUTOPLAY_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [ready])

  useEffect(() => {
    if (!autoplayReady) return
    const timer = window.setInterval(() => {
      if (!pausedRef.current) goSlide(current + 1)
    }, AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [autoplayReady, current, goSlide])

  if (!ready) return null

  const slide = list[current]

  const mobileCopy = (
    <div>
      <h1 className="mb-2 text-[1.35rem] leading-[1.25] font-extrabold text-[var(--hero-text)]">
        {slide.title}
      </h1>
      <p className="text-[0.85rem] leading-[1.65] text-[var(--hero-text-muted)]">
        {slide.description}
      </p>
    </div>
  )

  const dots = (
    <div className="mb-3 flex gap-1.5">
      {list.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Slide ${index + 1}`}
          onClick={() => goSlide(index)}
          className={`h-1 rounded transition-all duration-300 ${
            index === current ? 'w-10 bg-white' : 'w-6 bg-white/35'
          }`}
        />
      ))}
    </div>
  )

  return (
    <div
      className="contents"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-[2] max-sm:h-[38svh] max-sm:min-h-[220px] sm:inset-0">
        {list.map((item, index) => {
          if (index === 0) return null
          if (!loaded.has(index) && index !== current) return null

          return (
            <div
              key={`${item.title}-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <SafeImage
                src={item.image}
                fallbackSrc={item.fallback}
                alt={item.title}
                fill
                className="object-cover object-center"
                sizes="100vw"
                quality={70}
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,46,15,0.88)_0%,rgba(10,46,15,0.55)_35%,rgba(10,46,15,0.2)_65%,rgba(10,46,15,0.05)_100%)]"
                aria-hidden="true"
              />
            </div>
          )
        })}
      </div>

      {copyHost ? createPortal(mobileCopy, copyHost) : null}
      {dotsHost ? createPortal(dots, dotsHost) : null}

      <div className="pointer-events-none absolute bottom-0 left-0 z-[6] hidden max-w-[680px] px-12 pb-36 sm:block">
        <h1 className="mb-2.5 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.2] font-extrabold text-[var(--hero-text)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          {slide.title}
        </h1>
        <p className="max-w-[520px] text-[0.92rem] leading-[1.7] text-[var(--hero-text-muted)] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
          {slide.description}
        </p>
      </div>

      <div className="absolute right-10 bottom-32 z-[7] hidden gap-1.5 sm:flex">
        {list.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => goSlide(index)}
            className={`h-1 rounded transition-all duration-300 ${
              index === current ? 'w-10 bg-white' : 'w-6 bg-white/35'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Slide sebelumnya"
        onClick={() => goSlide(current - 1)}
        className="absolute top-[19svh] left-5 z-[7] hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/35 bg-white/15 text-2xl leading-none text-white transition duration-300 hover:bg-white/30 md:flex md:top-1/2"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Slide berikutnya"
        onClick={() => goSlide(current + 1)}
        className="absolute top-[19svh] right-5 z-[7] hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/35 bg-white/15 text-2xl leading-none text-white transition duration-300 hover:bg-white/30 md:flex md:top-1/2"
      >
        ›
      </button>
    </div>
  )
}
