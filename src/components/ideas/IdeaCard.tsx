import Link from 'next/link'
import { ArrowRight, Lock, Search } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { INDUSTRY_COLORS, DIFFICULTY_STYLES, formatMrrRange, formatBuildTime, getCompetitionWidth, COMPETITION_COLORS, formatNumber } from '@/lib/utils'
import type { Idea } from '@/types'

interface IdeaCardProps {
  idea: Idea
  hasAccess: boolean
}

export default function IdeaCard({ idea, hasAccess }: IdeaCardProps) {
  const unlocked = idea.is_free || hasAccess
  const indColors = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-400' }
  const diffStyle = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-900/50', text: 'text-gray-400' }

  return (
    <div className="bg-surface border border-border rounded-card-lg p-5 flex flex-col h-full hover:border-accent/20 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${indColors.bg} ${indColors.text}`}>
          {idea.industry}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${diffStyle.bg} ${diffStyle.text}`}>
          {idea.difficulty_label}
        </span>
      </div>

      <h3 className="font-bold text-text-primary text-[15px] mb-1 line-clamp-1">{idea.title}</h3>
      <p className="text-text-muted text-[13px] line-clamp-2 mb-2">{idea.tagline}</p>

      {idea.pain_point && (
        <div className="mb-3">
          <p className="text-xs italic text-accent bg-accent/5 rounded-md px-2.5 py-1.5 line-clamp-2">
            {idea.pain_point}
          </p>
        </div>
      )}

      <div className={`flex-1 ${!unlocked ? 'relative' : ''}`}>
        {!unlocked && (
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/95 to-transparent z-10 flex flex-col items-center justify-center gap-2 rounded-lg">
            <Lock className="w-4 h-4 text-text-subtle" />
            <span className="text-xs text-text-muted font-medium">Unlock to view</span>
          </div>
        )}
        <div className={!unlocked ? 'blur-[6px] select-none pointer-events-none' : ''}>
          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
            <div>
              <span className="text-text-subtle block mb-0.5">MRR</span>
              <span className="text-text-primary font-semibold">{formatMrrRange(idea.mrr_potential.min, idea.mrr_potential.max)}</span>
            </div>
            <div>
              <span className="text-text-subtle block mb-0.5">Build</span>
              <span className="text-text-primary font-semibold">{formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max)}</span>
            </div>
            <div>
              <span className="text-text-subtle block mb-0.5">Price</span>
              <span className="text-text-primary font-semibold">${idea.suggested_price.amount}/{idea.suggested_price.interval}</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-subtle">Competition</span>
              <span className="text-text-muted capitalize">{idea.competition_level}</span>
            </div>
            <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: getCompetitionWidth(idea.competition_level),
                  backgroundColor: COMPETITION_COLORS[idea.competition_level],
                }}
              />
            </div>
          </div>

          {idea.tags && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {idea.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-surface-2 text-text-subtle">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
            {idea.primary_keyword ? (
              <div className="flex items-center gap-1.5 text-xs">
                <Search className="w-3 h-3 text-text-subtle" />
                <span className="text-text-muted truncate max-w-[120px]">{idea.primary_keyword.keyword}</span>
                {idea.primary_keyword.search_volume && (
                  <span className="text-accent font-medium">{formatNumber(idea.primary_keyword.search_volume)}/mo</span>
                )}
              </div>
            ) : (
              <div />
            )}
            {unlocked && (
              <Link
                href={`/ideas/${idea.id}`}
                className="text-xs text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Idea <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
