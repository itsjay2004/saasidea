import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { getLaunchDirectoriesJsonLd } from '@/lib/structured-data'
import {
  LAUNCH_DIRECTORIES,
  LAUNCH_STATS,
  isHighTraffic,
  type LaunchDirectory,
} from '@/lib/launch-directories'
import LaunchDirectoryControls from './LaunchDirectoryControls'
import LaunchFaq from './LaunchFaq'
import LaunchCta from './LaunchCta'

export const metadata: Metadata = {
  title: `Where to Launch Your SaaS — ${LAUNCH_STATS.total}+ Launch Directories (Ranked) | SaaSIdea Pro`,
  description:
    'The curated list of the best places to launch a SaaS or startup — Product Hunt, Hacker News, BetaList, SaaSHub, AI directories and more. Each ranked by domain rating, dofollow vs nofollow, cost, and a submission tip. Free to browse.',
  keywords: [
    'where to launch your startup',
    'launch directories',
    'places to launch your saas',
    'startup launch platforms',
    'product hunt alternatives',
    'saas directories',
    'dofollow backlinks for startups',
  ],
  alternates: { canonical: '/launch-directories' },
  openGraph: {
    title: `Where to Launch Your SaaS — ${LAUNCH_STATS.total}+ Ranked Launch Directories`,
    description:
      'A curated, ranked list of the best directories, communities, and review platforms to launch a SaaS — with domain rating, dofollow/nofollow, cost, and a submission tip for each.',
    url: '/launch-directories',
    type: 'website',
  },
}

const COST_CLASS: Record<string, string> = {
  Free: 'ld-chip--g',
  Freemium: 'ld-chip--y',
  Paid: 'ld-chip--b',
}

// Server-rendered directory row — always in the HTML (crawlable). The client
// controls filter these by their data-* attributes and unblur the tip on login.
function DirectoryRow({ dir }: { dir: LaunchDirectory }) {
  return (
    <div
      className="ld-row"
      data-ld-row
      data-category={dir.category}
      data-cost={dir.cost}
      data-dofollow={dir.dofollow ? 'y' : 'n'}
      data-highdr={dir.dr >= 80 ? 'y' : 'n'}
      data-hightraffic={isHighTraffic(dir) ? 'y' : 'n'}
    >
      <div className="ld-row-l">
        <div className="ld-row-head">
          <a href={dir.url} target="_blank" rel="nofollow noopener noreferrer" className="ld-row-name">
            {dir.name}
            <span className="ld-row-ext" aria-hidden>↗</span>
          </a>
          <span className="ld-tag">{dir.category}</span>
        </div>
        <p className="ld-row-desc">{dir.description}</p>
        {/* Gated value-add: blurred by default, unblurred when the root gains .ld-revealed */}
        <p className="ld-row-tip">
          <span className="ld-row-tip-label">
            Our tip<span className="ld-tip-hint"> 🔒 free account</span>
          </span>
          <span className="ld-tip-blur">{dir.tip}</span>
        </p>
      </div>
      <div className="ld-row-r">
        <div className="ld-metric">
          <span className="ld-metric-label">DR est.</span>
          <span className={`ld-metric-value${dir.dr >= 80 ? ' ld-dr--high' : ''}`}>{dir.dr}</span>
        </div>
        <div className="ld-metric">
          <span className="ld-metric-label">Link</span>
          <span className={`ld-chip ${dir.dofollow ? 'ld-chip--g' : 'ld-chip--muted'}`}>
            {dir.dofollow ? 'dofollow' : 'nofollow'}
          </span>
        </div>
        <div className="ld-metric">
          <span className="ld-metric-label">Cost</span>
          <span className={`ld-chip ${COST_CLASS[dir.cost] ?? 'ld-chip--muted'}`}>{dir.cost}</span>
        </div>
        <div className="ld-metric ld-metric--traffic">
          <span className="ld-metric-label">Traffic</span>
          <span className="ld-metric-value ld-metric-value--sm">{dir.traffic}</span>
        </div>
        <a href={dir.url} target="_blank" rel="nofollow noopener noreferrer" className="ld-visit">
          Visit →
        </a>
      </div>
    </div>
  )
}

