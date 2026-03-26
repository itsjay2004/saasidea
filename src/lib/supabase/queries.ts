import { createServerSupabaseClient } from './server'
import type { Idea, IdeaWithKeywords, Keyword, Filters } from '@/types'

const PAGE_SIZE = 24

function mapRawIdea(raw: any): Idea {
  return {
    id: raw.id,
    title: raw.title,
    tagline: raw.tagline,
    pain_point: raw.pain_point,
    industry: raw.industry,
    niche: raw.niche,
    sub_niche: raw.sub_niche,
    tags: raw.tags || [],
    target_audience: raw.target_audience,
    mrr_potential: {
      min: raw['mrr_potential.min'],
      max: raw['mrr_potential.max'],
      currency: raw['mrr_potential.currency'] || 'USD',
    },
    build_time_weeks: {
      min: raw['build_time_weeks.min'],
      max: raw['build_time_weeks.max'],
    },
    pricing_model: raw.pricing_model,
    suggested_price: {
      amount: raw['suggested_price.amount'],
      interval: raw['suggested_price.interval'],
      currency: raw['suggested_price.currency'] || 'USD',
    },
    complexity: raw.complexity,
    difficulty_label: raw.difficulty_label,
    competition_level: raw.competition_level,
    validation_note: raw.validation_note,
    is_free: raw.is_free,
    keywords: raw.keywords || [],
    created_at: raw.created_at,
    primary_keyword: raw.primary_keyword || null,
  }
}

function mapHighestVolumeKeyword(raw: any): Keyword | null {
  const keywords = (raw.keyword_idea_mapping || [])
    .map((mapping: any) => mapping?.keywords)
    .filter(Boolean) as Keyword[]

  if (keywords.length === 0) return null

  return keywords.reduce((highest, current) => {
    const highestVolume = highest.search_volume ?? -1
    const currentVolume = current.search_volume ?? -1
    return currentVolume > highestVolume ? current : highest
  })
}

