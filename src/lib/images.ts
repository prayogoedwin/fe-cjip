/** Default generic placeholder when image path missing or fails to load. */
export const DEFAULT_IMAGE = '/images/default-placeholder.svg'

const INVALID_PATHS = new Set(['', 'null', 'undefined', 'none', 'n/a', '-'])

/**
 * Encode URL pathname segments so spaces / unicode in storage paths work
 * with next/image and browsers (e.g. "User 1" → "User%201").
 */
export function encodeImageUrl(url: string): string {
  try {
    const parsed = new URL(url)
    parsed.pathname = parsed.pathname
      .split('/')
      .map((segment) => {
        if (!segment) return segment
        try {
          return encodeURIComponent(decodeURIComponent(segment))
        } catch {
          return encodeURIComponent(segment)
        }
      })
      .join('/')
    return parsed.toString()
  } catch {
    return url.replace(/ /g, '%20')
  }
}

/**
 * Normalize API image paths to absolute URLs.
 * Returns DEFAULT_IMAGE when path is missing/invalid.
 */
export function resolveImageUrl(
  path: string | null | undefined,
  options?: { apiOrigin?: string },
): string {
  if (path == null) return DEFAULT_IMAGE

  const trimmed = String(path).trim()
  if (!trimmed || INVALID_PATHS.has(trimmed.toLowerCase())) {
    return DEFAULT_IMAGE
  }

  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return encodeImageUrl(trimmed)
  }

  const origin = options?.apiOrigin ?? getApiOrigin()

  if (trimmed.startsWith('/')) {
    if (trimmed.startsWith('/storage/') && origin) {
      return encodeImageUrl(`${origin}${trimmed}`)
    }
    // Local public asset — encode path segments only
    return trimmed
      .split('/')
      .map((segment, index) => (index === 0 || !segment ? segment : encodeURIComponent(segment)))
      .join('/')
  }

  // Bare storage-relative path from API
  if (origin) {
    return encodeImageUrl(`${origin}/storage/${trimmed.replace(/^\/+/, '')}`)
  }

  return DEFAULT_IMAGE
}

/** Map list of image paths, filtering out invalids and applying default when empty. */
export function resolveImageList(
  paths: Array<string | null | undefined> | null | undefined,
  options?: { apiOrigin?: string },
): string[] {
  if (!paths?.length) return [DEFAULT_IMAGE]
  const resolved = paths
    .map((p) => resolveImageUrl(p, options))
    .filter((url) => url !== DEFAULT_IMAGE)
  return resolved.length > 0 ? resolved : [DEFAULT_IMAGE]
}

function getApiOrigin(): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? ''
  try {
    if (!base) return ''
    const url = new URL(base)
    return url.origin
  } catch {
    return base.replace(/\/api\/?$/, '')
  }
}
