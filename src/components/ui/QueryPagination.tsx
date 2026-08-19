'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@/components/ui/Pagination'

export function QueryPagination({
  pathname,
  currentPage,
  totalPages,
  resultText,
}: {
  pathname: string
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
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
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
