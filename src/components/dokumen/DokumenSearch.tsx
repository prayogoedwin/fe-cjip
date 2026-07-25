'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SearchBox } from '@/components/ui/SearchBox'

export function DokumenSearch({ initialQuery = '' }: { initialQuery?: string }) {
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
    router.push(`/dokumen?${params.toString()}`)
  }

  return (
    <SearchBox
      placeholder="Cari dokumen..."
      className="w-full md:max-w-sm"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={submit}
    />
  )
}
