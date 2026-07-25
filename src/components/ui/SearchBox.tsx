'use client'

interface SearchBoxProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: () => void
  variant?: 'default' | 'hero'
}

export function SearchBox({
  placeholder = 'Cari...',
  className = '',
  value,
  onChange,
  onSearch,
  variant = 'default',
}: SearchBoxProps) {
  if (variant === 'hero') {
    return (
      <div className={`group relative ${className}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-400 transition group-focus-within:text-brand-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch?.()
          }}
          className="block w-full rounded-2xl border-none bg-white py-4 pl-12 pr-4 text-sm text-content-main shadow-xl shadow-neutral-100 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-brand-500"
        />
      </div>
    )
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.()
        }}
        className="flex-1 rounded-lg border border-cjip-border px-3.5 py-2.5 text-[0.85rem] text-content-main outline-none focus:border-brand-500 focus:shadow-[0_0_0_2px_rgba(26,99,36,0.12)]"
      />
      <button
        type="button"
        onClick={onSearch}
        className="rounded-lg bg-brand-500 px-4 py-2.5 text-[0.85rem] font-semibold text-white transition duration-300 hover:bg-brand-900"
      >
        Cari
      </button>
    </div>
  )
}
