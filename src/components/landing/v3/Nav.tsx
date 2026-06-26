'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import AuthModal from '@/components/auth/AuthModal'
import type { User } from '@supabase/supabase-js'

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
            <Image src="/logo-icon.png" alt="SaaSIdea Pro" width={160} height={160} priority className="nav-mark-img" />
            <span className="nav-brand display">
              SaaS<em>Idea</em>
            </span>
          </Link>
          <div className="nav-links">
            <a href="/#how">How it works</a>
            <a href="/free-ideas">Free ideas</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            {user ? (
              <Link href="/dashboard" className="nav-cta">
                Dashboard
              </Link>
            ) : (
              <>
                <button type="button" className="nav-signin" onClick={() => { setAuthMode('login'); setShowAuth(true) }}>
                  Sign in
                </button>
                <button type="button" className="nav-cta" onClick={() => { setAuthMode('signup'); setShowAuth(true) }}>
                  Get access — $29
                </button>
              </>
            )}
          </div>
          
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        <div className={`nav-mobile-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="nav-mobile-links">
            <a href="/#how" onClick={() => setIsMenuOpen(false)}>How it works</a>
            <a href="/free-ideas" onClick={() => setIsMenuOpen(false)}>Free ideas</a>
            <a href="/#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="/#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
          </div>
          <div className="nav-mobile-actions">
            {user ? (
              <Link href="/dashboard" className="nav-mobile-cta" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  className="nav-mobile-signin"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setAuthMode('login')
                    setShowAuth(true)
                  }}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className="nav-mobile-cta"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setAuthMode('signup')
                    setShowAuth(true)
                  }}
                >
                  Get access — $29
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode={authMode} />}
    </>
  )
}
