import type { Metadata } from 'next'
import FreeIdeasExplorer from './FreeIdeasExplorer'
import { getFreeIdeas, getPaidPreviewIdeas, getIndustries } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Free SaaS Ideas — 60 Validated Ideas, No Signup | SaaSIdea Pro',
  description:
    '60 validated SaaS ideas, free. Each one traces back to a real complaint and includes MRR potential, build time, competition, and keyword data. No signup, no card.',
  alternates: { canonical: '/free-ideas' },
}

const LOCKED_CONFIG = {
  href: '/#pricing',
  title: '+1,195 more ideas inside',
  subtitle: 'One-time payment, lifetime access.',
  cta: 'Unlock the full library →',
}

export default async function FreeIdeasPage() {
  let freeIdeas: Awaited<ReturnType<typeof getFreeIdeas>> = []
  let lockedIdeas: Awaited<ReturnType<typeof getPaidPreviewIdeas>> = []
  let industries: { industry: string; count: number }[] = []

  try {
    ;[freeIdeas, lockedIdeas, industries] = await Promise.all([
      getFreeIdeas(60),
      getPaidPreviewIdeas(3),
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

          <div className="fi-header rv">
            <span className="eyebrow">100% free · no signup, no card</span>
            <h1 className="fi-title">Stop hunting for an idea. Steal one of these 60.</h1>
            <p className="fi-subtitle">
              Every idea below started as a real, documented complaint — then we did the boring part
              for you: MRR potential, build time, competition, and the keywords to rank for. Browse all
              60 free, no strings. It&apos;s a small taste of the <strong>1,200+ inside</strong>.
            </p>
          </div>

          <FreeIdeasExplorer
            ideas={freeIdeas}
            lockedIdeas={lockedIdeas}
            industries={industries}
            libraryTotal={libraryTotal}
            lockedConfig={LOCKED_CONFIG}
          />

          <div className="preview-bridge rv">
            <div className="preview-bridge-text">
              <h3>This is 60 of 1,200+.</h3>
              <p>Same depth on every single one. One payment, lifetime access — no subscription.</p>
            </div>
            <div className="preview-bridge-actions">
              <a href="/#pricing" className="btn btn--primary">Unlock all 1,200+ — $29</a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
