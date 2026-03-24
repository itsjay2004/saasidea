import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowLeft, TrendingUp, TrendingDown, Minus, Clock, DollarSign,
  Gauge, Users, CreditCard, Sparkles, Search, ChevronRight,
  AlertCircle, Target,
} from 'lucide-react'
import { getIdeaById, getRelatedIdeas, hasAccess } from '@/lib/supabase/queries'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import {
  formatMrrShort, formatBuildTime, formatNumber,
  INDUSTRY_COLORS, DIFFICULTY_STYLES,
} from '@/lib/utils'
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

  const relatedIdeas = await getRelatedIdeas(idea.niche, idea.id, 4)

  const indColors = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-500/20' }
  const diffStyle = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }

  const TrendIcon =
    idea.primary_keyword?.search_trend === 'growing' ? TrendingUp :
    idea.primary_keyword?.search_trend === 'declining' ? TrendingDown : Minus

  const compLabel = idea.competition_level === 'low' ? 'Low' : idea.competition_level === 'medium' ? 'Medium' : 'High'
  const compFilled = idea.competition_level === 'low' ? 1 : idea.competition_level === 'medium' ? 2 : 3
  const compColor = idea.competition_level === 'low' ? 'bg-emerald-500' : idea.competition_level === 'medium' ? 'bg-amber-400' : 'bg-red-500'
  const compTextColor = idea.competition_level === 'low'
    ? 'text-emerald-700 dark:text-emerald-400'
    : idea.competition_level === 'medium'
    ? 'text-amber-700 dark:text-amber-400'
    : 'text-red-700 dark:text-red-400'
  const compDescription = idea.competition_level === 'low'
    ? 'Low competition — a good window to enter this market early.'
    : idea.competition_level === 'medium'
    ? 'Moderate competition — differentiation will be key to success.'
    : 'High competition — a strong niche or unique angle is essential.'

  const hasVolumeData = idea.all_keywords && idea.all_keywords.length > 0
  const hasRawKeywords = !hasVolumeData && idea.keywords && idea.keywords.length > 0

  const kwsWithCpc = hasVolumeData ? idea.all_keywords.filter(k => k.cpc != null) : []
  const bestEntry = hasVolumeData
    ? idea.all_keywords
        .filter(k => k.competition_index != null)
        .sort((a, b) => (a.competition_index || 999) - (b.competition_index || 999))[0]
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back nav */}
      <Link
        href="/ideas"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
        All Ideas
      </Link>

      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <header className="mb-10">
        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap gap-1 text-xs text-text-subtle mb-5">
          <Link
            href={`/ideas?industry=${encodeURIComponent(idea.industry)}`}
            className={`font-semibold hover:underline underline-offset-2 ${indColors.text}`}
          >
            {idea.industry}
          </Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span>{idea.niche}</span>
          {idea.sub_niche && (
            <>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span>{idea.sub_niche}</span>
            </>
          )}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4 leading-tight">
          {idea.title}
        </h1>
        <p className="text-text-muted text-lg sm:text-xl leading-relaxed max-w-3xl mb-6">
          {idea.tagline}
        </p>

        {/* Meta card */}
        <div className="bg-surface border border-border rounded-2xl px-6 py-5">
          <div className="flex flex-wrap gap-x-8 gap-y-4">

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-subtle">Industry</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start ${indColors.bg} ${indColors.text}`}>
                {idea.industry}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-subtle">Competition</span>
              <Badge variant={idea.competition_level === 'low' ? 'success' : idea.competition_level === 'medium' ? 'warning' : 'danger'}>
                {compLabel}
              </Badge>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-subtle">Difficulty</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start ${diffStyle.bg} ${diffStyle.text}`}>
                {idea.difficulty_label}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-subtle">Pricing Model</span>
              <Badge>{idea.pricing_model}</Badge>
            </div>

            {idea.primary_keyword?.search_trend && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-text-subtle">SEO Trend</span>
                <Badge variant={idea.primary_keyword.search_trend === 'growing' ? 'success' : idea.primary_keyword.search_trend === 'declining' ? 'danger' : 'info'}>
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {idea.primary_keyword.search_trend}
                </Badge>
              </div>
            )}

          </div>

          {idea.tags && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/50">
              {idea.tags.slice(0, 6).map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-surface-2 text-text-subtle">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <PaywallBlur locked={!unlocked}>
        <div className="grid lg:grid-cols-[1fr_296px] gap-8 items-start">

          {/* Left column — main content */}
          <div className="space-y-6 min-w-0">

            {/* The Problem */}
            <section>
              <SectionLabel icon={AlertCircle} label="The Problem" />
              <div className="bg-surface border border-border rounded-2xl p-6">
                <p className="text-text-primary text-[15px] leading-[1.85]">{idea.pain_point}</p>
              </div>
            </section>

            {/* Why It Works */}
            {idea.validation_note && (
              <section>
                <SectionLabel icon={Sparkles} label="Why It Works" accent />
                <div className="relative bg-accent-subtle dark:bg-accent/8 border border-accent/20 rounded-2xl p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-accent rounded-l-2xl" />
                  <p className="text-text-primary text-[15px] leading-[1.9] italic pl-1">
                    &ldquo;{idea.validation_note}&rdquo;
                  </p>
                </div>
              </section>
            )}

            {/* Keywords — with full volume data */}
            {hasVolumeData && (
              <section>
                <SectionLabel icon={Search} label="Keyword Opportunities" />

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <StatTile
                    label="Total Search Pool"
                    value={formatNumber(idea.all_keywords.reduce((s, k) => s + (k.search_volume || 0), 0)) + '/mo'}
                  />
                  {kwsWithCpc.length > 0 ? (
                    <StatTile
                      label="CPC Range"
                      value={`$${Math.min(...kwsWithCpc.map(k => k.cpc!)).toFixed(2)} – $${Math.max(...kwsWithCpc.map(k => k.cpc!)).toFixed(2)}`}
                    />
                  ) : <div />}
                  {bestEntry ? (
                    <StatTile label="Easiest Entry" value={bestEntry.keyword} small />
                  ) : <div />}
                </div>

                {/* Keyword table */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-4">
                  <KeywordTable keywords={idea.all_keywords} />
                </div>

                {/* Trend chart */}
                {idea.primary_keyword?.monthly_searches && idea.primary_keyword.monthly_searches.length > 0 && (
                  <div className="bg-surface border border-border rounded-2xl p-5">
                    <p className="text-sm font-semibold text-text-primary mb-4">
                      Search Trend: &ldquo;{idea.primary_keyword.keyword}&rdquo;
                    </p>
                    <TrendChart
                      data={idea.primary_keyword.monthly_searches}
                      trend={idea.primary_keyword.search_trend}
                    />
                  </div>
                )}
              </section>
            )}

            {/* Keywords — raw strings only (entry opportunities) */}
            {hasRawKeywords && (
              <section>
                <SectionLabel icon={Target} label="Entry Opportunity Keywords" />
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <p className="text-[14px] text-text-muted leading-relaxed mb-5">
                    These are the search terms your target users are actively looking for.
                    Use them as starting points for your landing page copy, content strategy, and SEO efforts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {idea.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium bg-accent-subtle dark:bg-accent/10 text-accent border border-accent/20"
                      >
                        <Search className="w-3 h-3 shrink-0 opacity-60" />
                        {kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-text-subtle flex items-center gap-1.5 border-t border-border/60 pt-4">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    Search volume &amp; competition data not yet analyzed for this idea.
                  </p>
                </div>
              </section>
            )}

          </div>

          {/* Right column — sticky sidebar */}
          <aside className="lg:sticky lg:top-8 space-y-4">

            {/* Quick Metrics */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card">
              <div className="px-5 py-3.5 border-b border-border bg-surface-alt">
                <p className="text-[11px] font-bold uppercase tracking-widest text-text-subtle">Quick Metrics</p>
              </div>
              <div className="divide-y divide-border/50">
                <MetricRow icon={DollarSign} label="MRR Potential" value={formatMrrShort(idea.mrr_potential.min, idea.mrr_potential.max) + '/mo'} highlight />
                <MetricRow icon={Clock} label="Build Time" value={formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max)} />
                <MetricRow icon={CreditCard} label="Price Point" value={`$${idea.suggested_price.amount}/${idea.suggested_price.interval}`} />
                <MetricRow icon={Gauge} label="Complexity" value={`${idea.complexity} / 5`} />
                {/* Target audience — right-aligned value */}
                <div className="flex items-start justify-between gap-4 px-5 py-3.5">
                  <div className="flex items-center gap-2 shrink-0">
                    <Users className="w-3.5 h-3.5 text-text-subtle shrink-0" />
                    <span className="text-[13px] text-text-muted whitespace-nowrap">Target Audience</span>
                  </div>
                  <p className="text-[13px] font-semibold text-text-primary leading-snug text-right">
                    {idea.target_audience}
                  </p>
                </div>
              </div>
            </div>

            {/* Market Competition */}
            <div className="bg-surface border border-border rounded-2xl p-5 shadow-card">
              <p className="text-[11px] font-bold uppercase tracking-widest text-text-subtle mb-3">Market Competition</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-[4px]">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-[6px] rounded-sm transition-colors ${i <= compFilled ? compColor : 'bg-border dark:bg-border'}`}
                    />
                  ))}
                </div>
                <span className={`text-sm font-bold ${compTextColor}`}>{compLabel}</span>
              </div>
              <p className="text-[13px] text-text-muted leading-relaxed">{compDescription}</p>
            </div>


          </aside>
        </div>
      </PaywallBlur>

      {/* ── More Ideas ──────────────────────────────────────────────────── */}
      {relatedIdeas.length > 0 && (
        <div className="mt-16 pt-10 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold text-text-primary">
              More in <span className="text-accent">{idea.niche}</span>
            </h2>
            <Link
              href={`/ideas?industry=${encodeURIComponent(idea.industry)}`}
              className="text-sm text-accent hover:underline underline-offset-2 flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {relatedIdeas.map((related) => (
              <IdeaCard key={related.id} idea={related} hasAccess={userHasAccess} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

/* ─── Helper components ─────────────────────────────────────────────────── */

function SectionLabel({ icon: Icon, label, accent }: { icon: React.ElementType; label: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-4 h-4 ${accent ? 'text-accent' : 'text-text-subtle'}`} />
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-text-subtle">{label}</h2>
    </div>
  )
}

function MetricRow({
  icon: Icon, label, value, highlight,
}: {
  icon: React.ElementType; label: string; value: string; highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3.5">
      <div className="flex items-center gap-2 min-w-0">
        <Icon className="w-3.5 h-3.5 text-text-subtle shrink-0" />
        <span className="text-[13px] text-text-muted truncate">{label}</span>
      </div>
      <span className={`text-right shrink-0 ${
        highlight
          ? 'text-[14px] font-bold text-accent'
          : 'text-[13px] font-semibold text-text-primary'
      }`}>
        {value}
      </span>
    </div>
  )
}

function StatTile({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <p className="text-[11px] text-text-subtle uppercase tracking-wider mb-1.5 font-medium leading-tight">{label}</p>
      <p className={`font-bold text-text-primary truncate ${small ? 'text-[13px]' : 'text-base'}`}>{value}</p>
    </div>
  )
}
