import { QuickLinks } from '@/components/layout/QuickLinks'
import { DeferredHeroCarousel } from '@/components/home/DeferredHeroCarousel'
import { SafeImage } from '@/components/ui/SafeImage'
import { heroSlides, type HeroSlide } from '@/lib/home-data'

/**
 * Server-rendered first slide for fast LCP / Speed Index.
 * Carousel JS is deferred (ssr: false + idle) so it stays out of TBT.
 */
export function HeroSlider({ slides }: { slides?: HeroSlide[] }) {
  const list = slides?.length ? slides : heroSlides
  const first = list[0]

  return (
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
      <section className="relative mt-[68px] flex min-h-[calc(100svh-68px)] flex-col overflow-hidden bg-brand-900 sm:block sm:h-[calc(100svh-68px)] sm:min-h-[480px]">
        <div className="relative h-[38svh] min-h-[220px] shrink-0 sm:absolute sm:inset-0 sm:h-auto sm:min-h-0">
          <div className="absolute inset-0 z-[1]">
            <SafeImage
              src={first.image}
              fallbackSrc={first.fallback}
              alt={first.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={70}
              priority
              fetchPriority="high"
            />
            <div
              className="absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(10,46,15,0.88)_0%,rgba(10,46,15,0.55)_35%,rgba(10,46,15,0.2)_65%,rgba(10,46,15,0.05)_100%)]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative z-[3] flex flex-1 flex-col gap-4 bg-brand-900 px-4 py-4 sm:hidden">
          <div data-hero-mobile-copy>
            <div data-static-hero>
              <h1 className="mb-2 text-[1.35rem] leading-[1.25] font-extrabold text-[var(--hero-text)]">
                {first.title}
              </h1>
              <p className="text-[0.85rem] leading-[1.65] text-[var(--hero-text-muted)]">
                {first.description}
              </p>
            </div>
          </div>

          <div data-hero-mobile-dots>
            <div data-static-hero className="flex gap-1.5" aria-hidden="true">
              {list.map((_, index) => (
                <span
                  key={index}
                  className={`h-1 rounded ${index === 0 ? 'w-10 bg-white' : 'w-6 bg-white/35'}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-2">
            <QuickLinks variant="overlay" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 z-[3] hidden max-w-[680px] px-12 pb-36 sm:block"
          data-static-hero
        >
          <h1 className="mb-2.5 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.2] font-extrabold text-[var(--hero-text)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {first.title}
          </h1>
          <p className="max-w-[520px] text-[0.92rem] leading-[1.7] text-[var(--hero-text-muted)] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
            {first.description}
          </p>
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-[10] hidden sm:block">
          <QuickLinks variant="overlay" />
        </div>

        <DeferredHeroCarousel slides={list} />
      </section>
    </div>
  )
}
