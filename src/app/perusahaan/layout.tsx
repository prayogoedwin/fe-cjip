import type { ReactNode } from 'react'
import { PerusahaanShell } from '@/components/perusahaan/PerusahaanShell'

export default function PerusahaanLayout({ children }: { children: ReactNode }) {
  return <PerusahaanShell>{children}</PerusahaanShell>
}
