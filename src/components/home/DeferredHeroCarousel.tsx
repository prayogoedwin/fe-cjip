'use client'

import dynamic from 'next/dynamic'
import type { HeroSlide } from '@/lib/home-data'

const HeroCarousel = dynamic(
  () => import('@/components/home/HeroCarousel').then((m) => m.HeroCarousel),
  { ssr: false },
)

/** Loads carousel JS only on the client, after the static hero has painted. */
export function DeferredHeroCarousel({ slides }: { slides?: HeroSlide[] }) {
  return <HeroCarousel slides={slides} />
}
