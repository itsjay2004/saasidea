import type { Metadata } from 'next'
import FreeIdeasExplorer from './FreeIdeasExplorer'
import { getFreeIdeas, getPaidPreviewIdeas, getIndustries } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: '50 Free SaaS Ideas — Fully Validated, No Signup | SaaSIdea Pro',
  description:
    'Read 50 validated SaaS ideas in full, free. Each one traces back to a real complaint and includes MRR potential, build time, competition, and keyword data. No paywall, no email required.',
  alternates: { canonical: '/free-ideas' },
}

const LOCKED_CONFIG = {
  title: '+1,195 more ideas inside',
  subtitle: 'One-time payment, lifetime access.',
  cta: 'Unlock the full library →',
}

export default async function FreeIdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>
}) {
  let freeIdeas: Awaited<ReturnType<typeof getFreeIdeas>> = []
  let lockedIdeas: Awaited<ReturnType<typeof getPaidPreviewIdeas>> = []
  let industries: { industry: string; count: number }[] = []

  const { industry: initialIndustry } = await searchParams

  try {
    ;[freeIdeas, lockedIdeas, industries] = await Promise.all([
      getFreeIdeas(50),
      getPaidPreviewIdeas(1),
      getIndustries(),
    ])
  } catch {
    // Renders with empty data gracefully
  }

  const libraryTotal = industries.reduce((sum, i) => sum + i.count, 0)

  return (
    <div className="free-ideas-page">
      <section className="section">
        <div className="wrap">

          <FreeIdeasExplorer
            ideas={freeIdeas}
            lockedIdeas={lockedIdeas}
            industries={industries}
            libraryTotal={libraryTotal}
            lockedConfig={LOCKED_CONFIG}
            initialIndustry={initialIndustry}
          />

        </div>
      </section>
    </div>
  )
}
