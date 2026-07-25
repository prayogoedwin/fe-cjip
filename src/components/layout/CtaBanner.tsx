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
    <section className="relative overflow-hidden px-6 py-20 text-center sm:py-24">
      <div
        className="absolute inset-0 bg-[url('https://cjip.jatengprov.go.id/images/banner.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#0b1f14]/75" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-brand-900/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl">
        <h3 className="text-[clamp(1.5rem,3.5vw,2.35rem)] font-extrabold tracking-wide text-white uppercase">
          {title}
        </h3>
        <p className="mx-auto mt-4 max-w-[540px] text-[0.95rem] leading-relaxed text-white/85">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-500 px-8 py-3.5 text-[0.92rem] font-bold text-white shadow-[0_8px_24px_rgba(26,99,36,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
        >
          {buttonLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
