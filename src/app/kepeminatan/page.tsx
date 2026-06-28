import type { Metadata } from 'next'
import { KepeminatanForm } from '@/components/kepeminatan/KepeminatanForm'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Letter of Intent',
  'Ajukan Letter of Intent dan profil minat investasi di Jawa Tengah',
)

export default function KepeminatanPage() {
  return <KepeminatanForm />
}
