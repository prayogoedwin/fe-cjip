interface SearchBoxProps {
  placeholder?: string
  className?: string
}

export function SearchBox({ placeholder = 'Cari...', className = '' }: SearchBoxProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="search"
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-cjip-border px-3.5 py-2.5 text-[0.85rem] text-content-main outline-none focus:border-brand-500 focus:shadow-[0_0_0_2px_rgba(26,99,36,0.12)]"
      />
      <button
        type="button"
        className="rounded-lg bg-brand-500 px-4 py-2.5 text-[0.85rem] font-semibold text-white transition duration-300 hover:bg-brand-900"
      >
        Cari
      </button>
    </div>
  )
}
