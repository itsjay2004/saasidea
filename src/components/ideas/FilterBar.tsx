'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

interface FilterBarProps {
  industries: string[]
  currentFilters: {
    industry?: string
    difficulty?: string
    competition?: string
    mrr_range?: string
    pricing_model?: string
  }
}

const difficulties = ['Easy', 'Medium', 'Hard']
const competitions = ['Low', 'Medium', 'High']
const mrrRanges = [
  { label: 'Under $2K', value: 'under-2k' },
  { label: '$2K – $8K', value: '2k-8k' },
  { label: '$8K – $20K', value: '8k-20k' },
  { label: '$20K+', value: '20k-plus' },
]
const pricingModels = ['Subscription', 'One-time', 'Usage-based']

export default function FilterBar({ industries, currentFilters }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/ideas?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = () => {
    router.push('/ideas')
  }

  const hasFilters = Object.values(currentFilters).some(Boolean)

  const FilterContent = () => (
    <div className="space-y-6">
      <FilterSection title="Industry">
        <FilterRadio
          options={['All', ...industries]}
          selected={currentFilters.industry || 'All'}
          onChange={(v) => updateFilter('industry', v === 'All' ? undefined : v)}
        />
      </FilterSection>

      <FilterSection title="Difficulty">
        <FilterRadio
          options={['All', ...difficulties]}
          selected={currentFilters.difficulty || 'All'}
          onChange={(v) => updateFilter('difficulty', v === 'All' ? undefined : v)}
        />
      </FilterSection>

      <FilterSection title="Competition">
        <FilterRadio
          options={['All', ...competitions]}
          selected={currentFilters.competition || 'All'}
          onChange={(v) => updateFilter('competition', v === 'All' ? undefined : v)}
        />
      </FilterSection>

      <FilterSection title="MRR Potential">
        <FilterRadio
          options={['All', ...mrrRanges.map((r) => r.label)]}
          selected={mrrRanges.find((r) => r.value === currentFilters.mrr_range)?.label || 'All'}
          onChange={(v) => {
            const range = mrrRanges.find((r) => r.label === v)
            updateFilter('mrr_range', range?.value)
          }}
        />
      </FilterSection>

      <FilterSection title="Pricing Model">
        <FilterRadio
          options={['All', ...pricingModels]}
          selected={currentFilters.pricing_model || 'All'}
          onChange={(v) => updateFilter('pricing_model', v === 'All' ? undefined : v)}
        />
      </FilterSection>

      {hasFilters && (
        <button onClick={clearAll} className="text-xs text-accent hover:underline flex items-center gap-1">
          <X className="w-3 h-3" /> Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-20 space-y-4">
          <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </h3>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setMobileOpen(true)}>
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {hasFilters && <span className="w-2 h-2 rounded-full bg-accent" />}
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-text-primary">Filters</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <FilterContent />
            <Button className="w-full mt-6" onClick={() => setMobileOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-medium text-text-subtle uppercase tracking-wider mb-2"
      >
        {title}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && children}
    </div>
  )
}

function FilterRadio({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
            selected === option
              ? 'bg-accent/10 text-accent font-medium'
              : 'text-text-muted hover:bg-surface-2'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
