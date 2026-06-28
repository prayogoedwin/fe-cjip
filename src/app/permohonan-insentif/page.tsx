import type { Metadata } from 'next'
import { PermohonanInsentifForm } from '@/components/permohonan-insentif/PermohonanInsentifForm'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Permohonan Insentif',
  'Ajukan permohonan insentif investasi melalui SINIDA — Sistem Informasi Insentif Daerah Jawa Tengah',
)

export default function PermohonanInsentifPage() {
  return <PermohonanInsentifForm />
}
