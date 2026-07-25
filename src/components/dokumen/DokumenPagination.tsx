'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@/components/ui/Pagination'

export function DokumenPagination({
  currentPage,
  totalPages,
  resultText,
}: {
  currentPage: number
  totalPages: number
  resultText?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function go(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    router.push(`/dokumen?${params.toString()}`)
  }

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      resultText={resultText}
      onPageChange={go}
    />
  )
}

export function DokumenPaginationLinks({
  currentPage,
  totalPages,
  query,
}: {
  currentPage: number
  totalPages: number
  query?: string
}) {
  function href(page: number) {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return qs ? `/dokumen?${qs}` : '/dokumen'
  }

  if (totalPages <= 1) return null

  return (
    <div className="mt-8 flex justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={href(currentPage - 1)}
          className="rounded-lg border border-brand-100 px-4 py-2 text-sm text-brand-800 hover:bg-brand-50"
        >
          ← Sebelumnya
        </Link>
      ) : null}
      <span className="flex items-center px-3 text-sm text-neutral-500">
        Halaman {currentPage} dari {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={href(currentPage + 1)}
          className="rounded-lg border border-brand-100 px-4 py-2 text-sm text-brand-800 hover:bg-brand-50"
        >
          Selanjutnya →
        </Link>
      ) : null}
    </div>
  )
}
