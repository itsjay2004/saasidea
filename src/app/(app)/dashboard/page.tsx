import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { hasAccess } from '@/lib/supabase/queries'
import Button from '@/components/ui/Button'
import Pricing from '@/components/landing/Pricing'

export const metadata: Metadata = {
  title: 'Dashboard — SaaSIdea Pro',
}

interface PageProps {
  searchParams: Promise<{ payment?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const { payment } = await searchParams
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/?login=true')

  const userHasAccess = await hasAccess(user.id)
  const justPaid = payment === 'success'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
      <p className="text-text-muted mb-8">Welcome back, {user.email}</p>

      {justPaid && (
        <div className="bg-success/10 border border-success/20 rounded-card-lg p-6 mb-8 flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-success shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-text-primary mb-1">You&apos;re in!</h2>
            <p className="text-text-muted text-sm mb-3">Your payment was successful. You now have lifetime access to all 1,200+ ideas.</p>
            <Link href="/ideas">
              <Button size="sm" className="gap-2">
                Browse All Ideas <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {userHasAccess ? (
        <div className="bg-surface border border-border rounded-card-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Lifetime Access</h2>
              <p className="text-sm text-text-muted">You have full access to all ideas</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Link href="/ideas" className="bg-surface-2 border border-border rounded-card p-4 hover:border-accent/30 transition-colors">
              <h3 className="font-medium text-text-primary mb-1">Browse Ideas</h3>
              <p className="text-sm text-text-muted">Explore all 1,200+ ideas</p>
            </Link>
            <Link href="/ideas?sort=newest" className="bg-surface-2 border border-border rounded-card p-4 hover:border-accent/30 transition-colors">
              <h3 className="font-medium text-text-primary mb-1">Latest Ideas</h3>
              <p className="text-sm text-text-muted">See the newest additions</p>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-surface border border-border rounded-card-lg p-8 text-center mb-8">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-2">Unlock Full Access</h2>
            <p className="text-text-muted text-sm mb-4">Get lifetime access to 1,200+ validated SaaS ideas</p>
          </div>
          <Pricing />
        </div>
      )}
    </div>
  )
}
