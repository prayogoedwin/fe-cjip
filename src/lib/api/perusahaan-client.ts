import type { ApiSuccess } from '@/lib/api/client'

/** Client-side calls go through Next BFF (HttpOnly cookie). Safe for Client Components. */
export async function perusahaanBff<T = unknown>(
  path: string,
  init?: {
    method?: string
    body?: unknown
    formData?: FormData
  },
): Promise<ApiSuccess<T>> {
  const method = init?.method ?? 'GET'
  const headers: HeadersInit = { Accept: 'application/json' }
  let body: BodyInit | undefined

  if (init?.formData) {
    body = init.formData
  } else if (init?.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(init.body)
  }

  const res = await fetch(`/api/perusahaan/${path.replace(/^\//, '')}`, {
    method,
    headers,
    body,
  })

  const json = (await res.json().catch(() => null)) as
    | ApiSuccess<T>
    | { success: false; message?: string }
    | null

  if (!res.ok || !json || !('success' in json) || json.success !== true) {
    const message =
      json && 'message' in json && json.message
        ? String(json.message)
        : `Request gagal (${res.status})`
    throw new Error(message)
  }

  return json
}
