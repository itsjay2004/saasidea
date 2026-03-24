import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getIdeasSimple, getIndustries, hasAccess } from '@/lib/supabase/queries'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import IdeaGrid from '@/components/ideas/IdeaGrid'
import FilterBar from '@/components/ideas/FilterBar'
import SearchBar from '@/components/ideas/SearchBar'
import SortDropdown from '@/components/ideas/SortDropdown'
import Pagination from '@/components/ideas/Pagination'
import type { Filters } from '@/types'

export const metadata: Metadata = {
  title: 'Browse SaaS Ideas Library — SaaSIdea Pro',
  description: 'Browse 1,200+ validated SaaS ideas. Filter by industry, difficulty, MRR potential, and competition level.',
}

interface PageProps {
  searchParams: Promise<{
    industry?: string
    difficulty?: string
    competition?: string
    mrr_range?: string
    pricing_model?: string
    search?: string
    sort?: string
    page?: string
  }>
}

export default async function IdeasPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const filters: Filters = {
    industry: sp.industry,
    difficulty: sp.difficulty,
    competition: sp.competition,
    mrr_range: sp.mrr_range,
    pricing_model: sp.pricing_model,
    search: sp.search,
    sort: sp.sort,
    page: parseInt(sp.page || '1', 10),
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userHasAccess = user ? await hasAccess(user.id) : false

  const [{ ideas, total, hasMore }, industriesData] = await Promise.all([
    getIdeasSimple(filters),
    getIndustries(),
  ])

  const totalPages = Math.ceil(total / 24)
  const industryNames = industriesData.map((i) => i.industry)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">SaaS Idea Library</h1>
        <p className="text-text-muted">Browse {total > 0 ? total.toLocaleString() : '1,200+'} validated ideas</p>
      </div>

      <div className="mb-6 max-w-md">
        <Suspense fallback={<div className="h-10 bg-surface-2 rounded-button animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="flex gap-8">
        <Suspense fallback={<div className="hidden lg:block w-60 shrink-0" />}>
          <FilterBar
            industries={industryNames}
            currentFilters={{
              industry: filters.industry,
              difficulty: filters.difficulty,
              competition: filters.competition,
              mrr_range: filters.mrr_range,
              pricing_model: filters.pricing_model,
            }}
          />
        </Suspense>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-text-muted">
              {total > 0 ? `${total.toLocaleString()} ideas found` : 'No ideas found'}
            </p>
            <Suspense fallback={<div className="w-32 h-9 bg-surface-2 rounded-button animate-pulse" />}>
              <SortDropdown />
            </Suspense>
          </div>

          <IdeaGrid ideas={ideas} hasAccess={userHasAccess} />

          <Suspense fallback={null}>
            <Pagination currentPage={filters.page} totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
