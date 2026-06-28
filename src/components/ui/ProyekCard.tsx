import Image from 'next/image'
import Link from 'next/link'
import type { PeluangInvestasi } from '@/types'

const statusLabels: Record<PeluangInvestasi['status'], string> = {
  siap: 'Ditawarkan',
  strategis: 'Strategis',
  prospektif: 'Prospektif',
  potensial: 'Potensial',
}

const statusColors: Record<PeluangInvestasi['status'], string> = {
  siap: 'bg-brand-500',
  strategis: 'bg-blue-600',
  prospektif: 'bg-amber-500',
  potensial: 'bg-neutral-500',
}

interface ProyekCardProps {
  proyek: PeluangInvestasi
  variant?: 'default' | 'sektor'
}

export function ProyekCard({ proyek, variant = 'default' }: ProyekCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm transition duration-300 hover:shadow-md">
      {variant === 'sektor' && (
        <div className="flex items-center justify-between border-b border-brand-50 px-4 py-2 text-xs">
          <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
            {proyek.sektor}
          </span>
          <div className="flex gap-3 text-brand-500">
            <Link href="#">Detail</Link>
            <Link href="#">Lokasi</Link>
          </div>
        </div>
      )}
      <div className="relative h-44">
        <Image
          src={proyek.thumbnail}
          alt={proyek.judul}
          fill
          className="object-cover"
          sizes="33vw"
        />
        {variant === 'default' && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-semibold text-white">
            {proyek.sektor}
          </span>
        )}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${statusColors[proyek.status]}`}
        >
          {statusLabels[proyek.status]}
        </span>
      </div>
      <div className="p-4">
        <h4 className="mb-2 line-clamp-2 font-semibold text-brand-900">{proyek.judul}</h4>
        {proyek.wilayah && (
          <p className="mb-2 text-xs text-neutral-500">📍 {proyek.wilayah}</p>
        )}
        {proyek.excerpt && (
          <p className="mb-3 line-clamp-2 text-sm text-neutral-600">{proyek.excerpt}</p>
        )}
        <div className="flex items-center justify-between border-t border-brand-50 pt-3">
          <span className="text-sm font-semibold text-brand-500">{proyek.nilai}</span>
          <Link href="#" className="text-sm font-medium text-brand-500">
            Lihat Detail →
          </Link>
        </div>
      </div>
    </article>
  )
}
