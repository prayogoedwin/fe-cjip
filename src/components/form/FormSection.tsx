import { inputClass } from './form-styles'

export function FormSection({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-brand-100 bg-brand-50/60 px-6 py-4">
        <span aria-hidden="true" className="text-lg">
          {icon}
        </span>
        <h2 className="text-sm font-semibold tracking-wide text-brand-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  )
}

export function FormField({
  label,
  name,
  placeholder,
  required = false,
  type = 'text',
  multiline = false,
  value,
  onChange,
  accept,
}: {
  label: string
  name?: string
  placeholder?: string
  required?: boolean
  type?: string
  multiline?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  accept?: string
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          rows={3}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          accept={accept}
          className={inputClass}
        />
      )}
    </div>
  )
}
