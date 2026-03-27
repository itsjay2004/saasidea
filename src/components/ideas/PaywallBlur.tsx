'use client'

import { ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getCheckoutUrl } from '@/lib/dodo'
import { PRICING } from '@/lib/config'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import AuthModal from '@/components/auth/AuthModal'

interface PaywallBlurProps {
  children: React.ReactNode
  locked: boolean
  preview?: React.ReactNode
  title?: string
  subtitle?: string
  note?: string
  highlights?: string[]
  secondaryHref?: string
  secondaryLabel?: string
}

export default function PaywallBlur({
  children,
  locked,
  preview,
  title = 'Unlock the full breakdown',
  subtitle = 'Get lifetime access to the full ideas library.',
  note,
  highlights,
  secondaryHref,
  secondaryLabel,
}: PaywallBlurProps) {
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  if (!locked) return <>{children}</>

  const handleUnlock = () => {
    if (!user) {
      setShowAuth(true)
      return
    }
    window.location.href = getCheckoutUrl(user.email!, user.id)
  }

  const blurredContent = preview ?? children

  return (
    <>
      <div className="relative max-h-[820px] overflow-hidden">
        <div className="blur-sm pointer-events-none select-none">
          {blurredContent}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Ambient glow (inspired by landing preview orbs) */}
          <div className="orb orb-violet top-[-18%] left-[-10%] w-[520px] h-[520px] opacity-90" />
          <div className="orb orb-cyan bottom-[-22%] right-[-12%] w-[460px] h-[460px] opacity-75" />
          <div className="orb orb-purple top-[38%] right-[8%] w-[320px] h-[320px] opacity-60" />

          {/* A gentle tint layer so the glow is noticeable even over solid backgrounds */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-accent-subtle/35 to-accent-subtle/65 dark:via-accent/10 dark:to-accent/20" />

          <div className="max-w-[520px] w-full text-center flex flex-col items-center gap-3 relative">
            <div className="bg-surface-2 rounded-full p-3">
              <Lock className="w-5 h-5 text-text-muted" />
            </div>

            <p className="text-base sm:text-lg text-text-primary font-semibold leading-snug">
              {title}
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              {subtitle}
            </p>

            {note && (
              <p className="text-xs text-text-subtle leading-relaxed -mt-1">
                {note}
              </p>
            )}

            {highlights && highlights.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-2 text-text-muted border border-border/60"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-2 mt-2">
              <Button size="sm" onClick={handleUnlock}>
                {PRICING.ctaPaywall}
              </Button>
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="group text-sm font-semibold text-accent inline-flex items-center gap-2 hover:underline underline-offset-4"
                >
                  <span>{secondaryLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
