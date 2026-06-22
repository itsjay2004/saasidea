'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AuthModal from '@/components/auth/AuthModal'
import type { User } from '@supabase/supabase-js'

export default function Nav() {
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

    // Check for ?login=true query param to open AuthModal automatically
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('login') === 'true') {
        setShowAuth(true)
        // Clean up URL search params so the modal doesn't re-open on refresh
        const newUrl = window.location.pathname
        window.history.replaceState({}, '', newUrl)
      }
    }

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-mark display">S</div>
            <span className="nav-brand display">
              SaaSIdea<em>Pro</em>
            </span>
          </Link>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#samples">Sample ideas</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            {user ? (
              <Link href="/dashboard" className="nav-cta">
                Dashboard
              </Link>
            ) : (
              <>
                <button type="button" className="nav-signin" onClick={() => setShowAuth(true)}>
                  Sign in
                </button>
                <a href="#pricing" className="nav-cta">
                  Get access — $29
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode="login" />}
    </>
  )
}
