'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatMrrShort, formatBuildTime } from '@/lib/utils'
import type { Idea } from '@/types'
import AuthModal from '@/components/auth/AuthModal'

interface LockedConfig {
  href: string
  title?: string
  subtitle?: string
  cta?: string
}

interface IdeaCardProps {
  idea: Idea
  hasAccess: boolean
  /** Pass this to replace the AuthModal lock with a plain link (e.g. on the landing page). */
  lockedConfig?: LockedConfig
  className?: string
}

const DIFF_METER: Record<string, number> = { Easy: 2, Medium: 3, Hard: 4 }
const DIFF_CLASS: Record<string, string> = {
  Easy: 'icard-m-value--g',
  Medium: 'icard-m-value--y',
  Hard: 'icard-m-value--b',
}
const COMP_CLASS: Record<string, string> = {
  low: 'icard-m-value--g',
  medium: 'icard-m-value--y',
  high: 'icard-m-value--b',
}
const COMP_LABEL: Record<string, string> = { low: 'Low', medium: 'Medium', high: 'High' }

function Meter({ filled }: { filled: number }) {
  return (
    <span className="icard-meter">
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} className={i < filled ? 'on' : undefined} />
      ))}
    </span>
  )
}

function CardBody({ idea, unlocked }: { idea: Idea; unlocked?: boolean }) {
  const filled = DIFF_METER[idea.difficulty_label] ?? 3
  return (
    <>
      <div className="icard-head">
        <div className="icard-meta">
          <span className="icard-industry">{idea.industry}</span>
          <span className="icard-model">{idea.pricing_model}</span>
        </div>
        <h3 className="icard-title">{idea.title}</h3>
        <p className="icard-tagline">{idea.tagline}</p>
      </div>
      <div className="icard-blocks">
        <div className="icard-block icard-block--pain">
          <span className="icard-block-label">The pain</span>
          <p className="icard-block-text">{idea.pain_point}</p>
        </div>
        <div className="icard-block icard-block--why">
          <span className="icard-block-label">Why it works</span>
          <p className="icard-block-text">{idea.validation_note}</p>
        </div>
      </div>
      <div className="icard-metrics">
        <div className="icard-metric">
          <span className="icard-m-label">MRR potential</span>
          <span className="icard-m-value icard-m-value--g">
            {formatMrrShort(idea.mrr_potential.min, idea.mrr_potential.max)}
            <span className="icard-m-unit">/mo</span>
          </span>
        </div>
        <div className="icard-metric">
          <span className="icard-m-label">Build time</span>
          <span className="icard-m-value">
            {formatBuildTime(idea.build_time_weeks.min, idea.build_time_weeks.max)}
          </span>
        </div>
        <div className="icard-metric">
          <span className="icard-m-label">Difficulty</span>
          <span className={`icard-m-value ${DIFF_CLASS[idea.difficulty_label] ?? ''}`}>
            {idea.difficulty_label}
            <Meter filled={filled} />
          </span>
        </div>
        <div className="icard-metric">
          <span className="icard-m-label">Competition</span>
          <span className={`icard-m-value ${COMP_CLASS[idea.competition_level] ?? ''}`}>
            {COMP_LABEL[idea.competition_level] ?? idea.competition_level}
          </span>
        </div>
      </div>
      {idea.tags && idea.tags.length > 0 && (
        <footer className="icard-tags">
          {idea.tags.slice(0, 3).map((tag) => (
            <span className="icard-tag" key={tag}>{tag}</span>
          ))}
        </footer>
      )}
      {unlocked && (
        <span className="icard-open" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </>
  )
}

export default function IdeaCard({ idea, hasAccess, lockedConfig, className = '' }: IdeaCardProps) {
  const [showAuth, setShowAuth] = useState(false)
  const unlocked = idea.is_free || hasAccess

  if (unlocked) {
    return (
      <Link href={`/ideas/${idea.id}`} className={`icard ${className}`}>
        <CardBody idea={idea} unlocked />
      </Link>
    )
  }

  return (
    <article className={`icard icard--locked ${className}`}>
      <CardBody idea={idea} />
      <div className="icard-lock">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--t2)' }}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <div className="icard-lock-text">
          <strong>{lockedConfig?.title ?? 'Unlock full details'}</strong>
          {lockedConfig?.subtitle ?? 'One-time payment — lifetime access.'}
        </div>
        {lockedConfig ? (
          <a href={lockedConfig.href} className="btn btn--primary btn--sm">
            {lockedConfig.cta ?? 'Get access →'}
          </a>
        ) : (
          <button type="button" className="btn btn--primary btn--sm" onClick={() => setShowAuth(true)}>
            Get access →
          </button>
        )}
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </article>
  )
}
