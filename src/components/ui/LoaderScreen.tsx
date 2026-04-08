interface LoaderScreenProps {
  title?: string
  subtitle?: string
}

export default function LoaderScreen({
  title = 'Loading...',
  subtitle,
}: LoaderScreenProps) {
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-background/60 px-4 backdrop-blur-[2px]">
      <div
        role="status"
        aria-live="polite"
        aria-label={subtitle ? `${title} ${subtitle}` : title}
        className="flex items-center gap-3 rounded-full border border-border/80 bg-surface/95 px-4 py-3 shadow-card"
      >
        <span className="relative h-5 w-5 shrink-0">
          <span className="absolute inset-0 rounded-full border border-border-light" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accent/70" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-subtle" />
        </span>
        <span className="text-sm font-semibold tracking-[-0.01em] text-text-primary">
          {title}
        </span>
      </div>
    </div>
  )
}
