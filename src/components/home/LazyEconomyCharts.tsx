'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { ApiBerandaPayload } from '@/lib/api'

const EconomyCharts = dynamic(
  () => import('@/components/home/EconomyCharts').then((m) => m.EconomyCharts),
  { ssr: false },
)

function ChartsPlaceholder() {
  return (
    <section className="bg-white px-6 py-16" aria-hidden="true">
      <div className="mx-auto h-72 max-w-6xl rounded-2xl bg-brand-50" />
    </section>
  )
}

/** Defer Chart.js until the section is near the viewport. */
export function LazyEconomyCharts({ grafik }: { grafik?: ApiBerandaPayload['grafik'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{ready ? <EconomyCharts grafik={grafik} /> : <ChartsPlaceholder />}</div>
}
