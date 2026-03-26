import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden">

      {/* ─── Ambient Background ───────────────────── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Primary glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 blur-[140px] rounded-full animate-pulse" />

        {/* Secondary glow */}
        <div className="absolute bottom-[-100px] left-[20%] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />

        {/* Floating orbs */}
        <div className="absolute top-[20%] left-[10%] w-6 h-6 bg-accent/40 rounded-full blur-sm animate-bounce" />
        <div className="absolute bottom-[25%] right-[15%] w-4 h-4 bg-accent/30 rounded-full blur-sm animate-ping" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.06))]" />
      </div>

      {/* ─── Grid Texture ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,var(--text-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-primary)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* ─── Main Card ───────────────────────────── */}
      <div className="relative z-10 text-center px-8 py-12 rounded-3xl border border-border bg-surface backdrop-blur-2xl shadow-lg max-w-xl w-full">

        {/* Animated 404 */}
        <h1 className="font-heading text-[90px] sm:text-[120px] font-bold tracking-tight leading-none mb-4 bg-gradient-to-b from-text-primary to-text-subtle bg-clip-text text-transparent">
          404
        </h1>

        {/* Accent divider */}
        <div className="w-20 h-[2px] bg-accent mx-auto mb-6 rounded-full shadow-accent" />

        {/* Headline */}
        <p className="text-text-primary text-xl sm:text-2xl font-medium mb-2">
          This page slipped into the void
        </p>

        {/* Subtext */}
        <p className="text-text-subtle text-sm sm:text-base mb-10 max-w-md mx-auto">
          Either it never existed, got moved, or you just found a hidden edge of the internet.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">

          <Link href="/">
            <Button className="gap-2 shadow-accent hover:scale-[1.04] active:scale-[0.98] transition-all">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

        </div>

        {/* Easter micro-copy */}
        <p className="mt-8 text-[11px] text-text-subtle opacity-70">
          error_code: reality_not_found
        </p>

      </div>

    </div>
  )
}