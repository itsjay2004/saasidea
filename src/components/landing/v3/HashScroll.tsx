'use client'

import { useEffect } from 'react'

/**
 * On initial load of the marketing page with a hash (e.g. arriving from an app
 * route via `/#pricing`), the App Router resets scroll to top and the native
 * hash jump fires before hydration/layout settle — so the section is never
 * reached. This polls for the target element and scrolls to it once present.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 2) return

    const id = decodeURIComponent(hash.slice(1))
    let raf = 0
    let tries = 0

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      // Element not mounted yet — retry for up to ~2s.
      if (tries++ < 120) raf = requestAnimationFrame(tryScroll)
    }

    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
