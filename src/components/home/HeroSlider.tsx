'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { QuickLinks } from '@/components/layout/QuickLinks'
import { heroSlides } from '@/lib/home-data'

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const total = heroSlides.length
  const pausedRef = useRef(false)

  const goSlide = useCallback(
    (n: number) => {
      setCurrent((n + total) % total)
    },
    [total],
  )

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) goSlide(current + 1)
    }, 6000)
    return () => clearInterval(timer)
  }, [current, goSlide])

  return (
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
      <section
        className="relative mt-[68px] h-[calc(100svh-68px)] min-h-[480px] w-full overflow-hidden bg-brand-900"
        onMouseEnter={() => {
          pausedRef.current = true
        }}
        onMouseLeave={() => {
          pausedRef.current = false
        }}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'z-[1] opacity-100' : 'z-0 opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = slide.fallback
              }}
            />
            <div
              className="absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(10,46,15,0.88)_0%,rgba(10,46,15,0.55)_35%,rgba(10,46,15,0.2)_65%,rgba(10,46,15,0.05)_100%)]"
              aria-hidden="true"
            />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 z-[3] max-w-[680px] px-6 pb-32 sm:px-12 sm:pb-36">
          <h1 className="mb-2.5 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.2] font-extrabold text-[var(--hero-text)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {heroSlides[current].title}
          </h1>
          <p className="max-w-[520px] text-[0.92rem] leading-[1.7] text-[var(--hero-text-muted)] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
            {heroSlides[current].description}
          </p>
        </div>

        <div className="absolute right-6 bottom-28 z-[4] flex gap-1.5 sm:right-10 sm:bottom-32">
          {heroSlides.map((_, index) => (
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
          className="absolute top-1/2 left-5 z-[4] hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/35 bg-white/15 text-2xl leading-none text-white transition duration-300 hover:bg-white/30 md:flex"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Slide berikutnya"
          onClick={() => goSlide(current + 1)}
          className="absolute top-1/2 right-5 z-[4] hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/35 bg-white/15 text-2xl leading-none text-white transition duration-300 hover:bg-white/30 md:flex"
        >
          ›
        </button>

        <div className="absolute right-0 bottom-0 left-0 z-[5]">
          <QuickLinks variant="overlay" />
        </div>
      </section>
    </div>
  )
}
