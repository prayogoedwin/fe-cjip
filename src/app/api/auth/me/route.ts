import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { fetchMe } from '@/lib/api'
import { ApiError } from '@/lib/api/client'
import { AUTH_TOKEN_COOKIE } from '@/lib/auth'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthenticated.' }, { status: 401 })
  }

  try {
    const res = await fetchMe(token)
    return NextResponse.json(res)
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        err.body ?? { success: false, message: err.message },
        { status: err.status || 500 },
      )
    }
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan.' },
      { status: 500 },
    )
  }
}
