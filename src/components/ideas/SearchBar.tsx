'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')

  useEffect(() => {
    setValue(searchParams.get('search') || '')
  }, [searchParams])

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (query) {
        params.set('search', query)
      } else {
        params.delete('search')
      }
      params.delete('page')
      router.push(`/ideas?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
      <input
        type="text"
        placeholder="Search ideas..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 bg-surface-2 border border-border rounded-button text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
      {value && (
        <button
          type="button"
          onClick={() => { setValue(''); handleSearch('') }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="w-4 h-4 text-text-subtle hover:text-text-muted" />
        </button>
      )}
    </form>
  )
}
