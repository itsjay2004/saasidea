import CrawlableLink from '@/components/landing/CrawlableLink'

interface IndustriesProps {
  industries: { industry: string; count: number }[]
}

const TAG_MAP: Record<string, string> = {
  'Developer Tools': 'APIs · Debugging · Monitoring',
  'E-commerce': 'Returns · Analytics · Inventory',
  'B2B SaaS': 'CRM · Reporting · Automation',
  'Fintech': 'Invoicing · Budgeting · Payments',
  'Creator Economy': 'Monetization · Analytics · Tools',
  'Health & Wellness': 'Telehealth · Fitness · Notes',
  'HR & Recruiting': 'Hiring · Onboarding · Payroll',
  'Food & Beverage': 'Ordering · Scheduling · Waste',
  'Marketing': 'SEO · Email · Attribution',
  'Education': 'E-learning · Tutoring · LMS',
  'Legal': 'Contracts · Compliance · Billing',
  'Real Estate': 'Listings · Property · Mortgages',
  'Agency': 'Clients · Reporting · Proposals',
  'Travel': 'Booking · Itineraries · Reviews',
  'Productivity': 'Tasks · Notes · Automation',
}

// Fallback mirrors the reference design when live data is unavailable.
const FALLBACK: { industry: string; count: number }[] = [
  { industry: 'Developer Tools', count: 207 },
  { industry: 'E-commerce', count: 77 },
  { industry: 'B2B SaaS', count: 71 },
  { industry: 'Fintech', count: 68 },
  { industry: 'Creator Economy', count: 65 },
  { industry: 'Health & Wellness', count: 55 },
  { industry: 'HR & Recruiting', count: 55 },
  { industry: 'Food & Beverage', count: 50 },
  { industry: 'Marketing', count: 37 },
]

export default function Industries({ industries }: IndustriesProps) {
  const live = industries.filter((i) => i.count > 0).sort((a, b) => b.count - a.count)
  const list = live.length > 0 ? live : FALLBACK

  return (
    <section className="industries" id="industries">
      <div className="wrap">
        <div className="rv">
          <span className="eyebrow">Browse by industry</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(30px,4.2vw,46px)', color: 'var(--t)', marginBottom: 8 }}
          >
            {list.length} industries. 100+ niches.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--t2)',
              fontWeight: 300,
              maxWidth: 480,
            }}
          >
            Specific, buildable tools — not vague &ldquo;SaaS for X&rdquo; concepts. The exact thing
            people are asking for.
          </p>
        </div>

        <div className="ind-grid">
          {list.map((ind, i) => (
            <CrawlableLink
              key={ind.industry}
              href={`/ideas?industry=${encodeURIComponent(ind.industry)}`}
              className={`ind-card rv${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`}
            >
              <div className="ind-name display">{ind.industry}</div>
              <div className="ind-tags">{TAG_MAP[ind.industry] ?? 'Multiple niches'}</div>
              <div className="ind-count">{ind.count} ideas</div>
            </CrawlableLink>
          ))}
        </div>

        <p className="ind-note rv">
          Coming soon:{' '}
          <span style={{ color: 'var(--t2)' }}>
            Education, Legal, Real Estate, Agency, Travel, Productivity
          </span>{' '}
          — added to your lifetime access automatically, at no extra cost.
        </p>
      </div>
    </section>
  )
}
