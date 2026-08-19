import { NextResponse } from 'next/server'
import { registerApi } from '@/lib/api'
import { ApiError } from '@/lib/api/client'
import {
  AUTH_COOKIE,
  AUTH_TOKEN_COOKIE,
  authTokenCookieOptions,
  clearLegacyAuthFlagOptions,
} from '@/lib/auth'

export async function POST(request: Request) {
  let body: {
    name?: string
    email?: string
    password?: string
    password_confirmation?: string
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

  const name = body.name?.trim()
  const email = body.email?.trim()
  const password = body.password
  const passwordConfirmation = body.password_confirmation

  if (!name || !email || !password || !passwordConfirmation) {
    return NextResponse.json(
      { success: false, message: 'Nama, email, password, dan konfirmasi wajib diisi.' },
      { status: 422 },
    )
  }

  try {
    const res = await registerApi({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      turnstile_token: body.turnstile_token,
      device_name: body.device_name,
    })

    const response = NextResponse.json({
      success: true,
      locale: res.locale,
      data: {
        token_type: res.data.token_type,
        user: res.data.user,
        message: res.data.message,
      },
    })

    response.cookies.set(AUTH_TOKEN_COOKIE, res.data.token, authTokenCookieOptions())
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
