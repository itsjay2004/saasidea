'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Lock, Search, Sparkles } from 'lucide-react'
import { INDUSTRY_COLORS, DIFFICULTY_STYLES, formatMrrShort, formatBuildTime, formatNumber } from '@/lib/utils'
import type { Idea } from '@/types'
import AuthModal from '@/components/auth/AuthModal'

interface IdeaCardProps {
  idea: Idea
  hasAccess: boolean
}

/* ─── Competition segments ──────────────────────────────────────────────── */
function CompetitionSegments({ level }: { level: string }) {
  const filled = level === 'low' ? 1 : level === 'medium' ? 2 : 3
  const color  = level === 'low' ? 'bg-emerald-500' : level === 'medium' ? 'bg-amber-400' : 'bg-red-500'
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

/* ─── Keyword display ───────────────────────────────────────────────────── */
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
              <div className="text-[11px] text-text-muted mt-0.5 truncate max-w-[140px]">
                &ldquo;{highestVolumeKeyword.keyword}&rdquo;
              </div>
            </>
          ) : (
            <span className="text-[13px] font-semibold text-text-primary truncate max-w-[140px]">
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

/* ─── Truncate to N words ───────────────────────────────────────────────── */
function truncateWords(text: string, max: number): string {
  const words = text.split(/\s+/)
  if (words.length <= max) return text
  return words.slice(0, max).join(' ') + '\u2026'
}

/* ─── Locked teaser card ────────────────────────────────────────────────── */
function LockedIdeaCard({ idea }: { idea: Idea }) {
  const [showAuth, setShowAuth] = useState(false)
  const ind  = INDUSTRY_COLORS[idea.industry]          || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }
  const diff = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }

  return (
    <div className="group relative bg-surface border border-border rounded-2xl overflow-hidden shadow-card">
      <div className="p-5">

        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ind.bg} ${ind.text}`}>
            {idea.industry}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${diff.bg} ${diff.text}`}>
            {idea.difficulty_label}
          </span>
        </div>

        <h3 className="font-bold text-text-primary text-[15px] leading-snug mb-1.5">
          {truncateWords(idea.title, 3)}
        </h3>

        <p className="text-text-muted text-sm leading-[1.65] mb-3">
          {truncateWords(idea.tagline, 5)}
        </p>

        {idea.validation_note && (
          <div className="relative mb-4">
            <div className="bg-accent-subtle dark:bg-accent-light/15 border border-accent/12 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3 h-3 text-accent shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Why It Works</span>
              </div>
              <p className="text-[13px] text-text-muted leading-[1.75] line-clamp-2">
                {idea.validation_note}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface to-transparent rounded-b-xl" />
          </div>
        )}

        <div className="flex flex-col items-center gap-2 py-4 border-t border-border/60">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-2 border border-border shadow-card">
            <Lock className="w-4 h-4 text-text-subtle" />
          </div>
          <p className="text-xs font-semibold text-text-primary">Unlock full details</p>
          <button
            onClick={() => setShowAuth(true)}
            className="text-xs font-semibold text-accent flex items-center gap-1 hover:gap-1.5 transition-all duration-150"
          >
            Get Access <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}

/* ─── Card ──────────────────────────────────────────────────────────────── */
export default function IdeaCard({ idea, hasAccess }: IdeaCardProps) {
  const unlocked = idea.is_free || hasAccess

  if (!unlocked) return <LockedIdeaCard idea={idea} />

  const ind  = INDUSTRY_COLORS[idea.industry]          || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }
  const diff = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' }

  return (
    <div className="group relative bg-surface border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-md hover:-translate-y-0.5 hover:border-border-light transition-all duration-200">

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

        <h3 className="font-bold text-text-primary text-[15px] leading-snug mb-2 line-clamp-2">
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
              { label: 'Build',    value: formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max) },
              { label: 'Price',    value: `$${idea.suggested_price.amount}/${idea.suggested_price.interval}` },
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

            <div className="flex justify-end mt-3 pt-3 border-t border-border/40">
              <Link
                href={`/ideas/${idea.id}`}
                className="text-xs font-semibold text-accent flex items-center gap-1 transition-all duration-150 group-hover:gap-1.5"
              >
                View Idea <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
