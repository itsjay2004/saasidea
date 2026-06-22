'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getCheckoutUrl } from '@/lib/dodo'
import AuthModal from '@/components/auth/AuthModal'
import type { User } from '@supabase/supabase-js'

const features = [
  { strong: true, text: '1,200+ ideas, each traced to a real complaint' },
  { strong: false, text: 'MRR range + build-time estimate — every idea' },
  { strong: false, text: 'Competition level + difficulty rating — every idea' },
  { strong: false, text: 'Documented pain point + target audience — every idea' },
  { strong: false, text: 'Suggested pricing model per idea' },
  { strong: false, text: '9 live industries + 100+ niches (more added monthly)' },
  { strong: true, text: 'Lifetime access — every future idea included, free' },
  { strong: false, text: '15-day money-back guarantee — no questions' },
]

export default function Pricing() {
  const [user, setUser] = useState<User | null>(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
      <section className="section section--alt" id="pricing">
        <div className="wrap">
          <div className="pricing-roi rv">
            <span className="eyebrow eyebrow--accent" style={{ display: 'block', textAlign: 'center' }}>
              Pricing
            </span>
            <h2 className="pricing-roi-title">
              One wrong idea costs you
              <br />6 weeks. <em>This costs $29.</em>
            </h2>
            <div className="pricing-roi-comps">
              <div className="pricing-comp-item">
                Cursor — <strong>$20/mo</strong>
              </div>
              <span className="pricing-comp-vs">vs</span>
              <div className="pricing-comp-item">
                Idea subscriptions — <strong>$199+/yr</strong>
              </div>
              <span className="pricing-comp-vs">vs</span>
              <div className="pricing-comp-item">
                Building the wrong thing — <strong>weeks of your life</strong>
              </div>
              <span className="pricing-comp-vs">vs</span>
              <div className="pricing-comp-item" style={{ borderColor: 'var(--ab)', color: 'var(--a)' }}>
                SaaSIdea Pro — <strong>$29 once</strong>
              </div>
            </div>
          </div>

          <div className="pricing-card rv">
            <span className="pricing-badge">Launch price</span>
            <div className="pricing-card-top">
              <span className="pricing-plan-name">Lifetime Access</span>
              <div className="pricing-amount">
                <span className="pricing-price-dollar">$</span>
                <span className="pricing-price">29</span>
                <span className="pricing-old">$99</span>
              </div>
              <p className="pricing-desc">
                1,200+ demand-backed SaaS ideas, every data point attached. Pay once. Access
                everything — including every idea we add later — forever.
              </p>
              <div className="pricing-cta-wrap">
                <button type="button" className="btn btn--primary" onClick={handlePurchase}>
                  Unlock the library — $29
                </button>
                <p className="pricing-secure">
                  🔒 Secure checkout &nbsp;·&nbsp; Instant access &nbsp;·&nbsp; No subscription
                </p>
              </div>
            </div>
            <div className="pricing-card-features">
              <span className="pricing-features-label">Everything included</span>
              <div className="pricing-feature-list">
                {features.map((f, i) => (
                  <div className="pricing-feature-item" key={i}>
                    <div className="pricing-feature-check">✓</div>
                    <span>{f.strong ? <strong>{f.text}</strong> : f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pricing-guarantee rv">
            <span className="pg-icon">🛡️</span>
            <strong>Browse the whole thing risk-free.</strong> Go through all 1,200+ ideas. If you
            don&apos;t find a single one worth building, email{' '}
            <a href="mailto:hello@saasidea.pro">hello@saasidea.pro</a> within 15 days for a full
            refund. No forms, no hoops, no questions.
          </div>
        </div>
      </section>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
