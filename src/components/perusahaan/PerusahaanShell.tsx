'use client'

import type { ReactNode } from 'react'
import {
  PerusahaanSidebar,
  usePerusahaanSidebarState,
} from '@/components/perusahaan/PerusahaanSidebar'
import { PerusahaanTopbar } from '@/components/perusahaan/PerusahaanTopbar'

export function PerusahaanShell({ children }: { children: ReactNode }) {
  const { collapsed, mobileOpen, toggleCollapsed, openMobile, closeMobile } =
    usePerusahaanSidebarState()

  return (
    <div className="flex min-h-screen bg-brand-50 text-content-main">
      <PerusahaanSidebar
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <PerusahaanTopbar onOpenSidebar={openMobile} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
