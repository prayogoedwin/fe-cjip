import Image from 'next/image'
import { partnerLogos } from '@/lib/home-data'

export function PartnersSection() {
  return (
    <div className="border-y border-cjip-border bg-brand-50 px-6 py-8">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-10">
        {partnerLogos.map((partner) => (
          <a
            key={partner.alt}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
