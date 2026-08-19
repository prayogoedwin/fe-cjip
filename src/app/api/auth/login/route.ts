import { NextResponse } from 'next/server'
import { loginApi } from '@/lib/api'
import { ApiError } from '@/lib/api/client'
import {
  AUTH_COOKIE,
  AUTH_TOKEN_COOKIE,
  authTokenCookieOptions,
  clearLegacyAuthFlagOptions,
} from '@/lib/auth'

export async function POST(request: Request) {
  let body: {
    email?: string
    password?: string
    turnstile_token?: string
    device_name?: string
  }

  try {
    body = (await request.json()) as typeof body
  } catch {
    return NextResponse.json(
      { success: false, message: 'Body JSON tidak valid.' },
      { status: 400 },
    )
  }

  const email = body.email?.trim()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'Email dan password wajib diisi.' },
      { status: 422 },
    )
  }

  try {
    const res = await loginApi({
      email,
      password,
      turnstile_token: body.turnstile_token,
      device_name: body.device_name,
    })

    const response = NextResponse.json({
      success: true,
      locale: res.locale,
      data: {
        token_type: res.data.token_type,
        user: res.data.user,
      },
    })

    response.cookies.set(AUTH_TOKEN_COOKIE, res.data.token, authTokenCookieOptions())
    // Drop legacy JS-readable flag if still present
    response.cookies.set(AUTH_COOKIE, '', clearLegacyAuthFlagOptions())

    return response
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
