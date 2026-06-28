import { SectionLabel } from '@/components/ui/SectionLabel'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center">
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-brand-900">{title}</h2>
      {description && (
        <p className="mx-auto mt-2.5 max-w-[620px] text-[0.95rem] text-content-muted">{description}</p>
      )}
    </div>
  )
}