// The launch-sequence playbook — the gated editorial value-add. Rendered into
// the HTML (SEO) but blurred behind an unlock overlay until .ld-revealed is set.
const SEQUENCE: { title: string; text: string }[] = [
  {
    title: 'Validate before you build',
    text: 'A flawless launch on an idea nobody wants still flops. Start from documented demand, stand up a simple landing page with a waitlist, and wire up your socials.',
  },
  {
    title: 'Warm up your audience',
    text: 'Two to four weeks out, build in public on Indie Hackers, WIP and X. Collect an email list and line up 15–20 genuine supporters for launch day — this decides most launches before they start.',
  },
  {
    title: 'Seed with pre-launch listings',
    text: 'Submit to BetaList, Betabound and beta communities to recruit early testers, gather first reviews, and build a little momentum ahead of the big day.',
  },
  {
    title: 'Own your launch day',
    text: 'Run Product Hunt and Show HN on separate days so you can engage in real time. Reply to every comment in the first few hours — engagement, not votes, is what the algorithms reward.',
  },
  {
    title: 'Batch the directories',
    text: 'The following week, work through the dofollow directories on this list. Each one is a backlink and a trickle of long-tail traffic that keeps arriving for months.',
  },
  {
    title: 'Compound with reviews & press',
    text: 'Drive G2 and Capterra reviews from your happiest users, pitch niche media for a feature, and keep every profile updated. These listings rank and refer long after launch week.',
  },
]

