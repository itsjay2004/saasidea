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
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-subtle transition-all duration-200 hover:border-border-light hover:bg-surface-2 hover:text-text-primary"
    >
      {ready ? (
        isDark
          ? <Sun className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" aria-hidden />
          : <Moon className="h-3.5 w-3.5 transition-transform group-hover:-rotate-12" aria-hidden />
      ) : (
        <span className="h-3.5 w-3.5 rounded-full bg-border-light animate-pulse" aria-hidden />
      )}
    </button>
  )
}
