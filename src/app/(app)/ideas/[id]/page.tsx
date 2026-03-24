import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Clock, Target, DollarSign, Gauge, Users, CreditCard } from 'lucide-react'
import { getIdeaById, getRelatedIdeas, hasAccess } from '@/lib/supabase/queries'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatMrrRange, formatBuildTime, formatNumber, INDUSTRY_COLORS, DIFFICULTY_STYLES } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import KeywordTable from '@/components/ideas/KeywordTable'
import TrendChart from '@/components/ideas/TrendChart'
import IdeaCard from '@/components/ideas/IdeaCard'
import PaywallBlur from '@/components/ideas/PaywallBlur'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const idea = await getIdeaById(id)
  if (!idea) return { title: 'Idea Not Found — SaaSIdea Pro' }
  return {
    title: `${idea.title} — SaaS Idea | SaaSIdea Pro`,
    description: idea.tagline,
  }
}

export default async function IdeaPage({ params }: PageProps) {
  const { id } = await params
  const idea = await getIdeaById(id)
  if (!idea) notFound()

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userHasAccess = user ? await hasAccess(user.id) : false
  const unlocked = idea.is_free || userHasAccess

  const relatedIdeas = await getRelatedIdeas(idea.niche, idea.id, 3)

  const indColors = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-400' }
  const diffStyle = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-900/50', text: 'text-gray-400' }

  const trendIcon = idea.primary_keyword?.search_trend === 'growing'
    ? TrendingUp
    : idea.primary_keyword?.search_trend === 'declining'
    ? TrendingDown
    : Minus

  const TrendIcon = trendIcon

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/ideas" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> All Ideas
      </Link>

      <div className="text-xs text-text-subtle mb-4">
        <Link href={`/ideas?industry=${encodeURIComponent(idea.industry)}`} className="hover:text-accent">{idea.industry}</Link>
        {' / '}
        <span>{idea.niche}</span>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-3">{idea.title}</h1>
      <p className="text-text-muted text-lg mb-6">{idea.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${indColors.bg} ${indColors.text}`}>
          {idea.industry}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${diffStyle.bg} ${diffStyle.text}`}>
          {idea.difficulty_label}
        </span>
        <Badge variant={idea.competition_level === 'low' ? 'success' : idea.competition_level === 'medium' ? 'warning' : 'danger'}>
          {idea.competition_level} competition
        </Badge>
        <Badge>{idea.pricing_model}</Badge>
        {idea.primary_keyword?.search_trend && (
          <Badge variant={idea.primary_keyword.search_trend === 'growing' ? 'success' : idea.primary_keyword.search_trend === 'declining' ? 'danger' : 'info'}>
            <TrendIcon className="w-3 h-3 mr-1" />
            {idea.primary_keyword.search_trend}
          </Badge>
        )}
      </div>

      <PaywallBlur locked={!unlocked}>
        {/* Pain Point */}
        <div className="border-l-4 border-accent bg-accent/5 rounded-r-lg p-5 mb-8">
          <p className="text-xs font-medium text-accent uppercase tracking-wider mb-2">The Problem</p>
          <p className="text-text-primary leading-relaxed">{idea.pain_point}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <MetricCard icon={DollarSign} label="MRR Potential" value={formatMrrRange(idea.mrr_potential.min, idea.mrr_potential.max, idea.mrr_potential.currency) + '/mo'} />
          <MetricCard icon={Clock} label="Build Time" value={formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max)} />
          <MetricCard icon={CreditCard} label="Suggested Price" value={`$${idea.suggested_price.amount}/${idea.suggested_price.interval}`} />
          <MetricCard icon={Gauge} label="Complexity" value={`${idea.complexity}/5`} />
          <MetricCard icon={Users} label="Target Audience" value={idea.target_audience} />
          <MetricCard icon={Target} label="Pricing Model" value={idea.pricing_model} />
        </div>

        {/* Validation Note */}
        {idea.validation_note && (
          <div className="bg-surface border border-border rounded-card-lg p-5 mb-8">
            <p className="text-xs font-medium text-text-subtle uppercase tracking-wider mb-2">Why this idea has demand</p>
            <p className="text-text-muted leading-relaxed italic">&ldquo;{idea.validation_note}&rdquo;</p>
          </div>
        )}

        {/* Keywords Section */}
        {idea.all_keywords && idea.all_keywords.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Keyword Opportunities</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-surface border border-border rounded-card p-4 text-center">
                <p className="text-xs text-text-subtle mb-1">Total Search Pool</p>
                <p className="text-lg font-bold text-text-primary">
                  {formatNumber(idea.all_keywords.reduce((sum, kw) => sum + (kw.search_volume || 0), 0))}/mo
                </p>
              </div>
              <div className="bg-surface border border-border rounded-card p-4 text-center">
                <p className="text-xs text-text-subtle mb-1">CPC Range</p>
                <p className="text-lg font-bold text-text-primary">
                  ${Math.min(...idea.all_keywords.filter(k => k.cpc).map(k => k.cpc!)).toFixed(2)} – ${Math.max(...idea.all_keywords.filter(k => k.cpc).map(k => k.cpc!)).toFixed(2)}
                </p>
              </div>
              <div className="bg-surface border border-border rounded-card p-4 text-center">
                <p className="text-xs text-text-subtle mb-1">Best Entry Point</p>
                <p className="text-sm font-bold text-text-primary truncate">
                  {idea.all_keywords.filter(k => k.competition_index != null).sort((a, b) => (a.competition_index || 999) - (b.competition_index || 999))[0]?.keyword || '—'}
                </p>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-card-lg overflow-hidden mb-6">
              <KeywordTable keywords={idea.all_keywords} />
            </div>

            {idea.primary_keyword?.monthly_searches && idea.primary_keyword.monthly_searches.length > 0 && (
              <div className="bg-surface border border-border rounded-card-lg p-5">
                <h3 className="text-sm font-medium text-text-primary mb-4">
                  Search Trend: &ldquo;{idea.primary_keyword.keyword}&rdquo;
                </h3>
                <TrendChart
                  data={idea.primary_keyword.monthly_searches}
                  trend={idea.primary_keyword.search_trend}
                />
              </div>
            )}
          </div>
        )}
      </PaywallBlur>

      {/* Related Ideas */}
      {relatedIdeas.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
            More ideas in {idea.niche}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedIdeas.map((related) => (
              <IdeaCard key={related.id} idea={related} hasAccess={userHasAccess} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-text-subtle" />
        <span className="text-xs text-text-subtle">{label}</span>
      </div>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </div>
  )
}
