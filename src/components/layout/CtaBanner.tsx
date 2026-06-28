import Link from 'next/link'

interface CtaBannerProps {
  title?: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
}

export function CtaBanner({
  title = 'Mulailah Berinvestasi di Jawa Tengah',
  description = 'Temukan potensi pertumbuhan ekonomi yang luar biasa dan raih kesuksesan bersama Jawa Tengah.',
  buttonLabel = 'Mulailah Berinvestasi',
  buttonHref = '/peluang-investasi',
}: CtaBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 to-brand-500 px-6 py-16 text-center">
      <div
        className="absolute inset-0 bg-[url('https://cjip.jatengprov.go.id/images/banner.jpg')] bg-cover bg-center opacity-15"
        aria-hidden="true"
      />
      <div className="relative">
        <h3 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-white">{title}</h3>
        <p className="mx-auto mt-3 max-w-[520px] text-[0.95rem] text-white/80">{description}</p>
        <Link
          href={buttonHref}
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-[0.9rem] font-bold text-brand-900 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-50"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  )
}
