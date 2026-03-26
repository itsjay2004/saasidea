import Link from 'next/link'
import { Lock, ArrowRight, Sparkles, Search, Lightbulb } from 'lucide-react'
import Button from '@/components/ui/Button'
import CrawlableLink from './CrawlableLink'
import { INDUSTRY_COLORS, DIFFICULTY_STYLES, formatMrrShort, formatBuildTime, formatNumber } from '@/lib/utils'
import type { Idea } from '@/types'

interface PreviewSectionProps {
  ideas: Idea[]
  lockedIdeas: Idea[]
}

function CompetitionSegments({ level }: { level: string }) {
  const filled = level === 'low' ? 1 : level === 'medium' ? 2 : 3
  const color = level === 'low'
    ? 'bg-emerald-500'
    : level === 'medium'
      ? 'bg-amber-400'
      : 'bg-red-500'
  const labelColor = level === 'low'
    ? 'text-emerald-700 dark:text-emerald-400'
    : level === 'medium'
      ? 'text-amber-700 dark:text-amber-400'
      : 'text-red-700 dark:text-red-400'
  const label = level === 'low' ? 'Low' : level === 'medium' ? 'Medium' : 'High'

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[3px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`w-5 h-[5px] rounded-sm ${i <= filled ? color : 'bg-border-light dark:bg-border'}`} />
        ))}
      </div>
      <span className={`text-[12px] font-semibold ${labelColor}`}>{label}</span>
    </div>
  )
}

function KeywordDisplay({ idea }: { idea: Idea }) {
  const highestVolumeKeyword = idea.primary_keyword

  if (highestVolumeKeyword) {
    const vol = highestVolumeKeyword.search_volume
    return (
      <div className="flex items-start gap-2">
        <Search className="w-3.5 h-3.5 text-text-subtle mt-0.5 shrink-0" />
        <div>
          {vol ? (
            <>
              <span className="text-[13px] font-bold text-text-primary">{formatNumber(vol)}/mo</span>
              <span className="text-[11px] text-text-subtle ml-1.5">searches</span>
              <div className="text-[11px] text-text-muted mt-0.5 truncate max-w-[160px]">
                &ldquo;{highestVolumeKeyword.keyword}&rdquo;
              </div>
            </>
          ) : (
            <span className="text-[13px] font-semibold text-text-primary truncate max-w-[160px]">
              &ldquo;{highestVolumeKeyword.keyword}&rdquo;
            </span>
          )}
        </div>
      </div>
    )
  }

  if (idea.keywords && idea.keywords.length > 0) {
    return (
      <div className="flex items-start gap-2">
        <Search className="w-3.5 h-3.5 text-text-subtle mt-0.5 shrink-0" />
        <div>
          <span className="text-[13px] font-bold text-text-primary">{idea.keywords.length} keywords</span>
          <div className="text-[11px] text-text-subtle mt-0.5">no volume data yet</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Search className="w-3.5 h-3.5 text-text-subtle shrink-0" />
      <span className="text-[12px] text-text-subtle italic">Not yet tracked</span>
    </div>
  )
}

function IdeaCardPreview({ idea }: { idea: Idea }) {
  const ind = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }
  const diff = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-md hover:-translate-y-0.5 hover:border-border-light transition-all duration-200">

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5">

        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ind.bg} ${ind.text}`}>
            {idea.industry}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${diff.bg} ${diff.text}`}>
            {idea.difficulty_label}
          </span>
        </div>

        <h3 className="font-bold text-text-primary text-[15px] leading-snug mb-2">
          {idea.title}
        </h3>

        <p className="text-text-muted text-sm leading-[1.65] line-clamp-2 mb-4">
          {idea.tagline}
        </p>

        {idea.validation_note && (
          <div className="bg-accent-subtle dark:bg-accent-light/15 border border-accent/12 rounded-xl px-4 py-3.5 mb-5">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-accent shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Why It Works</span>
            </div>
            <p className="text-[13px] text-text-muted leading-[1.75]">
              {idea.validation_note}
            </p>
          </div>
        )}

        <div className="border-t border-border/60 pt-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'MRR Est.', value: formatMrrShort(idea.mrr_potential.min, idea.mrr_potential.max) },
              { label: 'Build', value: formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max) },
              { label: 'Price', value: `$${idea.suggested_price.amount}/${idea.suggested_price.interval}` },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1 font-semibold">{label}</div>
                <div className="text-[13px] font-bold text-text-primary">{value}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 pt-3.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1.5 font-semibold">Competition</div>
                <CompetitionSegments level={idea.competition_level} />
                {idea.tags && idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {idea.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-surface-2 text-text-subtle">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1.5 font-semibold">Keyword</div>
                <div className="flex justify-end">
                  <KeywordDisplay idea={idea} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LockedCard({ idea }: { idea: Idea }) {
  const ind = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }
  const diff = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }

  return (
    <div className="relative glass-card rounded-2xl overflow-hidden shadow-card">
      <div className="p-5 select-none pointer-events-none" aria-hidden>

        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ind.bg} ${ind.text}`}>{idea.industry}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${diff.bg} ${diff.text}`}>{idea.difficulty_label}</span>
        </div>

        <div className="blur-[6px]">
          <div className="font-bold text-text-primary text-[15px] leading-snug mb-2">
            {idea.title}
          </div>
          <p className="text-text-muted text-sm leading-[1.65] mb-4">
            {idea.tagline}
          </p>
          <div className="bg-accent-subtle dark:bg-accent-light/15 border border-accent/12 rounded-xl px-4 py-3.5 mb-5">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Why It Works</span>
            </div>
            <p className="text-[13px] text-text-muted leading-[1.75]">
              {idea.validation_note || 'There is strong market validation for this idea because founders in this space have already proven demand through early traction and paying customers.'}
            </p>
          </div>
          <div className="border-t border-border/60 pt-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {['MRR Est.', 'Build', 'Price'].map((l) => (
                <div key={l}>
                  <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1 font-semibold">{l}</div>
                  <div className="h-4 w-10 bg-surface-2 rounded" />
                </div>
              ))}
            </div>
            <div className="border-t border-border/40 pt-3.5 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1.5 font-semibold">Competition</div>
                <div className="flex gap-[3px]">
                  {[1, 2, 3].map(i => <div key={i} className="w-5 h-[5px] rounded-sm bg-border" />)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1.5 font-semibold">Keyword</div>
                <div className="h-3.5 w-16 bg-surface-2 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-accent/40 from-surface via-surface/92 to-surface/10 flex flex-col items-center justify-end pb-8 gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-border shadow-card">
          <Lock className="w-4 h-4 text-text-subtle" />
        </div>
        <p className="text-sm font-semibold text-text-primary">This idea is locked</p>
        <p className="text-xs text-text-muted -mt-1 text-center px-6">Unlock all 1,200+ ideas with one payment</p>
        <Link href="/#pricing">
          <Button size="sm" className="mt-1">Get Access</Button>
        </Link>
      </div>
    </div>
  )
}

