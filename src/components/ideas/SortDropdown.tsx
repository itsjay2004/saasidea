'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'MRR High→Low', value: 'mrr-high' },
  { label: 'Build Time', value: 'build-time' },
  { label: 'Easiest First', value: 'easiest' },
]

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') || 'newest'

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'newest') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    router.push(`/ideas?${params.toString()}`)
  }

  return (
    <div className="relative w-full sm:w-auto">
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full sm:w-auto appearance-none bg-surface-2 border border-border rounded-button px-4 py-2 pr-8 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle pointer-events-none" />
    </div>
  )
}
