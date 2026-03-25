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
  'Fintech':           Banknote,
  'HR & Recruiting':   Users,
  'Health & Wellness': Heart,
  'Education':         BookOpen,
  'E-commerce':        ShoppingCart,
  'B2B SaaS':          Layers,
  'Legal':             Scale,
  'Real Estate':       Home,
  'Creator Economy':   Palette,
  'Agency':            Briefcase,
  'Food & Beverage':   UtensilsCrossed,
  'Travel':            Plane,
  'Developer Tools':   Code2,
  'Marketing':         Megaphone,
  'Productivity':      Zap,
}

const COLOR_MAP: Record<string, { icon: string; bg: string; ring: string; badge: string }> = {
  'Fintech':           { icon: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-500/10',    ring: 'group-hover:ring-blue-500/25',    badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/15' },
  'HR & Recruiting':   { icon: 'text-purple-600 dark:text-purple-400',bg: 'bg-purple-500/10',  ring: 'group-hover:ring-purple-500/25',  badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/15' },
  'Health & Wellness': { icon: 'text-green-600 dark:text-green-400',  bg: 'bg-green-500/10',   ring: 'group-hover:ring-green-500/25',   badge: 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/15' },
  'Education':         { icon: 'text-indigo-600 dark:text-indigo-400',bg: 'bg-indigo-500/10',  ring: 'group-hover:ring-indigo-500/25',  badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/15' },
  'E-commerce':        { icon: 'text-orange-600 dark:text-orange-400',bg: 'bg-orange-500/10',  ring: 'group-hover:ring-orange-500/25',  badge: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/15' },
  'B2B SaaS':          { icon: 'text-cyan-600 dark:text-cyan-400',    bg: 'bg-cyan-500/10',    ring: 'group-hover:ring-cyan-500/25',    badge: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/15' },
  'Legal':             { icon: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-500/10',   ring: 'group-hover:ring-amber-500/25',   badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/15' },
  'Real Estate':       { icon: 'text-teal-600 dark:text-teal-400',    bg: 'bg-teal-500/10',    ring: 'group-hover:ring-teal-500/25',    badge: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/15' },
  'Creator Economy':   { icon: 'text-pink-600 dark:text-pink-400',    bg: 'bg-pink-500/10',    ring: 'group-hover:ring-pink-500/25',    badge: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/15' },
  'Agency':            { icon: 'text-violet-600 dark:text-violet-400',bg: 'bg-violet-500/10',  ring: 'group-hover:ring-violet-500/25',  badge: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/15' },
  'Food & Beverage':   { icon: 'text-rose-600 dark:text-rose-400',    bg: 'bg-rose-500/10',    ring: 'group-hover:ring-rose-500/25',    badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/15' },
  'Travel':            { icon: 'text-sky-600 dark:text-sky-400',      bg: 'bg-sky-500/10',     ring: 'group-hover:ring-sky-500/25',     badge: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/15' },
  'Developer Tools':   { icon: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', ring: 'group-hover:ring-emerald-500/25', badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/15' },
  'Marketing':         { icon: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-500/10', ring: 'group-hover:ring-fuchsia-500/25', badge: 'bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/15' },
  'Productivity':      { icon: 'text-lime-600 dark:text-lime-500',    bg: 'bg-lime-500/10',    ring: 'group-hover:ring-lime-500/25',    badge: 'bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/15' },
}

const NICHE_MAP: Record<string, string[]> = {
  'Fintech':          ['Payments', 'Invoicing', 'Budgeting'],
  'HR & Recruiting':  ['Hiring', 'Onboarding', 'Payroll'],
  'Health & Wellness':['Telehealth', 'Fitness', 'Mental Health'],
  'Education':        ['E-learning', 'Tutoring', 'LMS'],
  'E-commerce':       ['Dropshipping', 'Returns', 'Analytics'],
  'B2B SaaS':         ['CRM', 'Project Mgmt', 'Automation'],
  'Legal':            ['Contracts', 'Compliance', 'Billing'],
  'Real Estate':      ['Property Mgmt', 'Listings', 'Mortgages'],
  'Creator Economy':  ['Monetization', 'Scheduling', 'Analytics'],
  'Agency':           ['Client Mgmt', 'Reporting', 'Proposals'],
  'Food & Beverage':  ['Ordering', 'Inventory', 'Delivery'],
  'Travel':           ['Booking', 'Itineraries', 'Reviews'],
  'Developer Tools':  ['APIs', 'Testing', 'Monitoring'],
  'Marketing':        ['SEO', 'Email', 'Social Media'],
  'Productivity':     ['Tasks', 'Notes', 'Automation'],
}

const ALL_INDUSTRIES = Object.keys(NICHE_MAP)

const fallbackColor = { icon: 'text-gray-500', bg: 'bg-gray-500/10', ring: 'group-hover:ring-gray-500/25', badge: 'bg-gray-500/10 text-gray-600 border-gray-500/15' }

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
            <span className="text-gradient">15 industries.</span>{' '}
            Hundreds of niches.
          </h2>
          <p className="text-text-muted text-[15px] sm:text-base max-w-xl mx-auto leading-relaxed">
            From fintech to food delivery — every idea is validated, niche-specific, and ready to build.
          </p>
        </div>

        {/* Headline stat */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-6 sm:gap-10 px-7 py-4 glass-card rounded-2xl shadow-card">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-heading text-text-primary tracking-tight">{totalIdeas.toLocaleString()}+</p>
              <p className="text-xs text-text-muted mt-0.5">Total ideas</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-heading text-text-primary tracking-tight">15</p>
              <p className="text-xs text-text-muted mt-0.5">Industries</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-heading text-text-primary tracking-tight">75+</p>
              <p className="text-xs text-text-muted mt-0.5">Niches</p>
            </div>
          </div>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ALL_INDUSTRIES.map(industry => {
            const count = industriesMap.get(industry) || 0
            const niches = NICHE_MAP[industry] || []
            const colors = COLOR_MAP[industry] || fallbackColor
            const Icon = ICON_MAP[industry]

            return (
              <CrawlableLink
                key={industry}
                href={`/ideas?industry=${encodeURIComponent(industry)}`}
                className={`group relative flex flex-col glass-card rounded-2xl p-4 sm:p-5 ring-2 ring-transparent ${colors.ring} hover:shadow-card-md hover:-translate-y-1 transition-all duration-250 overflow-hidden`}
              >
                {/* Hover glow */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 ${colors.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    {Icon && <Icon className={`w-5 h-5 ${colors.icon}`} />}
                  </div>

                  {/* Name + count */}
                  <div className="flex items-baseline justify-between gap-1.5 mb-2.5">
                    <h3 className="font-semibold text-text-primary text-sm leading-snug">
                      {industry}
                    </h3>
                    {count > 0 && (
                      <span className={`shrink-0 text-[11px] font-bold px-1.5 py-0.5 rounded-md border ${colors.badge} tabular-nums`}>
                        {count}
                      </span>
                    )}
                  </div>

                  {/* Niche tags */}
                  <div className="flex flex-wrap gap-1">
                    {niches.map(n => (
                      <span
                        key={n}
                        className="px-2 py-[3px] rounded-md text-[10px] font-medium bg-surface-2 text-text-subtle leading-none"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  {/* Explore CTA */}
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-accent mt-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    Explore ideas <ArrowRight className="w-3 h-3" />
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
