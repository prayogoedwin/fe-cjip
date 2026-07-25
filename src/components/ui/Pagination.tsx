'use client'

interface PaginationProps {
  totalPages?: number
  currentPage?: number
  resultText?: string
  onPageChange?: (page: number) => void
}

export function Pagination({
  totalPages = 1,
  currentPage = 1,
  resultText,
  onPageChange,
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages)
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal)

  const windowSize = 5
  let start = Math.max(1, safeCurrent - Math.floor(windowSize / 2))
  const end = Math.min(safeTotal, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  function go(page: number) {
    if (!onPageChange) return
    if (page < 1 || page > safeTotal || page === safeCurrent) return
    onPageChange(page)
  }

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => go(safeCurrent - 1)}
          disabled={safeCurrent <= 1}
          className="min-h-8 rounded-md border border-cjip-border bg-white px-2 text-[0.8rem] text-content-main transition duration-300 hover:bg-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => go(page)}
            className={`min-h-8 min-w-8 rounded-md px-2 text-[0.8rem] transition duration-300 ${
              page === safeCurrent
                ? 'border border-brand-500 bg-brand-500 text-white'
                : 'border border-cjip-border bg-white text-content-main hover:bg-brand-200'
            }`}
          >
            {page}
          </button>
        ))}
        {end < safeTotal && (
          <>
            <span className="px-1 text-content-muted">…</span>
            <button
              type="button"
              onClick={() => go(safeTotal)}
              className="min-h-8 min-w-8 rounded-md border border-cjip-border bg-white px-2 text-[0.8rem] text-content-main transition duration-300 hover:bg-brand-200"
            >
              {safeTotal}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => go(safeCurrent + 1)}
          disabled={safeCurrent >= safeTotal}
          className="min-h-8 rounded-md border border-cjip-border bg-white px-2 text-[0.8rem] text-content-main transition duration-300 hover:bg-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>
      </div>
      {resultText && (
        <p className="mt-2 text-right text-[0.78rem] text-content-muted">{resultText}</p>
      )}
    </div>
  )
}