export default function PreviewSection({ ideas, lockedIdeas }: PreviewSectionProps) {
  if (ideas.length === 0) return null

  return (
    <section id="preview" className="relative py-14 sm:py-24 bg-background section-glow overflow-hidden">
      <div className="orb orb-purple top-[8%] left-[-3%] w-[450px] h-[450px]" />
      <div className="orb orb-cyan bottom-[5%] right-[5%] w-[400px] h-[400px]" />
      <div className="orb orb-violet top-[50%] right-[-5%] w-[350px] h-[350px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-subtle border border-accent/15 text-xs font-semibold text-accent tracking-wide uppercase mb-5">
            <Lightbulb className="w-3.5 h-3.5" />
            PREVIEW
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            A Glimpse of What&apos;s Inside
          </h2>
          <p className="text-text-muted max-w-md mx-auto text-base leading-relaxed">
            Browse a small sample of the 1,200+ ideas waiting for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {ideas.map((idea) => (
            <CrawlableLink key={idea.id} href={`/ideas/${idea.id}`} className="block">
              <IdeaCardPreview idea={idea} />
            </CrawlableLink>
          ))}
          {lockedIdeas.map((idea) => (
            <LockedCard key={idea.id} idea={idea} />
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent-light p-5 sm:p-8 text-center dark:border-accent/30 dark:bg-accent-light/25">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-accent/12 dark:from-accent/10 dark:via-transparent dark:to-accent/20" />
          <p className="font-heading text-lg sm:text-xl font-bold text-text-primary mb-1.5 relative">
            You&apos;re seeing {ideas.length} of 1,200+ ideas
          </p>
          <p className="text-text-muted text-sm sm:text-base mb-5 sm:mb-6 relative">Get instant access to the full library</p>
          <Link href="/#pricing" className="block sm:inline-block">
            <Button size="lg" className="gap-2 relative w-full sm:w-auto">
              Unlock All Ideas <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
