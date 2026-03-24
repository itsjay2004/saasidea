'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

export default function IdeasError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Something went wrong</h2>
      <p className="text-text-muted mb-6">We had trouble loading the ideas. Please try again.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
