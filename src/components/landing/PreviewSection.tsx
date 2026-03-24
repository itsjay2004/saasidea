import Link from 'next/link'
import { Lock, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { INDUSTRY_COLORS, DIFFICULTY_STYLES, formatMrrRange, formatBuildTime, getCompetitionWidth, COMPETITION_COLORS } from '@/lib/utils'
import type { Idea } from '@/types'

interface PreviewSectionProps {
  ideas: Idea[]
}

export default function PreviewSection({ ideas }: PreviewSectionProps) {
  const freeIdeas = ideas.slice(0, 2)
  const lockedIdeas = ideas.slice(2, 6)

  return (
    <section id="preview" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Preview</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            A Glimpse of What&apos;s Inside
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Browse a small sample of the 1,200+ ideas waiting for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {freeIdeas.map((idea) => {
            const indColors = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-400' }
            const diffStyle = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-900/50', text: 'text-gray-400' }
            return (
              <Link href={`/ideas/${idea.id}`} key={idea.id} className="block">
                <div className="bg-surface border border-border rounded-card-lg p-5 hover:border-accent/30 transition-all h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${indColors.bg} ${indColors.text}`}>
                      {idea.industry}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${diffStyle.bg} ${diffStyle.text}`}>
                      {idea.difficulty_label}
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary mb-1">{idea.title}</h3>
                  <p className="text-text-muted text-[13px] line-clamp-2 mb-3">{idea.tagline}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-text-subtle block">MRR</span>
                      <span className="text-text-primary font-medium">{formatMrrRange(idea.mrr_potential.min, idea.mrr_potential.max)}</span>
                    </div>
                    <div>
                      <span className="text-text-subtle block">Build</span>
                      <span className="text-text-primary font-medium">{formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max)}</span>
                    </div>
                    <div>
                      <span className="text-text-subtle block">Price</span>
                      <span className="text-text-primary font-medium">${idea.suggested_price.amount}/{idea.suggested_price.interval}</span>
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
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-surface-2 text-text-subtle">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}

          {lockedIdeas.map((idea, i) => {
            const indColors = INDUSTRY_COLORS[idea.industry] || { bg: 'bg-gray-500/10', text: 'text-gray-400' }
            const diffStyle = DIFFICULTY_STYLES[idea.difficulty_label] || { bg: 'bg-gray-900/50', text: 'text-gray-400' }
            return (
              <div key={idea.id || i} className="relative bg-surface border border-border rounded-card-lg p-5 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${indColors.bg} ${indColors.text}`}>
                    {idea.industry}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${diffStyle.bg} ${diffStyle.text}`}>
                    {idea.difficulty_label}
                  </span>
                </div>
                <h3 className="font-bold text-text-primary mb-1 blur-[6px]">{idea.title}</h3>
                <p className="text-text-muted text-[13px] blur-[6px] mb-3">{idea.tagline}</p>
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 flex flex-col items-center justify-center gap-2">
                  <Lock className="w-5 h-5 text-text-subtle" />
                  <p className="text-sm text-text-muted font-medium">Unlock to see this idea</p>
                  <Link href="/#pricing">
                    <Button size="sm">Get Access</Button>
                  </Link>
                </div>
              </div>
            )
          })}

          {/* Fill remaining slots with placeholder locked cards if needed */}
          {Array.from({ length: Math.max(0, 4 - lockedIdeas.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} className="relative bg-surface border border-border rounded-card-lg p-5 overflow-hidden min-h-[250px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400">Industry</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900/50 text-gray-400">Difficulty</span>
              </div>
              <div className="h-4 bg-surface-2 rounded mb-2 w-3/4" />
              <div className="h-3 bg-surface-2 rounded mb-1 w-full" />
              <div className="h-3 bg-surface-2 rounded mb-3 w-2/3" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 flex flex-col items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-text-subtle" />
                <p className="text-sm text-text-muted font-medium">Unlock to see this idea</p>
                <Link href="/#pricing">
                  <Button size="sm">Get Access</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/20 rounded-card-lg p-8 text-center">
          <p className="text-text-primary font-heading text-xl font-bold mb-2">
            You&apos;re seeing 2 of 1,200+ ideas
          </p>
          <p className="text-text-muted text-sm mb-6">Get instant access to the full library</p>
          <Link href="/#pricing">
            <Button size="lg" className="gap-2">
              Unlock All Ideas — One-Time Payment <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
