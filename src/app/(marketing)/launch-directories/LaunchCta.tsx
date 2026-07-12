'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getCheckoutUrl } from '@/lib/dodo'
import AuthModal from '@/components/auth/AuthModal'
import type { User } from '@supabase/supabase-js'

/**
 * Self-contained conversion button used across the /launch-directories page
 * (hero, locked overlay, email capture, finale). Reuses the same auth →
 * checkout flow as the landing Pricing card so behaviour stays consistent:
 *
 *  - variant="unlock"  → sends a logged-in user straight to Dodo checkout,
 *                        otherwise opens the auth modal first (then they buy).
 *  - variant="account" → opens the signup modal (free-account / email capture).
 */
export default function LaunchCta({
  variant,
  label,
  className = 'btn btn--primary',
}: {
  variant: 'unlock' | 'account'
  label: string
  className?: string
}) {
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

  const handleClick = () => {
    if (variant === 'account') {
      setShowAuth(true)
      return
    }
    // unlock → checkout
    if (!user) {
      setShowAuth(true)
      return
    }
    window.location.href = getCheckoutUrl(user.email!, user.id)
  }

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {label}
      </button>
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          initialMode={variant === 'account' ? 'signup' : 'login'}
        />
      )}
    </>
  )
}
