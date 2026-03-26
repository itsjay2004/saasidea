import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Compass,
  TrendingUp,
  Layers,
  Sparkles,
  Shield,
  Mail,
  Calendar,
  Grid3X3,
  Network,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { hasAccess, getIndustries, getTotalIdeasCount, getNicheStats } from '@/lib/supabase/queries'
import Button from '@/components/ui/Button'
import LogoutButton from '@/components/ui/LogoutButton'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

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

  const [userHasAccess, industries, totalIdeas, nicheStats] = await Promise.all([
    hasAccess(user.id),
    getIndustries(),
    getTotalIdeasCount(),
    getNicheStats(),
  ])

  const justPaid = payment === 'success'
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there'
  const firstName = displayName.split(' ')[0]
  const initial = displayName.charAt(0).toUpperCase()
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const industryCount = industries.length

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:justify-between mb-8 sm:mb-10">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-accent shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight break-words">
              Welcome back, {firstName}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5 break-all sm:break-normal">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <ThemeSwitcher />
          <LogoutButton />
        </div>
      </div>

      {justPaid && (
        <div className="bg-success/10 border border-success/20 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up">
          <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-text-primary mb-1 text-sm sm:text-base">Payment successful — you&apos;re in!</h2>
            <p className="text-text-muted text-sm mb-3">
              Lifetime access unlocked. Start exploring {totalIdeas.toLocaleString()}+ validated SaaS ideas now.
            </p>
            <Link href="/ideas">
              <Button size="sm" className="gap-2 w-full sm:w-auto">
                Browse All Ideas <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            value: `${totalIdeas.toLocaleString()}+`,
            label: 'SaaS Ideas',
            icon: Sparkles,
            color: 'text-accent',
            bg: 'bg-accent/10',
          },
          {
            value: industryCount.toString(),
            label: 'Industries',
            icon: Layers,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
          },
          {
            value: nicheStats.niches.toLocaleString(),
            label: 'Niches',
            icon: Grid3X3,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
          },
          {
            value: nicheStats.subNiches.toLocaleString(),
            label: 'Sub-niches',
            icon: Network,
            color: 'text-sky-500',
            bg: 'bg-sky-500/10',
          },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-surface border border-border rounded-2xl p-4 sm:p-5 lg:p-6"
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-text-primary tracking-tight leading-none mb-1 break-words">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {userHasAccess ? (
        <>
          <div className="mb-10">
            <h2 className="text-lg font-bold text-text-primary mb-4">Explore ideas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  href: '/ideas',
                  icon: Compass,
                  title: 'Browse All',
                  desc: 'Full catalog with filters',
                  color: 'text-accent',
                  bg: 'bg-accent/10',
                  border: 'hover:border-accent/30',
                },
                {
                  href: '/ideas?sort=mrr-high',
                  icon: TrendingUp,
                  title: 'Top MRR',
                  desc: 'Highest earning potential',
                  color: 'text-emerald-500',
                  bg: 'bg-emerald-500/10',
                  border: 'hover:border-emerald-500/30',
                },
                {
                  href: '/ideas?sort=easiest',
                  icon: Zap,
                  title: 'Quick Wins',
                  desc: 'Easiest to build first',
                  color: 'text-amber-500',
                  bg: 'bg-amber-500/10',
                  border: 'hover:border-amber-500/30',
                },
                {
                  href: '/ideas?sort=newest',
                  icon: Sparkles,
                  title: 'Fresh Drops',
                  desc: 'Latest additions this week',
                  color: 'text-sky-500',
                  bg: 'bg-sky-500/10',
                  border: 'hover:border-sky-500/30',
                },
              ].map(card => (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group bg-surface border border-border rounded-2xl p-4 sm:p-5 ${card.border} hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm mb-1">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-text-muted mb-3">{card.desc}</p>
                  <span className="text-xs font-medium text-accent flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mb-10">
          <div className="bg-surface border border-border rounded-2xl p-5 sm:p-8 text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-text-primary mb-2">Unlock Full Access</h2>
            <p className="text-text-muted text-sm max-w-md mx-auto">
              Get lifetime access to {totalIdeas.toLocaleString()}+ validated SaaS ideas across {industryCount} industries.
            </p>
          </div>
          <Pricing />
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-text-primary mb-4">Account</h2>
        <div className="bg-surface border border-border rounded-2xl divide-y divide-border">
          <div className="flex items-center gap-3.5 px-4 sm:px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center">
              <Mail className="w-4 h-4 text-text-subtle" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-subtle mb-0.5">Email</p>
              <p className="text-sm font-medium text-text-primary truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-4 sm:px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center">
              <Shield className="w-4 h-4 text-text-subtle" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-subtle mb-0.5">Plan</p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-text-primary">
                  {userHasAccess ? 'Lifetime Access' : 'Free'}
                </p>
                {userHasAccess && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-4 sm:px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-text-subtle" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-subtle mb-0.5">Member since</p>
              <p className="text-sm font-medium text-text-primary">{memberSince}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
