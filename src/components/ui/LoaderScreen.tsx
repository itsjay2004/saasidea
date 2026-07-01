'use client'

import { useEffect, useState } from 'react'

interface LoaderScreenProps {
  title?: string
  subtitle?: string
}

const DOT_COUNT = 3
const DOT_DELAY = [0, 150, 300] // ms stagger per dot

export default function LoaderScreen({
  title = 'Loading',
  subtitle,
}: LoaderScreenProps) {
  // Animated dots: cycle 0 → 1 → 2 → 3 active dots
  const [dotStep, setDotStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setDotStep(s => (s + 1) % (DOT_COUNT + 1)), 420)
    return () => clearInterval(id)
  }, [])

  const dots = Array.from({ length: DOT_COUNT }, (_, i) => i < dotStep)

  const label = subtitle ? `${title} ${subtitle}` : title

  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-background/60 px-4 backdrop-blur-[2px] animate-fade-in"
      style={{ animationDuration: '0.15s' }}
    >
      <div
        role="status"
        aria-live="polite"
        aria-label={label}
        className="animate-loader-in flex items-center gap-3 rounded-full border border-border/80 bg-surface/95 px-5 py-3 shadow-card-md"
      >
        {/* Ring spinner */}
        <span className="relative h-5 w-5 shrink-0" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border border-border-light" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accent/60 motion-reduce:animate-none" />
        </span>

        {/* Text + animated dots */}
        <span className="text-sm font-semibold tracking-[-0.01em] text-text-primary select-none" aria-hidden="true">
          {title}
          <span className="inline-flex gap-[2px] ml-[2px]">
            {dots.map((active, i) => (
              <span
                key={i}
                className={`transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-20'}`}
              >
                .
              </span>
            ))}
          </span>
        </span>
      </div>
    </div>
  )
}
