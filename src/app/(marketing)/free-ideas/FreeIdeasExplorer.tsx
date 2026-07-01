'use client'

import { useMemo, useState } from 'react'
import IdeaCard from '@/components/ideas/IdeaCard'
import AuthModal from '@/components/auth/AuthModal'
import type { Idea } from '@/types'

interface LockedConfig {
  href?: string
  title?: string
  subtitle?: string
  cta?: string
  note?: string
}

interface FreeIdeasExplorerProps {
  ideas: Idea[]
  lockedIdeas: Idea[]
  industries: { industry: string; count: number }[]
  libraryTotal: number
  lockedConfig: LockedConfig
  initialIndustry?: string
}

const ALL = 'All'

export default function FreeIdeasExplorer({
  ideas,
  lockedIdeas,
  industries,
  libraryTotal,
  lockedConfig,
  initialIndustry,
}: FreeIdeasExplorerProps) {
  // How many free samples we actually have per industry.
  const freeByIndustry = useMemo(() => {
    const map: Record<string, number> = {}
    for (const idea of ideas) {
      if (idea.industry) map[idea.industry] = (map[idea.industry] ?? 0) + 1
    }
    return map
  }, [ideas])

  // Every industry in the library, free-sample ones first, then by library size.
  const pills = useMemo(() => {
    return industries
      .filter((i) => i.count > 0)
      .map((i) => ({ name: i.industry, total: i.count, free: freeByIndustry[i.industry] ?? 0 }))
      .sort((a, b) => b.free - a.free || b.total - a.total || a.name.localeCompare(b.name))
  }, [industries, freeByIndustry])

  const [active, setActive] = useState<string>(() => {
    if (!initialIndustry) return ALL
    const match = industries.find(
      (i) => i.count > 0 && i.industry.toLowerCase() === initialIndustry.toLowerCase(),
    )
    return match ? match.industry : ALL
  })
  const [showAuth, setShowAuth] = useState(false)
  const openAuth = () => setShowAuth(true)

  // All "unlock" CTAs on this page open the auth modal instead of jumping to pricing.
  const lockedCardConfig = { ...lockedConfig, onUnlock: openAuth }

  const selected = active === ALL ? null : pills.find((p) => p.name === active)
  const filtered = active === ALL ? ideas : ideas.filter((idea) => idea.industry === active)
  const hasFree = filtered.length > 0

  // Copy for the single locked card at the tail of the grid — adapts to the selection.
  const lockedRemaining = selected ? selected.total - selected.free : libraryTotal - ideas.length
  const lockedTitle = selected
    ? `+${lockedRemaining.toLocaleString()} more ideas in ${selected.name}`
    : `+${lockedRemaining.toLocaleString()} more ideas inside`
  const lockedIdea = lockedIdeas[0]

  return (
    <>
      {/* Cold-visitor capture — the first thing on the page, framed as a perk, not a wall. */}
      <div className="fi-topbar rv">
        <span className="fi-topbar-text">
          <span className="fi-topbar-gift" aria-hidden>📬</span>
          <span>
            <strong>Free weekly deep-dive: </strong>  one micro-niche fully researched — ideas,
            competition, gaps &amp; openings — in your inbox.
          </span>
        </span>
        <button type="button" className="fi-topbar-cta" onClick={openAuth}>
          Sign up free →
        </button>
      </div>

      <div className="fi-header rv">
        <span className="eyebrow">100% free · no paywall, no email wall</span>
        <h1 className="fi-title">50 validated SaaS ideas you can read right now — free.</h1>
        <p className="fi-subtitle">
          SaaSIdea Pro is a library of <strong>1,200+ SaaS ideas</strong>, each one mined from a
          real complaint people posted online — then checked for genuine demand and packaged with
          MRR potential, build time, competition, and the keywords to rank for. The 50 below are
          yours to read in full, free — no account, no card. Think of it as a glimpse of the
          whole library.
        </p>
      </div>

      <div className="fi-filters" role="tablist" aria-label="Filter ideas by industry">
        <button
          type="button"
          className={`fi-pill${active === ALL ? ' is-active' : ''}`}
          aria-pressed={active === ALL}
          onClick={() => setActive(ALL)}
        >
          All
          <span className="fi-pill-count">{ideas.length}</span>
        </button>
        {pills.map((p) => (
          <button
            key={p.name}
            type="button"
            className={`fi-pill${active === p.name ? ' is-active' : ''}${p.free > 0 ? ' has-free' : ''}`}
            aria-pressed={active === p.name}
            onClick={() => setActive(p.name)}
          >
            {p.name}
            <span className="fi-pill-count">{p.total}</span>
          </button>
        ))}
      </div>

      {/* Conversion-focused status line — adapts to the selection. */}
      <div className="fi-insight">
        {active === ALL ? (
          <p>
            <strong>{ideas.length} free samples</strong> to browse —{' '}
            <span className="fi-insight-dim">
              a taste of {libraryTotal.toLocaleString()}+ validated ideas in the full library.
            </span>
          </p>
        ) : selected && selected.free > 0 ? (
          <p>
            <strong>
              {selected.free} free {selected.free === 1 ? 'idea' : 'ideas'}
            </strong>{' '}
            in {selected.name} —{' '}
            <span className="fi-insight-dim">{selected.total} total in the library. </span>
            <button type="button" className="fi-insight-cta" onClick={openAuth}>
              Unlock {selected.total - selected.free} more →
            </button>
          </p>
        ) : selected ? (
          <p>
            <strong>No free samples in {selected.name} yet</strong> —{' '}
            <span className="fi-insight-dim">
              {selected.total} {selected.name} {selected.total === 1 ? 'idea is' : 'ideas are'} waiting
              inside.
            </span>
          </p>
        ) : null}
      </div>

      {hasFree ? (
        <div className="idea-grid fi-grid">
          {filtered.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} hasAccess={true} clickable={false} />
          ))}
          {lockedIdea && lockedRemaining > 0 && (
            <IdeaCard
              key={lockedIdea.id}
              idea={lockedIdea}
              hasAccess={false}
              lockedConfig={{ ...lockedCardConfig, title: lockedTitle, note: '$29 once · no subscription' }}
            />
          )}
        </div>
      ) : (
        // No free samples for this industry → focused upsell.
        <div className="fi-upsell">
          <span className="fi-upsell-num">{selected?.total ?? 0}</span>
          <h3 className="fi-upsell-title">
            {selected?.total} validated {selected?.name} {selected?.total === 1 ? 'idea is' : 'ideas are'}{' '}
            locked inside.
          </h3>
          <p className="fi-upsell-text">
            None are free yet — but every one comes with the same MRR potential, build time,
            competition, and keyword research you see in the free cards. Unlock the whole library and
            read them all today.
          </p>
          <button type="button" className="btn btn--primary" onClick={openAuth}>
            Unlock all {libraryTotal.toLocaleString()}+ — $29
          </button>
          <span className="fi-upsell-sub">One payment · lifetime access · no subscription</span>
        </div>
      )}

      {/* Email capture — framed as a benefit, never a wall. */}
      <div className="fi-capture rv">
        <div className="fi-capture-text">
          <span className="fi-capture-eyebrow">Free weekly research drop</span>
          <h3 className="fi-capture-title">A micro-niche teardown in your inbox, every week</h3>
          <p className="fi-capture-sub">
            Each week we take one overlooked micro-niche and break it all the way down — the
            buildable ideas inside it, who&apos;s already competing, where the gaps are, and the
            openings worth chasing. Create a free account and it lands in your inbox. No card, no
            spam, unsubscribe anytime.
          </p>
        </div>
        <div className="fi-capture-actions">
          <button type="button" className="btn btn--primary" onClick={openAuth}>
            Create a free account →
          </button>
          <span className="fi-capture-note">Free · takes 20 seconds</span>
          <button type="button" className="btn btn--outline fi-capture-alt" onClick={openAuth}>
            Or unlock all {libraryTotal.toLocaleString()}+ — $29
          </button>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode="signup" />}
    </>
  )
}
