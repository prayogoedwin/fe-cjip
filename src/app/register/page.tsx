import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Register',
  'Daftar akun Central Java Investment Platform',
)

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ rdr?: string }>
}) {
  const { rdr } = await searchParams
  return <RegisterForm rdr={rdr} />
}
