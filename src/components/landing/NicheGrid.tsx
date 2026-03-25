'use client'

import {
  ArrowRight, Banknote, Users, Heart, BookOpen, ShoppingCart,
  Layers, Scale, Home, Palette, Briefcase, UtensilsCrossed,
  Plane, Code2, Megaphone, Zap,
} from 'lucide-react'
import type { ElementType, MouseEvent } from 'react'
import { INDUSTRY_COLORS } from '@/lib/utils'

interface NicheGridProps {
  industries: { industry: string; count: number }[]
}

const LUCIDE_ICONS: Record<string, ElementType> = {
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

const nicheExamples: Record<string, string[]> = {
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

const ALL_INDUSTRIES = Object.keys(nicheExamples)

export default function NicheGrid({ industries }: NicheGridProps) {
  const industriesMap = new Map(industries.map((i) => [i.industry, i.count]))

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Browse by Industry</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            <span className="text-gradient">15 Industries.</span> 75 Niches. 375 Sub-niches.
          </h2>
          <p className="text-text-muted text-[15px] max-w-lg mx-auto leading-relaxed">
            Whatever your background, there&apos;s a validated idea waiting for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ALL_INDUSTRIES.map((industry) => {
            const count  = industriesMap.get(industry) || 0
            const niches = nicheExamples[industry] || []
            const colors = INDUSTRY_COLORS[industry] || { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-500/20' }
            const Icon   = LUCIDE_ICONS[industry]

            return (
              <a
                key={industry}
                href={`/ideas?industry=${encodeURIComponent(industry)}`}
                onClick={handleClick}
                className="group relative flex flex-col bg-surface border border-border rounded-2xl p-4 overflow-hidden hover:shadow-md hover:-translate-y-0.5 hover:border-border-light transition-all duration-200"
              >
                {/* Hover accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top row: icon + count */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${colors.bg}`}>
                    {Icon && <Icon className={`w-[17px] h-[17px] ${colors.text}`} />}
                  </div>
                  {count > 0 && (
                    <div className="text-right">
                      <div className={`text-[17px] font-bold leading-none ${colors.text}`}>{count}</div>
                      <div className="text-[10px] text-text-subtle leading-tight">ideas</div>
                    </div>
                  )}
                </div>

                {/* Industry name */}
                <h3 className="font-semibold text-text-primary text-[13px] leading-snug mb-3 flex-1">
                  {industry}
                </h3>

                {/* Niche chips */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {niches.map((n) => (
                    <span
                      key={n}
                      className="px-1.5 py-[3px] rounded text-[10px] bg-surface-2 text-text-subtle leading-none"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                {/* Explore CTA */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-accent mt-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            )
          })}
        </div>

        {/* Footer link */}
        <div className="text-center mt-10">
          <a
            href="/ideas"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all duration-150"
          >
            Browse all ideas <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
