interface SectionLabelProps {
  children: React.ReactNode
  variant?: 'default' | 'hero'
}

export function SectionLabel({ children, variant = 'default' }: SectionLabelProps) {
  const base =
    'mb-3 inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold tracking-[0.12em] uppercase'
  const styles =
    variant === 'hero'
      ? 'bg-white/15 text-white'
      : 'bg-brand-100 text-brand-500'

  return <span className={`${base} ${styles}`}>{children}</span>
}
