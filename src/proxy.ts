import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_TOKEN_COOKIE } from '@/lib/auth'

export default function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value?.trim()
  const isAuthenticated = Boolean(token)

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    const path = request.nextUrl.pathname
    if (path.startsWith('/perusahaan')) {
      loginUrl.searchParams.set('rdr', 'perusahaan')
    } else {
      loginUrl.searchParams.set('rdr', 'sinida')
    }
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/perusahaan/:path*', '/permohonan-insentif/:path*'],
}
