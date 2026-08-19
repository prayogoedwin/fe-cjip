import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ApiError, apiFetch } from '@/lib/api/client'
import { AUTH_TOKEN_COOKIE } from '@/lib/auth'

type Ctx = { params: Promise<{ path: string[] }> }

async function proxy(request: Request, ctx: Ctx) {
  const { path } = await ctx.params
  const token = (await cookies()).get(AUTH_TOKEN_COOKIE)?.value

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthenticated.' }, { status: 401 })
  }

  const method = request.method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  const laravelPath = `/v3/perusahaan/${path.join('/')}`
  const incoming = new URL(request.url)

  const query: Record<string, string> = {}
  incoming.searchParams.forEach((value, key) => {
    query[key] = value
  })

  const contentType = request.headers.get('content-type') ?? ''
  let body: unknown
  let formData: FormData | undefined

  if (method !== 'GET' && method !== 'DELETE') {
    if (contentType.includes('multipart/form-data')) {
      formData = await request.formData()
    } else if (contentType.includes('application/json')) {
      body = await request.json().catch(() => undefined)
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text()
      body = Object.fromEntries(new URLSearchParams(text))
    }
  }

  try {
    const res = await apiFetch<unknown>(laravelPath, {
      method,
      query,
      body,
      formData,
      token,
      cache: 'no-store',
    })
    return NextResponse.json(res, { status: method === 'POST' ? 201 : 200 })
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

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