export default function LaunchDirectoriesPage() {
  return (
    <div className="launch-page" id="launch-page-root">
      <JsonLd data={getLaunchDirectoriesJsonLd()} />

      {/* ── HERO ── */}
      <section className="hero ld-hero">
        <div className="hero-glow" />
        <div className="wrap">
          <span className="hero-pill">
            <span className="pill-dot" />
            {LAUNCH_STATS.total} directories · {LAUNCH_STATS.dofollow} dofollow · updated for 2026
          </span>
          <h1 className="hero-h1">
            Where to launch your <em>SaaS</em>.
          </h1>
          <div className="hero-sub">
            <p className="hero-sub-main">
              <strong>{LAUNCH_STATS.total} hand-picked launch directories</strong>, communities and
              review platforms — ranked by domain rating, tagged dofollow or nofollow, and annotated
              with a submission tip for each.
            </p>
            <p className="hero-sub-how">
              Stop digging through scattered blog posts. This is the whole map: where the early
              users, the backlinks, and the traffic actually are — and how to work each one.
            </p>
          </div>
          <div className="hero-ctas">
            <a href="#directory" className="btn btn--primary btn--lg">
              Browse the {LAUNCH_STATS.total} directories ↓
            </a>
            <LaunchCta
              variant="unlock"
              label="Get 1,200+ validated ideas — $29"
              className="btn btn--outline btn--lg"
            />
          </div>
          <div className="hero-trust">
            <span className="trust-t">
              The full list is free — no signup. A free account adds our tip for every directory.
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="stat-value">
              <em>{LAUNCH_STATS.total}</em>
            </div>
            <div className="stat-label">Curated directories</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              <em>{LAUNCH_STATS.dofollow}</em>
            </div>
            <div className="stat-label">Dofollow backlinks</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              <em>{LAUNCH_STATS.highDr}</em>
            </div>
            <div className="stat-label">High authority (DR 80+)</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              <em>{LAUNCH_STATS.categories}</em>
            </div>
            <div className="stat-label">Categories covered</div>
          </div>
        </div>
      </div>

      {/* ── DIRECTORY ── */}
      <section className="section ld-explorer" id="directory">
        <div className="wrap">
          <div className="section-head rv">
            <span className="eyebrow eyebrow--accent">The directory</span>
            <h2 className="section-title">
              {LAUNCH_DIRECTORIES.length} places to launch —
              <br />
              <em>ranked and annotated.</em>
            </h2>
            <p className="section-sub">
              The whole list is free to browse: domain rating, dofollow or nofollow, cost, and traffic
              for every one. Filter by category, then refine by what matters.
            </p>
          </div>

          <LaunchDirectoryControls />

          <div className="ld-list rv" id="ld-directory-list">
            {LAUNCH_DIRECTORIES.map((dir) => (
              <DirectoryRow key={dir.name} dir={dir} />
            ))}
          </div>

          {/* Email capture / value band — framed as a perk */}
          <div className="ld-capture rv">
            <div className="ld-capture-text">
              <span className="ld-capture-eyebrow">Before you launch anything</span>
              <h3 className="ld-capture-title">Make sure you&apos;re launching something people want</h3>
              <p className="ld-capture-sub">
                A great launch on a dead idea still goes nowhere. SaaSIdea Pro is a library of{' '}
                <strong>1,200+ SaaS ideas</strong>, each traced to a real complaint and packaged with
                MRR potential, build time, competition, and the keywords to rank for. Validate first,
                then launch everywhere on this list.
              </p>
            </div>
            <div className="ld-capture-actions">
              <LaunchCta variant="unlock" label="Get 1,200+ ideas — $29 →" className="btn btn--primary" />
              <span className="ld-capture-note">One payment · lifetime access · no subscription</span>
              <a href="/free-ideas" className="ld-capture-alt">
                Or read 50 ideas free first →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAUNCH SEQUENCE PLAYBOOK (gated) ── */}
      <section className="methodology" id="playbook">
        <div className="wrap">
          <div className="meth-layout">
            <div className="meth-head">
              <span className="eyebrow eyebrow--accent">The playbook</span>
              <h2>
                The order that <em>actually works</em>
              </h2>
              <p>
                Don&apos;t blast every directory in one day. A staggered sequence gives you multiple
                traffic spikes and compounding social proof.
              </p>
            </div>
            <div className="ld-gated">
              <div className="ld-gated-content">
                <div className="meth-timeline">
                  {SEQUENCE.map((step, i) => (
                    <div className="meth-row" key={i}>
                      <div className="meth-num">{String(i + 1).padStart(2, '0')}</div>
                      <div className="meth-content">
                        <h3 className="meth-title">{step.title}</h3>
                        <p className="meth-text">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ld-gated-overlay">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: 'var(--a)' }}
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <h3 className="ld-gated-title">The full launch playbook is free with an account</h3>
                <p className="ld-gated-sub">
                  See the exact order — audience warm-up, pre-launch listings, the big day, the
                  directory batch, and how to compound it. Takes 20 seconds to unlock.
                </p>
                <LaunchCta variant="account" label="Unlock the playbook — free →" className="btn btn--primary" />
                <span className="ld-gated-note">Free · no card · unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING BRIDGE ── */}
      <section className="section">
        <div className="wrap">
          <div className="preview-bridge rv">
            <div className="preview-bridge-text">
              <h3>You know where to launch. Do you know what?</h3>
              <p>
                This list is free forever. The hard part — a validated idea worth launching — is what
                SaaSIdea Pro gives you: 1,200+ ideas, each traced to a real complaint, with the demand
                data attached. $29 once, lifetime access.
              </p>
            </div>
            <div className="preview-bridge-actions">
              <LaunchCta variant="unlock" label="Unlock the library — $29" className="btn btn--primary" />
              <a href="/free-ideas" className="btn btn--ghost-accent">
                Read 50 free <span className="arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <LaunchFaq />

      {/* ── FINALE ── */}
      <section className="finale">
        <div className="finale-glow" />
        <div className="wrap finale-inner">
          <h2 className="finale-h2">
            Validate it. Build it. <em>Launch it everywhere.</em>
          </h2>
          <p className="finale-sub">
            The directory above is yours, free. Pair it with <strong>1,200+ demand-backed ideas</strong>{' '}
            and you&apos;ve got the whole path — from what to build to where to launch it.
          </p>
          <div className="finale-ctas">
            <LaunchCta variant="unlock" label="Get lifetime access — $29" className="btn btn--primary btn--lg" />
            <a href="#directory" className="btn btn--outline btn--lg">
              Back to the directories
            </a>
          </div>
          <div className="finale-meta">
            <span>One-time $29</span>
            <span className="dot" />
            <span>15-day money-back guarantee</span>
            <span className="dot" />
            <span>No subscription</span>
          </div>
        </div>
      </section>
    </div>
  )
}
