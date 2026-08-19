import type { ReactNode } from 'react'

export function PageHeader({
  breadcrumbs,
  title,
  action,
}: {
  breadcrumbs?: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        {breadcrumbs ? (
          <p className="mb-1 text-xs text-content-muted">{breadcrumbs}</p>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-brand-900">{title}</h1>
      </div>
      {action}
    </div>
  )
}

export function PanelCard({
  children,
  className = '',
  title,
}: {
  children: ReactNode
  className?: string
  title?: string
}) {
  return (
    <section
      className={`rounded-xl border border-brand-100 bg-white shadow-sm ${className}`}
    >
      {title ? (
        <div className="border-b border-brand-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-brand-900">{title}</h2>
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  )
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-content-muted">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-2xl text-brand-500">
        ×
      </div>
      <p className="text-sm font-medium text-brand-900">{label}</p>
    </div>
  )
}

export function Field({
  label,
  required,
  children,
  className = '',
}: {
  label: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-content-muted">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-lg border border-brand-100 bg-white px-3 py-2.5 text-sm text-content-main outline-none transition focus:border-brand-500'

export const textareaClass = `${inputClass} min-h-[96px] resize-y`

export function FileDropzone({ hint }: { hint?: string }) {
  return (
    <div className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-brand-100 bg-brand-50/60 px-4 text-center">
      <p className="text-sm text-content-muted">
        Drag & Drop your files or{' '}
        <span className="font-semibold text-brand-500 underline">Browse</span>
      </p>
      {hint ? <p className="mt-1 text-xs text-content-muted">{hint}</p> : null}
    </div>
  )
}

export function PrimaryButton({
  children,
  type = 'button',
  className = '',
  disabled,
  onClick,
}: {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  type = 'button',
  className = '',
  disabled,
  onClick,
}: {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border border-brand-100 bg-white px-4 py-2.5 text-sm font-medium text-content-main transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}