export async function getIdeas(filters: Filters): Promise<{
  ideas: Idea[]
  total: number
  hasMore: boolean
}> {
  const supabase = await createServerSupabaseClient()
  const from = (filters.page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('ideas')
    .select(`
      id, title, tagline, pain_point, industry, niche, sub_niche, tags,
      target_audience, "mrr_potential.min", "mrr_potential.max", "mrr_potential.currency",
      "build_time_weeks.min", "build_time_weeks.max", pricing_model,
      "suggested_price.amount", "suggested_price.interval", "suggested_price.currency",
      complexity, difficulty_label, competition_level, validation_note, is_free, keywords, created_at,
      keyword_idea_mapping!inner(
        is_primary,
        keywords(id, keyword, search_volume, competition, competition_index, cpc, search_trend)
      )
    `, { count: 'exact' })

  if (filters.industry) {
    query = query.eq('industry', filters.industry)
  }
  if (filters.difficulty) {
    query = query.eq('difficulty_label', filters.difficulty)
  }
  if (filters.competition) {
    query = query.eq('competition_level', filters.competition.toLowerCase())
  }
  if (filters.pricing_model) {
    query = query.eq('pricing_model', filters.pricing_model)
  }
  if (filters.mrr_range) {
    switch (filters.mrr_range) {
      case 'under-2k':
        query = query.lt('"mrr_potential.max"', 2000)
        break
      case '2k-8k':
        query = query.gte('"mrr_potential.min"', 2000).lte('"mrr_potential.max"', 8000)
        break
      case '8k-20k':
        query = query.gte('"mrr_potential.min"', 8000).lte('"mrr_potential.max"', 20000)
        break
      case '20k-plus':
        query = query.gte('"mrr_potential.min"', 20000)
        break
    }
  }
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%,pain_point.ilike.%${filters.search}%`)
  }

  switch (filters.sort) {
    case 'mrr-high':
      query = query.order('"mrr_potential.max"', { ascending: false })
      break
    case 'build-time':
      query = query.order('"build_time_weeks.min"', { ascending: true })
      break
    case 'easiest':
      query = query.order('complexity', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error('Error fetching ideas:', error)
    return { ideas: [], total: 0, hasMore: false }
  }

  const ideas = (data || []).map((raw: any) => {
    const idea = mapRawIdea(raw)
    const highestVolumeKeyword = mapHighestVolumeKeyword(raw)
    if (highestVolumeKeyword) {
      idea.primary_keyword = highestVolumeKeyword
    }
    return idea
  })

  const total = count || 0
  return { ideas, total, hasMore: to < total - 1 }
}

export async function getIdeasSimple(filters: Filters): Promise<{
  ideas: Idea[]
  total: number
  hasMore: boolean
}> {
  const supabase = await createServerSupabaseClient()
  const from = (filters.page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('ideas')
    .select(`
      id, title, tagline, pain_point, industry, niche, sub_niche, tags,
      target_audience, "mrr_potential.min", "mrr_potential.max", "mrr_potential.currency",
      "build_time_weeks.min", "build_time_weeks.max", pricing_model,
      "suggested_price.amount", "suggested_price.interval", "suggested_price.currency",
      complexity, difficulty_label, competition_level, validation_note, is_free, keywords, created_at,
      keyword_idea_mapping(
        is_primary,
        keywords(id, keyword, search_volume, competition, competition_index, cpc, search_trend)
      )
    `, { count: 'exact' })

  if (filters.industry) {
    query = query.eq('industry', filters.industry)
  }
  if (filters.difficulty) {
    query = query.eq('difficulty_label', filters.difficulty)
  }
  if (filters.competition) {
    query = query.eq('competition_level', filters.competition.toLowerCase())
  }
  if (filters.pricing_model) {
    query = query.eq('pricing_model', filters.pricing_model)
  }
  if (filters.mrr_range) {
    switch (filters.mrr_range) {
      case 'under-2k':
        query = query.lt('"mrr_potential.max"', 2000)
        break
      case '2k-8k':
        query = query.gte('"mrr_potential.min"', 2000).lte('"mrr_potential.max"', 8000)
        break
      case '8k-20k':
        query = query.gte('"mrr_potential.min"', 8000).lte('"mrr_potential.max"', 20000)
        break
      case '20k-plus':
        query = query.gte('"mrr_potential.min"', 20000)
        break
    }
  }
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%,pain_point.ilike.%${filters.search}%`)
  }

  switch (filters.sort) {
    case 'mrr-high':
      query = query.order('"mrr_potential.max"', { ascending: false })
      break
    case 'build-time':
      query = query.order('"build_time_weeks.min"', { ascending: true })
      break
    case 'easiest':
      query = query.order('complexity', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error('Error fetching ideas:', error)
    return { ideas: [], total: 0, hasMore: false }
  }

  const ideas = (data || []).map((raw: any) => {
    const idea = mapRawIdea(raw)
    const highestVolumeKeyword = mapHighestVolumeKeyword(raw)
    if (highestVolumeKeyword) {
      idea.primary_keyword = highestVolumeKeyword
    }
    return idea
  })
  const total = count || 0
  return { ideas, total, hasMore: to < total - 1 }
}

