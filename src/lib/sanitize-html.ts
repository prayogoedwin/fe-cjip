import DOMPurify from 'isomorphic-dompurify'

/** Sanitize CMS / API HTML before dangerouslySetInnerHTML. */
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return ''

  return DOMPurify.sanitize(dirty, {
    ADD_ATTR: ['target', 'rel'],
    ALLOW_DATA_ATTR: false,
  })
}

/** Escape JSON-LD so `</script>` in strings cannot break out of the tag. */
export function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
