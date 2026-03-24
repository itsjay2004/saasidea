import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { INDUSTRY_ICONS } from '@/lib/utils'

interface NicheGridProps {
  industries: { industry: string; count: number }[]
}

const nicheExamples: Record<string, string[]> = {
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

export default function NicheGrid({ industries }: NicheGridProps) {
  const allIndustries = [
    'Fintech', 'HR & Recruiting', 'Health & Wellness', 'Education', 'E-commerce',
    'B2B SaaS', 'Legal', 'Real Estate', 'Creator Economy', 'Agency',
    'Food & Beverage', 'Travel', 'Developer Tools', 'Marketing', 'Productivity',
  ]

  const industriesMap = new Map(industries.map((i) => [i.industry, i.count]))

  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Browse by Industry</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            15 Industries. 75 Niches. 375 Sub-niches.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allIndustries.map((industry) => {
            const count = industriesMap.get(industry) || 0
            const icon = INDUSTRY_ICONS[industry] || '📁'
            const niches = nicheExamples[industry] || []
            return (
              <Link
                key={industry}
                href={`/ideas?industry=${encodeURIComponent(industry)}`}
                className="bg-surface border border-border rounded-card-lg p-4 hover:border-accent/30 transition-all group"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-bold text-text-primary text-sm mb-1">{industry}</h3>
                {count > 0 && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent mb-2">
                    {count} ideas
                  </span>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {niches.map((n) => (
                    <span key={n} className="px-1.5 py-0.5 rounded text-[10px] bg-surface-2 text-text-subtle">{n}</span>
                  ))}
                </div>
                <span className="text-xs text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