export async function getIdeaById(id: string): Promise<IdeaWithKeywords | null> {
  const supabase = await createServerSupabaseClient()

  const { data: raw, error } = await supabase
    .from('ideas')
    .select(`
      id, title, tagline, pain_point, industry, niche, sub_niche, tags,
      target_audience, "mrr_potential.min", "mrr_potential.max", "mrr_potential.currency",
      "build_time_weeks.min", "build_time_weeks.max", pricing_model,
      "suggested_price.amount", "suggested_price.interval", "suggested_price.currency",
      complexity, difficulty_label, competition_level, validation_note, is_free, keywords, created_at,
      keyword_idea_mapping(
        is_primary,
        keywords(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error || !raw) return null

  const idea = mapRawIdea(raw) as IdeaWithKeywords
  const mappings = (raw as any).keyword_idea_mapping || []
  
  idea.all_keywords = mappings
    .filter((m: any) => m.keywords)
    .map((m: any) => ({ ...m.keywords, is_primary: m.is_primary }))
    .sort((a: any, b: any) => {
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      return (b.search_volume || 0) - (a.search_volume || 0)
    })

  const primary = idea.all_keywords.find((k: any) => (k as any).is_primary)
  if (primary) idea.primary_keyword = primary

  return idea
}

export async function getIndustries(): Promise<{ industry: string; count: number }[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('ideas')
    .select('industry')

  if (error || !data) return []

  const counts: Record<string, number> = {}
  data.forEach((row: any) => {
    counts[row.industry] = (counts[row.industry] || 0) + 1
  })

  return Object.entries(counts)
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getFreeIdeas(limit: number = 6): Promise<Idea[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('ideas')
    .select(`
      id, title, tagline, pain_point, industry, niche, sub_niche, tags,
      target_audience, "mrr_potential.min", "mrr_potential.max", "mrr_potential.currency",
      "build_time_weeks.min", "build_time_weeks.max", pricing_model,
      "suggested_price.amount", "suggested_price.interval", "suggested_price.currency",
      complexity, difficulty_label, competition_level, validation_note, is_free, keywords, created_at,
      keyword_idea_mapping(
        keywords(id, keyword, search_volume, competition, competition_index, cpc, search_trend)
      )
    `)
    .eq('is_free', true)
    .limit(limit)

  if (error || !data) return []
  return data.map((raw: any) => {
    const idea = mapRawIdea(raw)
    const highestVolumeKeyword = mapHighestVolumeKeyword(raw)
    if (highestVolumeKeyword) {
      idea.primary_keyword = highestVolumeKeyword
    }
    return idea
  })
}

export async function getPaidPreviewIdeas(limit: number = 3): Promise<Idea[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('ideas')
    .select(`
      id, title, tagline, pain_point, industry, niche, sub_niche, tags,
      target_audience, "mrr_potential.min", "mrr_potential.max", "mrr_potential.currency",
      "build_time_weeks.min", "build_time_weeks.max", pricing_model,
      "suggested_price.amount", "suggested_price.interval", "suggested_price.currency",
      complexity, difficulty_label, competition_level, validation_note, is_free, keywords, created_at,
      keyword_idea_mapping(
        keywords(id, keyword, search_volume, competition, competition_index, cpc, search_trend)
      )
    `)
    .eq('is_free', false)
    .limit(limit)

  if (error || !data) return []
  return data.map((raw: any) => {
    const idea = mapRawIdea(raw)
    const highestVolumeKeyword = mapHighestVolumeKeyword(raw)
    if (highestVolumeKeyword) {
      idea.primary_keyword = highestVolumeKeyword
    }
    return idea
  })
}

export async function getRelatedIdeas(niche: string, excludeId: string, limit: number = 3): Promise<Idea[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('ideas')
    .select(`
      id, title, tagline, pain_point, industry, niche, sub_niche, tags,
      target_audience, "mrr_potential.min", "mrr_potential.max", "mrr_potential.currency",
      "build_time_weeks.min", "build_time_weeks.max", pricing_model,
      "suggested_price.amount", "suggested_price.interval", "suggested_price.currency",
      complexity, difficulty_label, competition_level, validation_note, is_free, keywords, created_at
    `)
    .eq('niche', niche)
    .neq('id', excludeId)
    .limit(limit)

  if (error || !data) return []
  return data.map(mapRawIdea)
}

export async function hasAccess(userId: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .limit(1)
    .single()

  return !error && !!data
}

export async function getNicheStats(): Promise<{ niches: number; subNiches: number }> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('ideas')
    .select('niche, sub_niche')

  if (error || !data) return { niches: 0, subNiches: 0 }

  const niches = new Set<string>()
  const subNiches = new Set<string>()
  data.forEach((row: any) => {
    if (row.niche) niches.add(row.niche)
    if (row.sub_niche) subNiches.add(row.sub_niche)
  })

  return { niches: niches.size, subNiches: subNiches.size }
}

export async function getTotalIdeasCount(): Promise<number> {
  const supabase = await createServerSupabaseClient()
  const { count, error } = await supabase
    .from('ideas')
    .select('id', { count: 'exact', head: true })

  if (error) return 1200
  return count || 1200
}
