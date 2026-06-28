interface PaginationProps {
  totalPages?: number
  currentPage?: number
  resultText?: string
}

export function Pagination({
  totalPages = 5,
  currentPage = 1,
  resultText,
}: PaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`min-h-8 min-w-8 rounded-md px-2 text-[0.8rem] transition duration-300 ${
              page === currentPage
                ? 'border border-brand-500 bg-brand-500 text-white'
                : 'border border-cjip-border bg-white text-content-main hover:bg-brand-200'
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && (
          <>
            <span className="px-1 text-content-muted">…</span>
            <button
              type="button"
              className="min-h-8 min-w-8 rounded-md border border-cjip-border bg-white px-2 text-[0.8rem] text-content-main transition duration-300 hover:bg-brand-200"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          type="button"
          className="min-h-8 rounded-md border border-cjip-border bg-white px-2 text-[0.8rem] text-content-main transition duration-300 hover:bg-brand-200"
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
