import {
  ArrowRight, Banknote, Users, Heart, BookOpen, ShoppingCart,
  Layers, Scale, Home, Palette, Briefcase, UtensilsCrossed,
  Plane, Code2, Megaphone, Zap,
} from 'lucide-react'
import type { ElementType } from 'react'
import CrawlableLink from './CrawlableLink'

interface NicheGridProps {
  industries: { industry: string; count: number }[]
}

const ICON_MAP: Record<string, ElementType> = {
  'Fintech': Banknote,
  'HR & Recruiting': Users,
  'Health & Wellness': Heart,
  'Education': BookOpen,
  'E-commerce': ShoppingCart,
  'B2B SaaS': Layers,
  'Legal': Scale,
  'Real Estate': Home,
  'Creator Economy': Palette,
  'Agency': Briefcase,
  'Food & Beverage': UtensilsCrossed,
  'Travel': Plane,
  'Developer Tools': Code2,
  'Marketing': Megaphone,
  'Productivity': Zap,
}

const COLOR_MAP: Record<string, {
  icon: string
  bg: string
  bar: string
  glow: string
}> = {
  'Fintech':          { icon: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-500/10',    bar: 'bg-blue-500',    glow: 'rgba(59,130,246,0.12)' },
  'HR & Recruiting':  { icon: 'text-purple-600 dark:text-purple-400',bg: 'bg-purple-500/10',  bar: 'bg-purple-500',  glow: 'rgba(168,85,247,0.12)' },
  'Health & Wellness':{ icon: 'text-green-600 dark:text-green-400',  bg: 'bg-green-500/10',   bar: 'bg-green-500',   glow: 'rgba(34,197,94,0.12)' },
  'Education':        { icon: 'text-indigo-600 dark:text-indigo-400',bg: 'bg-indigo-500/10',  bar: 'bg-indigo-500',  glow: 'rgba(99,102,241,0.12)' },
  'E-commerce':       { icon: 'text-orange-600 dark:text-orange-400',bg: 'bg-orange-500/10',  bar: 'bg-orange-500',  glow: 'rgba(249,115,22,0.12)' },
  'B2B SaaS':         { icon: 'text-cyan-600 dark:text-cyan-400',    bg: 'bg-cyan-500/10',    bar: 'bg-cyan-500',    glow: 'rgba(6,182,212,0.12)' },
  'Legal':            { icon: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-500/10',   bar: 'bg-amber-500',   glow: 'rgba(245,158,11,0.12)' },
  'Real Estate':      { icon: 'text-teal-600 dark:text-teal-400',    bg: 'bg-teal-500/10',    bar: 'bg-teal-500',    glow: 'rgba(20,184,166,0.12)' },
  'Creator Economy':  { icon: 'text-pink-600 dark:text-pink-400',    bg: 'bg-pink-500/10',    bar: 'bg-pink-500',    glow: 'rgba(236,72,153,0.12)' },
  'Agency':           { icon: 'text-violet-600 dark:text-violet-400',bg: 'bg-violet-500/10',  bar: 'bg-violet-500',  glow: 'rgba(139,92,246,0.12)' },
  'Food & Beverage':  { icon: 'text-rose-600 dark:text-rose-400',    bg: 'bg-rose-500/10',    bar: 'bg-rose-500',    glow: 'rgba(244,63,94,0.12)' },
  'Travel':           { icon: 'text-sky-600 dark:text-sky-400',      bg: 'bg-sky-500/10',     bar: 'bg-sky-500',     glow: 'rgba(14,165,233,0.12)' },
  'Developer Tools':  { icon: 'text-emerald-600 dark:text-emerald-400',bg:'bg-emerald-500/10', bar: 'bg-emerald-500', glow: 'rgba(16,185,129,0.12)' },
  'Marketing':        { icon: 'text-fuchsia-600 dark:text-fuchsia-400',bg:'bg-fuchsia-500/10', bar: 'bg-fuchsia-500', glow: 'rgba(217,70,239,0.12)' },
  'Productivity':     { icon: 'text-lime-600 dark:text-lime-500',    bg: 'bg-lime-500/10',    bar: 'bg-lime-500',    glow: 'rgba(132,204,22,0.12)' },
}

const NICHE_MAP: Record<string, string[]> = {
  'Fintech': ['Payments', 'Invoicing', 'Budgeting'],
  'HR & Recruiting': ['Hiring', 'Onboarding', 'Payroll'],
  'Health & Wellness': ['Telehealth', 'Fitness', 'Mental Health'],
  'Education': ['E-learning', 'Tutoring', 'LMS'],
  'E-commerce': ['Dropshipping', 'Returns', 'Analytics'],
  'B2B SaaS': ['CRM', 'Project Mgmt', 'Automation'],
  'Legal': ['Contracts', 'Compliance', 'Billing'],
  'Real Estate': ['Property Mgmt', 'Listings', 'Mortgages'],
  'Creator Economy': ['Monetization', 'Scheduling', 'Analytics'],
  'Agency': ['Client Mgmt', 'Reporting', 'Proposals'],
  'Food & Beverage': ['Ordering', 'Inventory', 'Delivery'],
  'Travel': ['Booking', 'Itineraries', 'Reviews'],
  'Developer Tools': ['APIs', 'Testing', 'Monitoring'],
  'Marketing': ['SEO', 'Email', 'Social Media'],
  'Productivity': ['Tasks', 'Notes', 'Automation'],
}

const ALL_INDUSTRIES = Object.keys(NICHE_MAP)

const fallbackColor = { icon: 'text-gray-500', bg: 'bg-gray-500/10', bar: 'bg-gray-400', glow: 'rgba(156,163,175,0.12)' }

export default function NicheGrid({ industries }: NicheGridProps) {
  const industriesMap = new Map(industries.map(i => [i.industry, i.count]))
  const totalIdeas = industries.reduce((sum, i) => sum + i.count, 0)

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-surface-alt section-mesh">
      <div className="orb orb-violet top-[5%] right-[10%] w-[500px] h-[500px]" />
      <div className="orb orb-pink bottom-[10%] left-[5%] w-[400px] h-[400px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-subtle border border-accent/15 text-xs font-semibold text-accent tracking-wide uppercase mb-5">
            <Layers className="w-3.5 h-3.5" />
            Browse by Industry
          </div>
          <h2 className="font-heading text-3xl sm:text-[2.75rem] font-bold text-text-primary leading-[1.15] mb-4">
            <span className="text-gradient">{totalIdeas.toLocaleString()}+ ideas</span>{' '}
            across 15 industries
          </h2>
          <p className="text-text-muted text-[15px] sm:text-base max-w-xl mx-auto leading-relaxed mt-2">
            From AI to food delivery — every idea is validated, niche-specific, and ready to build.
          </p>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_INDUSTRIES.map(industry => {
            const count = industriesMap.get(industry) || 0
            const niches = NICHE_MAP[industry] || []
            const colors = COLOR_MAP[industry] || fallbackColor
            const Icon = ICON_MAP[industry]

            return (
              <CrawlableLink
                key={industry}
                href={`/ideas?industry=${encodeURIComponent(industry)}`}
                className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Colored accent bar at top */}
                <div className={`h-1 w-full ${colors.bar} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Hover glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: colors.glow }}
                />

                <div className="relative px-5 py-5 sm:px-6 sm:py-5 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`shrink-0 w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-250`}>
                    {Icon && <Icon className={`w-5.5 h-5.5 ${colors.icon}`} strokeWidth={1.75} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Industry name */}
                    <h3 className="font-bold text-text-primary text-[15px] leading-snug truncate mb-2">
                      {industry}
                    </h3>

                    {/* Niche tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {niches.map(n => (
                        <span
                          key={n}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface-2 text-text-subtle leading-none"
                        >
                          {n}
                        </span>
                      ))}
                    </div>

                    {/* Idea count — prominent */}
                    <div className="flex items-center justify-between border-t border-border/40 pt-3">
                      {count > 0 ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-xl font-extrabold tabular-nums ${colors.icon}`}>{count}</span>
                          <span className="text-xs font-medium text-text-muted">{count === 1 ? 'idea' : 'ideas'} ready</span>
                        </div>
                      ) : (
                        <span className="text-xs text-text-subtle">Coming soon</span>
                      )}
                      <div className="flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </CrawlableLink>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <CrawlableLink
            href="/ideas"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-button shadow-accent transition-all duration-200 group"
          >
            Browse all ideas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </CrawlableLink>
        </div>
      </div>
    </section>
  )
}
