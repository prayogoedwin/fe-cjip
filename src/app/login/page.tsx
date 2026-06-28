import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { createPageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = createPageMetadata(
  'Login',
  'Masuk ke akun Central Java Investment Platform',
)

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ rdr?: string }>
}) {
  const { rdr } = await searchParams
  return <LoginForm rdr={rdr} />
}
