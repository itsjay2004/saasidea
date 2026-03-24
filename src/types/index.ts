export type Idea = {
  id: string
  title: string
  tagline: string
  pain_point: string
  industry: string
  niche: string
  sub_niche: string
  tags: string[]
  target_audience: string
  mrr_potential: { min: number; max: number; currency: string }
  build_time_weeks: { min: number; max: number }
  pricing_model: string
  suggested_price: { amount: number; interval: string; currency: string }
  complexity: number
  difficulty_label: 'Easy' | 'Medium' | 'Hard'
  competition_level: 'low' | 'medium' | 'high'
  validation_note: string
  is_free: boolean
  keywords: string[]
  created_at: string
  primary_keyword?: Keyword | null
}

export type Keyword = {
  id: number
  keyword: string
  search_volume: number | null
  competition: string | null
  competition_index: number | null
  cpc: number | null
  low_top_of_page_bid: number | null
  high_top_of_page_bid: number | null
  monthly_searches: { year: number; month: number; search_volume: number }[] | null
  search_trend: 'growing' | 'stable' | 'declining' | null
}

export type IdeaWithKeywords = Idea & {
  all_keywords: Keyword[]
}

export type Filters = {
  industry?: string
  difficulty?: string
  competition?: string
  pricing_model?: string
  mrr_range?: string
  search?: string
  sort?: string
  page: number
}

export type Purchase = {
  id: string
  user_id: string
  email: string
  dodo_order_id: string
  amount: number
  currency: string
  status: string
  created_at: string
}
