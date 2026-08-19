'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SearchBox } from '@/components/ui/SearchBox'

interface QuerySearchBoxProps {
  pathname: string
  placeholder?: string
  initialQuery?: string
  className?: string
}

export function QuerySearchBox({
  pathname,
  placeholder,
  initialQuery = '',
  className,
}: QuerySearchBoxProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)

  function submit() {
    const params = new URLSearchParams(searchParams.toString())
    const trimmed = query.trim()
    if (trimmed) {
      params.set('q', trimmed)
    } else {
      params.delete('q')
    }
    params.delete('page')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <SearchBox
      placeholder={placeholder}
      className={className}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={submit}
    />
  )
}
