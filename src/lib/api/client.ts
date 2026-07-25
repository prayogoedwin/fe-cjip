export type ApiLocale = 'id' | 'en'

export interface ApiSuccess<T> {
  success: true
  locale: ApiLocale
  data: T
  meta?: ApiMeta
}

export interface ApiErrorBody {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export interface ApiMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

export class ApiError extends Error {
  status: number
  body: ApiErrorBody | null

  constructor(message: string, status: number, body: ApiErrorBody | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export interface ApiFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  query?: Record<string, string | number | boolean | null | undefined>
  body?: unknown
  formData?: FormData
  token?: string | null
  lang?: ApiLocale
  cache?: RequestCache
  next?: NextFetchRequestConfig
  signal?: AbortSignal
}

const API_DEBUG =
  process.env.NEXT_PUBLIC_API_DEBUG === '1' ||
  process.env.API_DEBUG === '1' ||
  (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_DEBUG !== '0')

function getApiBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!raw) return null
  return raw.replace(/\/$/, '')
}

function buildUrl(path: string, query?: ApiFetchOptions['query'], lang?: ApiLocale): string {
  const base = getApiBaseUrl()
  if (!base) {
    throw new ApiError(
      'NEXT_PUBLIC_API_URL belum di-set. Isi di .env.local (contoh: http://127.0.0.1:8000/api)',
      0,
    )
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${base}${normalized}`)

  if (lang) url.searchParams.set('lang', lang)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === null || value === undefined || value === '') continue
      url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

function summarizePayload(payload: unknown, maxLen = 4000): string {
  try {
    const text = JSON.stringify(payload, null, 2)
    if (text.length <= maxLen) return text
    return `${text.slice(0, maxLen)}\n… [truncated ${text.length - maxLen} chars]`
  } catch {
    return String(payload)
  }
}

function logApi(
  method: string,
  url: string,
  status: number | 'ERR',
  ms: number,
  payload?: unknown,
  error?: unknown,
) {
  if (!API_DEBUG) return

  const label = `[API] ${method} ${url} → ${status} (${ms}ms)`
  if (error) {
    console.error(label, error instanceof Error ? error.message : error)
    if (payload !== undefined) console.error('[API] body:', summarizePayload(payload))
    return
  }

  console.log(label)
  if (payload !== undefined) {
    console.log('[API] response:', summarizePayload(payload))
  }
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<ApiSuccess<T>> {
  const {
    method = 'GET',
    query,
    body,
    formData,
    token,
    lang = 'id',
    cache,
    next,
    signal,
  } = options

  const headers: HeadersInit = {
    Accept: 'application/json',
    'Accept-Language': lang,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let requestBody: BodyInit | undefined
  if (formData) {
    requestBody = formData
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    requestBody = JSON.stringify(body)
  }

  const url = buildUrl(path, query, lang)
  const started = Date.now()

  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers,
      body: requestBody,
      cache,
      next,
      signal,
    })
  } catch (error) {
    logApi(method, url, 'ERR', Date.now() - started, undefined, error)
    throw new ApiError(
      error instanceof Error ? error.message : 'Gagal terhubung ke API',
      0,
    )
  }

  let json: unknown = null
  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    json = await response.json()
  }

  const ms = Date.now() - started

  if (!response.ok) {
    const errBody = (json as ApiErrorBody | null) ?? null
    logApi(method, url, response.status, ms, json ?? errBody, errBody?.message ?? 'request failed')
    throw new ApiError(
      errBody?.message ?? `Request gagal (${response.status})`,
      response.status,
      errBody,
    )
  }

  logApi(method, url, response.status, ms, json)
  return json as ApiSuccess<T>
}

export async function apiGet<T>(
  path: string,
  options: Omit<ApiFetchOptions, 'method' | 'body' | 'formData'> = {},
): Promise<ApiSuccess<T>> {
  return apiFetch<T>(path, { ...options, method: 'GET' })
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  options: Omit<ApiFetchOptions, 'method' | 'body'> = {},
): Promise<ApiSuccess<T>> {
  return apiFetch<T>(path, { ...options, method: 'POST', body })
}

export async function apiPostForm<T>(
  path: string,
  formData: FormData,
  options: Omit<ApiFetchOptions, 'method' | 'formData' | 'body'> = {},
): Promise<ApiSuccess<T>> {
  return apiFetch<T>(path, { ...options, method: 'POST', formData })
}

/** Soft wrapper: returns null on failure instead of throwing. */
export async function apiGetSafe<T>(
  path: string,
  options: Omit<ApiFetchOptions, 'method' | 'body' | 'formData'> = {},
): Promise<ApiSuccess<T> | null> {
  try {
    return await apiGet<T>(path, options)
  } catch (error) {
    if (API_DEBUG) {
      console.error(`[API] SAFE FAIL ${path}:`, error instanceof Error ? error.message : error)
    }
    return null
  }
}
