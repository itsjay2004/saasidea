'use client'

import { useLayoutEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'theme'

export default function ThemeSwitcher() {
  const [ready, setReady] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useLayoutEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    setReady(true)
  }, [])

  function toggle() {
    if (!ready) return
    const nextDark = !isDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    localStorage.setItem(STORAGE_KEY, nextDark ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-border-light hover:text-text-primary"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {ready ? (
        isDark ? (
          <>
            <Sun className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>Dark</span>
          </>
        )
      ) : (
        <span className="inline-flex h-4 w-16 items-center justify-center" aria-hidden>
          <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-border-light" />
        </span>
      )}
    </button>
  )
}
