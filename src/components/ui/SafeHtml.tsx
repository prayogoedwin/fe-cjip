import { sanitizeHtml } from '@/lib/sanitize-html'

type SafeHtmlProps = {
  html: string | null | undefined
  className?: string
  /** Fallback when html is empty after sanitize. */
  fallback?: string
}

export function SafeHtml({ html, className, fallback = '' }: SafeHtmlProps) {
  const safe = sanitizeHtml(html) || fallback

  return <div className={className} dangerouslySetInnerHTML={{ __html: safe }} />
}
