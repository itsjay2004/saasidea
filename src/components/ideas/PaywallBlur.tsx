'use client'

import { Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getCheckoutUrl } from '@/lib/dodo'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import AuthModal from '@/components/auth/AuthModal'

interface PaywallBlurProps {
  children: React.ReactNode
  locked: boolean
}

export default function PaywallBlur({ children, locked }: PaywallBlurProps) {
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

  return (
    <>
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent flex flex-col items-center justify-center gap-3">
          <div className="bg-surface-2 rounded-full p-3">
            <Lock className="w-5 h-5 text-text-muted" />
          </div>
          <p className="text-sm text-text-muted font-medium">Unlock 1,200+ Ideas</p>
          <Button size="sm" onClick={handleUnlock}>
            Get Access — $49 one-time
          </Button>
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
