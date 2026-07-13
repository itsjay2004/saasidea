'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import LaunchCta from './LaunchCta'
import {
  LAUNCH_DIRECTORIES,
  LAUNCH_CATEGORIES,
  categoryCounts,
  isHighTraffic,
  type LaunchDirectory,
  type LaunchCategory,
} from '@/lib/launch-directories'
import type { User } from '@supabase/supabase-js'

const ALL = 'All'

type Refine = { free: boolean; dofollow: boolean; highDr: boolean; highTraffic: boolean }
const EMPTY_REFINE: Refine = { free: false, dofollow: false, highDr: false, highTraffic: false }

const REFINE_CHIPS: { key: keyof Refine; label: string }[] = [
  { key: 'free', label: 'Free' },
  { key: 'dofollow', label: 'Dofollow' },
  { key: 'highDr', label: 'DR 80+' },
  { key: 'highTraffic', label: 'High traffic' },
]

/**
 * Interactive controls for the launch directory. The 98 rows themselves are
 * rendered by the Server Component (page.tsx) so they're always in the HTML for
 * SEO; this component only:
 *   1. filters them — show/hide the server-rendered rows by data-attribute,
 *   2. reveals the gated value — toggles `.ld-revealed` on the page root, which
 *      unblurs the per-row tips + the playbook via CSS once you're logged in.
 * Keeping this small and free of server-child wrapping keeps static prerender
 * of the surrounding server content intact.
 */
export default function LaunchDirectoryControls() {
  const [user, setUser] = useState<User | null>(null)
  const [active, setActive] = useState<string>(ALL)
  const [refine, setRefine] = useState<Refine>(EMPTY_REFINE)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const revealed = !!user
  const counts = useMemo(() => categoryCounts(), [])
  const toggleRefine = (key: keyof Refine) => setRefine((r) => ({ ...r, [key]: !r[key] }))
  const anyRefine = refine.free || refine.dofollow || refine.highDr || refine.highTraffic
  const filtersActive = anyRefine || active !== ALL

  const passes = (d: LaunchDirectory) =>
    (active === ALL || d.category === active) &&
    (!refine.free || d.cost === 'Free') &&
    (!refine.dofollow || d.dofollow) &&
    (!refine.highDr || d.dr >= 80) &&
    (!refine.highTraffic || isHighTraffic(d))

  const matchCount = LAUNCH_DIRECTORIES.filter(passes).length

  // Unlock the gated value (row tips + playbook) once logged in.
  useEffect(() => {
    const root = document.getElementById('launch-page-root')
    root?.classList.toggle('ld-revealed', revealed)
  }, [revealed])

  // Filter the server-rendered rows in place (no re-render of the list).
  useEffect(() => {
    const list = document.getElementById('ld-directory-list')
    if (!list) return
    list.querySelectorAll<HTMLElement>('[data-ld-row]').forEach((row) => {
      const d = row.dataset
      const ok =
        (active === ALL || d.category === active) &&
        (!refine.free || d.cost === 'Free') &&
        (!refine.dofollow || d.dofollow === 'y') &&
        (!refine.highDr || d.highdr === 'y') &&
        (!refine.highTraffic || d.hightraffic === 'y')
      row.style.display = ok ? '' : 'none'
    })
    list.hidden = matchCount === 0
  }, [active, refine, matchCount])

  const clearFilters = () => {
    setActive(ALL)
    setRefine(EMPTY_REFINE)
  }

  return (
    <>
      {/* Category filter */}
      <div className="ld-filters rv" role="tablist" aria-label="Filter directories by category">
        <button
          type="button"
          className={`ld-pill${active === ALL ? ' is-active' : ''}`}
          aria-pressed={active === ALL}
          onClick={() => setActive(ALL)}
        >
          All
          <span className="ld-pill-count">{LAUNCH_DIRECTORIES.length}</span>
        </button>
        {LAUNCH_CATEGORIES.map((cat: LaunchCategory) => {
          const c = counts.find((x) => x.category === cat)
          return (
            <button
              key={cat}
              type="button"
              className={`ld-pill${active === cat ? ' is-active' : ''}`}
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
            >
              {cat}
              <span className="ld-pill-count">{c?.count ?? 0}</span>
            </button>
          )
        })}
      </div>

      {/* Refine toggles */}
      <div className="ld-toggles rv" role="group" aria-label="Refine directories">
        <span className="ld-toggles-label">Refine</span>
        {REFINE_CHIPS.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className={`ld-toggle${refine[chip.key] ? ' is-on' : ''}`}
            aria-pressed={refine[chip.key]}
            onClick={() => toggleRefine(chip.key)}
          >
            {chip.label}
          </button>
        ))}
        {filtersActive && (
          <button type="button" className="ld-toggle-clear" onClick={clearFilters}>
            Clear all
          </button>
        )}
      </div>

      {/* Insight / status line */}
      <div className="ld-insight rv">
        <p>
          <strong>
            {matchCount} {matchCount === 1 ? 'directory' : 'directories'}
          </strong>{' '}
          <span className="ld-insight-dim">
            {filtersActive ? 'match your filters' : 'free to browse'}
            {revealed && <> · tips unlocked <span className="ld-insight-check">✓</span></>}
          </span>
        </p>
      </div>

      {/* Tips unlock strip — only while the value-add is still gated */}
      {!revealed && (
        <div className="ld-tips-lock rv">
          <span className="ld-tips-lock-text">
            <span className="ld-tips-lock-ico" aria-hidden>🔒</span>
            We wrote a{' '}
            <strong>
              submission tip for every one of these {LAUNCH_DIRECTORIES.length} directories
            </strong>{' '}
            — plus a step-by-step launch playbook. Both are free with an account.
          </span>
          <LaunchCta variant="account" label="Unlock all tips — free →" className="btn btn--primary btn--sm" />
        </div>
      )}

      {/* Empty state (shown by this component; the server list hides itself) */}
      {matchCount === 0 && (
        <div className="ld-empty rv">
          <p>No directories match these filters.</p>
          <button type="button" className="btn btn--outline btn--sm" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}
