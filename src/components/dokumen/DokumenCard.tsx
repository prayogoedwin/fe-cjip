import Link from 'next/link'
import { SafeImage } from '@/components/ui/SafeImage'
import type { ApiDokumenItem } from '@/lib/api'

function PdfBadge() {
  return (
    <span className="flex items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white shadow">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
      PDF
    </span>
  )
}

function VideoBadge() {
  return (
    <span className="flex items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-white shadow">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      Video
    </span>
  )
}

export function DokumenCard({ item }: { item: ApiDokumenItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-neutral-100">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          {item.has_pdf ? <PdfBadge /> : null}
          {item.has_video ? <VideoBadge /> : null}
        </div>

        {item.thumbnail ? (
          <SafeImage
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : item.has_video ? (
          <div className="flex h-full items-center justify-center bg-neutral-200 text-brand-500">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-200 text-neutral-400">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {item.published_at ? (
          <div className="mb-2 flex items-center text-xs text-neutral-500">
            <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {item.published_at}
          </div>
        ) : null}

        <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-bold text-brand-900 transition-colors group-hover:text-brand-600">
          {item.title}
        </h3>

        {item.excerpt ? (
          <p className="mb-4 line-clamp-3 text-sm text-neutral-600">{item.excerpt}</p>
        ) : null}

        <div className="mt-auto flex gap-2 border-t border-brand-50 pt-4">
          {item.has_pdf ? (
            <Link
              href={`/dokumen/${item.slug}/pdf`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Lihat PDF
            </Link>
          ) : null}
          {item.has_video ? (
            <Link
              href={`/dokumen/${item.slug}/video`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100"
            >
              Tonton
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}
