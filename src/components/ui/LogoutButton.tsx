'use client'

import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-text-muted hover:text-danger rounded-button border border-border hover:border-danger/30 hover:bg-danger/5 transition-all"
    >
      <LogOut className="w-3.5 h-3.5" />
      Sign out
    </button>
  )
}
