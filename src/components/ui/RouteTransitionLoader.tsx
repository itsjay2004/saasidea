'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import LoaderScreen from './LoaderScreen'

export default function RouteTransitionLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const transitionKey = `${pathname}?${searchParams.toString()}`
  const previousKey = useRef<string | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (previousKey.current === null) {
      previousKey.current = transitionKey
      return
    }

    if (previousKey.current !== transitionKey) {
      previousKey.current = transitionKey
      setVisible(true)

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        setVisible(false)
        timeoutRef.current = null
      }, 750)
    }
  }, [transitionKey])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!visible) return null

  return <LoaderScreen title="Loading" />
}
