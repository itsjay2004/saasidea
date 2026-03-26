'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react'
import Button from './Button'
import { createClient } from '@/lib/supabase/client'
import AuthModal from '@/components/auth/AuthModal'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCTA = () => {
    if (!user) { setShowAuth(true); return }
    window.location.href = '/ideas'
  }

  const navLinks = [
    { label: 'Features',     href: '/#features' },
    { label: 'Browse Ideas', href: '/#preview' },
    { label: 'Pricing',      href: '/#pricing' },
    { label: 'FAQ',          href: '/#faq' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_1px_20px_rgba(28,25,23,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
            : 'bg-background/70 backdrop-blur-md border-b border-border/40 dark:border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent text-white shadow-accent transition-all duration-200 group-hover:scale-105">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-text-primary tracking-tight">SaaSIdea Pro</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2.5">
              {user ? (
                <Link href="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
              ) : (
                <Button size="sm" onClick={handleCTA}>
                  Login / Signup
                </Button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background animate-slide-down">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-3">
                {user ? (
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full">Dashboard</Button>
                  </Link>
                ) : (
                  <Button size="sm" className="w-full" onClick={handleCTA}>
                    Get Lifetime Access
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
