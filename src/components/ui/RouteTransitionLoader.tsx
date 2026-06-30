'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import LoaderScreen from './LoaderScreen'

const MIN_DISPLAY_MS = 200 // prevent flash on instant navigations

export default function RouteTransitionLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const transitionKey = `${pathname}?${searchParams.toString()}`

  const previousKey = useRef<string | null>(null)
  const shownAt = useRef<number | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [visible, setVisible] = useState(false)

  // Show loader when the key changes (navigation started)
  useEffect(() => {
    if (previousKey.current === null) {
      previousKey.current = transitionKey
      return
    }

    if (previousKey.current !== transitionKey) {
      previousKey.current = transitionKey
      shownAt.current = Date.now()
      setVisible(true)
    }
  }, [transitionKey])

  // Hide loader once the new page has rendered (this effect runs after paint)
  useEffect(() => {
    if (!visible) return

    const elapsed = shownAt.current ? Date.now() - shownAt.current : 0
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)

    hideTimer.current = setTimeout(() => {
      setVisible(false)
      shownAt.current = null
    }, remaining)

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  })

  if (!visible) return null
  return <LoaderScreen title="Loading" />
}
