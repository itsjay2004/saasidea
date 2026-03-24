'use client'

import { Check, Zap, ShieldCheck, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { getCheckoutUrl } from '@/lib/dodo'
import { useState, useEffect } from 'react'
import AuthModal from '@/components/auth/AuthModal'
import type { User } from '@supabase/supabase-js'

const benefits = [
  '1,200+ pain-driven SaaS ideas',
  '15 industries, 75 niches',
  'MRR potential + build time on every idea',
  'Competition level + difficulty rating',
  'Keyword data where available',
  'New ideas added regularly',
  'Lifetime access — no subscription',
  '30-day money back guarantee',
]

export default function Pricing() {
  const [user, setUser]         = useState<User | null>(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handlePurchase = () => {
    if (!user) { setShowAuth(true); return }
    window.location.href = getCheckoutUrl(user.email!, user.id)
  }

  return (
    <>
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Simple Pricing</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
              One Price. Everything Included. Forever.
            </h2>
          </div>

          {/* Two-column pricing card */}
          <div className="relative rounded-2xl overflow-hidden bg-surface border border-border shadow-card-lg">

            {/* Subtle top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-purple-400 to-accent opacity-70" />

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* ── Left column: price & CTA ── */}
              <div className="flex flex-col justify-between p-10 md:p-12 md:border-r border-border">
                <div>
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-semibold mb-8 border border-accent/20">
                    <Zap className="w-3 h-3" /> Best Value
                  </span>

                  {/* Product name */}
                  <h3 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary leading-tight mb-4">
                    Complete<br />Collection
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-base leading-relaxed mb-10 max-w-xs">
                    Get instant access to thousands of validated micro SaaS ideas, deep-dive market research, and expert strategies to build your next profitable business.
                  </p>
                </div>

                <div>
                  {/* Price block */}
                  <div className="mb-8">
                    <div className="flex items-end gap-3 mb-1">
                      <span
                        className="font-heading font-bold text-text-primary leading-none"
                        style={{ fontSize: 'clamp(4rem, 10vw, 6rem)' }}
                      >
                        $49
                      </span>
                      <div className="pb-3">
                        <span className="block text-sm font-medium text-text-subtle line-through">$99</span>
                        <span className="block text-sm text-text-muted">one-time</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-subtle">Lifetime access · no subscription</p>
                  </div>

                  {/* CTA button */}
                  <Button
                    className="w-full sm:w-auto gap-2 group"
                    size="lg"
                    onClick={handlePurchase}
                  >
                    Get Instant Access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>

                  {/* Trust line */}
                  <div className="flex items-center gap-2 mt-5 text-xs text-text-subtle">
                    <ShieldCheck className="w-3.5 h-3.5 text-success flex-shrink-0" />
                    Secure checkout · 30-day money-back guarantee
                  </div>
                </div>
              </div>

              {/* ── Right column: benefits ── */}
              <div className="flex flex-col justify-center p-10 md:p-12 bg-surface-alt">
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-subtle mb-7">
                  Everything you need to succeed, including:
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-accent-subtle flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
                      </span>
                      <span className="text-[15px] leading-snug text-text-muted">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
