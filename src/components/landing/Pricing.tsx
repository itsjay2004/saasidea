'use client'

import { Check, Lock, Zap } from 'lucide-react'
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
  const [user, setUser] = useState<User | null>(null)
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
    if (!user) {
      setShowAuth(true)
      return
    }
    window.location.href = getCheckoutUrl(user.email!, user.id)
  }

  return (
    <>
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Simple Pricing</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
              One Price. Everything Included. Forever.
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative bg-surface border-2 border-accent/50 rounded-card-lg p-8 shadow-2xl shadow-accent/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                  <Zap className="w-3 h-3" /> Best Value
                </span>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="text-2xl text-text-subtle line-through">$99</span>
                  <span className="text-5xl font-bold text-text-primary font-heading">$49</span>
                </div>
                <p className="text-text-muted text-sm">one-time payment</p>
              </div>

              <Button className="w-full mb-8 gap-2" size="lg" onClick={handlePurchase}>
                Get Instant Access <Zap className="w-4 h-4" />
              </Button>

              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-text-subtle">
                  <Lock className="w-3.5 h-3.5" />
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
