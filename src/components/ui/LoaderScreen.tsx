interface LoaderScreenProps {
  title?: string
  subtitle?: string
}

const dots = [0, 1, 2, 3, 4]

export default function LoaderScreen({
  title = 'Loading',
  subtitle = 'Please wait a moment',
}: LoaderScreenProps) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      <div className="glass-card relative w-full max-w-[340px] overflow-hidden rounded-[28px] border border-border bg-surface/90 px-6 py-6 shadow-card-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-accent/10 dark:from-white/5 dark:to-accent/10 pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-5 flex h-12 items-center justify-center gap-2">
            {dots.map((dot) => (
              <span
                key={dot}
                className="h-3 w-3 rounded-full bg-gradient-to-br from-accent via-fuchsia-500 to-amber-400 shadow-[0_0_18px_rgba(124,58,237,0.25)] animate-[loaderDot_1.05s_ease-in-out_infinite]"
                style={{ animationDelay: `${dot * 110}ms` }}
              />
            ))}
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent mb-2">
            SaaSIdea Pro
          </p>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            {subtitle}
          </p>

          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-accent via-fuchsia-500 to-amber-400 animate-[loaderSweep_1.25s_ease-in-out_infinite]" />
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-text-subtle">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span>Preparing your next view</span>
          </div>
        </div>
      </div>
    </div>
  )
}
