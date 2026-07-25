'use client'

import { SEKTOR_TABS, type SektorTabId } from '@/lib/sektor-data'

interface SektorTabBarProps {
  activeId: SektorTabId
  onChange: (id: SektorTabId) => void
}

export function SektorTabBar({ activeId, onChange }: SektorTabBarProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {SEKTOR_TABS.map((sektor) => {
        const isActive = activeId === sektor.id

        return (
          <button
            key={sektor.id}
            type="button"
            onClick={() => onChange(sektor.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition duration-300 ${
              isActive
                ? 'bg-brand-500 text-white'
                : 'border border-brand-100 bg-white text-neutral-700 hover:bg-brand-50'
            }`}
          >
            <span aria-hidden="true">{sektor.icon}</span>
            {sektor.label}
          </button>
        )
      })}
    </div>
  )
}
