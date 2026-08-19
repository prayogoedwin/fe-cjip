import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { submitSinida } from '@/lib/api'
import { ApiError } from '@/lib/api/client'
import { AUTH_TOKEN_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthenticated.' },
      { status: 401 },
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Form data tidak valid.' },
      { status: 400 },
    )
  }

  try {
    const res = await submitSinida(formData, token)
    return NextResponse.json(res)
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        err.body ?? { success: false, message: err.message },
        { status: err.status || 500 },
      )
    }
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 },
    )
  }
}
