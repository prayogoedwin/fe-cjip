'use client'

import { useEffect, useRef, useState } from 'react'
import {
  LAHAN_SKEMA_OPTIONS,
  LAHAN_STATUS_OPTIONS,
  LAHAN_WILAYAH_OPTIONS,
} from '@/lib/lahan-data'

interface LahanSearchBarProps {
  query: string
  wilayah: string
  skema: string
  status: string
  onQueryChange: (value: string) => void
  onWilayahChange: (value: string) => void
  onSkemaChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSearch: () => void
}

interface FilterDropdownProps {
  label: string
  icon: React.ReactNode
  iconClass?: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function FilterDropdown({
  label,
  icon,
  iconClass = 'text-brand-500',
  options,
  value,
  onChange,
  className = 'w-full lg:w-56',
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = options.find((opt) => opt.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-4 text-sm font-medium text-neutral-600 transition outline-none hover:bg-neutral-50 ${
          open ? 'bg-neutral-50 ring-2 ring-brand-100' : ''
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className={iconClass}>{icon}</span>
          <span className="truncate">{selected.label}</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute top-[calc(100%+8px)] right-0 left-0 z-50 max-h-60 overflow-y-auto rounded-2xl border border-brand-100 bg-white p-1.5 shadow-xl"
        >
          {options.map((option) => {
            const isActive = option.value === value
            return (
              <button
                key={option.value || 'all'}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition hover:bg-brand-50 ${
                  isActive ? 'bg-brand-50 font-bold text-brand-700' : 'text-neutral-700'
                }`}
              >
                <span>{option.label}</span>
                {isActive ? (
                  <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export function LahanSearchBar({
  query,
  wilayah,
  skema,
  status,
  onQueryChange,
  onWilayahChange,
  onSkemaChange,
  onStatusChange,
  onSearch,
}: LahanSearchBarProps) {
  const wilayahOptions = LAHAN_WILAYAH_OPTIONS.map((item) => ({
    value: item === 'Seluruh Wilayah' ? '' : item,
    label: item,
  }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-white/50 bg-white/90 p-2 shadow-2xl backdrop-blur-xl lg:flex-row lg:p-3"
    >
      <div className="group relative w-full flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
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
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari aset lahan atau kawasan..."
          className="w-full rounded-xl border-none bg-transparent py-4 pr-4 pl-11 text-sm font-medium text-neutral-700 placeholder:text-neutral-400 outline-none focus:ring-0"
        />
      </div>

      <div className="hidden h-10 w-px bg-brand-100 lg:block" aria-hidden="true" />

      <FilterDropdown
        label="Wilayah"
        value={wilayah}
        onChange={onWilayahChange}
        options={wilayahOptions}
        icon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />

      <div className="hidden h-10 w-px bg-brand-100 lg:block" aria-hidden="true" />

      <FilterDropdown
        label="Skema"
        value={skema}
        onChange={onSkemaChange}
        options={[...LAHAN_SKEMA_OPTIONS]}
        iconClass="text-blue-500"
        icon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
      />

      <div className="hidden h-10 w-px bg-brand-100 lg:block" aria-hidden="true" />

      <FilterDropdown
        label="Status"
        value={status}
        onChange={onStatusChange}
        options={[...LAHAN_STATUS_OPTIONS]}
        className="w-full lg:w-48"
        iconClass="text-emerald-500"
        icon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
          </svg>
        }
      />

      <div className="hidden h-10 w-px bg-brand-100 lg:block" aria-hidden="true" />

      <button
        type="submit"
        className="flex w-full min-w-[140px] items-center justify-center gap-2 rounded-xl bg-brand-900 px-10 py-4 text-sm font-bold text-white transition duration-300 hover:bg-brand-500 active:scale-95 lg:w-auto"
      >
        Cari
      </button>
    </form>
  )
}
