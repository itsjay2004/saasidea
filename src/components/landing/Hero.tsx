'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowDown, ShieldCheck, Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import AuthModal from '@/components/auth/AuthModal'
import { PRICING } from '@/lib/config'
import { formatNumber } from '@/lib/utils'

type PreviewCard = {
  industry: string
  difficulty: string
  difficultyColor: string
  title: string
  tagline: string
  mrr: string
  build: string
  competition: 'low' | 'medium' | 'high'
  keyword: string
  searchVolume: number
  industryColor: string
}

const CARDS: PreviewCard[] = [
  {
    industry: 'Fintech', difficulty: 'Easy', difficultyColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
    title: 'Micro-SaaS Invoice Tracker',
    tagline: 'Automated invoice reconciliation for freelancers who lose track of payments',
    mrr: '$800-$3K', build: '2-4 wks',
    competition: 'low',
    keyword: 'freelance invoice tracker',
    searchVolume: 9500,
    industryColor: 'text-blue-700 dark:text-blue-400 bg-blue-500/10',
  },
  {
    industry: 'Health & Wellness', difficulty: 'Medium', difficultyColor: 'text-amber-700 dark:text-amber-400 bg-amber-500/10',
    title: 'Therapist Session Notes AI',
    tagline: 'AI-powered SOAP notes generator for mental health professionals',
    mrr: '$2K-$8K', build: '4-6 wks',
    competition: 'medium',
    keyword: 'soap notes software',
    searchVolume: 12100,
    industryColor: 'text-green-700 dark:text-green-400 bg-green-500/10',
  },
  {
    industry: 'E-commerce', difficulty: 'Easy', difficultyColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
    title: 'Returns Analytics Dashboard',
    tagline: 'Help DTC brands reduce return rates with intelligent pattern analysis',
    mrr: '$1K-$5K', build: '3-5 wks',
    competition: 'high',
    keyword: 'ecommerce returns analytics',
    searchVolume: 5400,
    industryColor: 'text-orange-700 dark:text-orange-400 bg-orange-500/10',
  }
]

const floatClasses = ['animate-float delay-0', 'animate-float-alt delay-300', 'animate-float delay-600']

function CompetitionSegments({ level }: { level: 'low' | 'medium' | 'high' }) {
  const filled = level === 'low' ? 1 : level === 'medium' ? 2 : 3
  const color = level === 'low' ? 'bg-emerald-500' : level === 'medium' ? 'bg-amber-400' : 'bg-red-500'
  const labelColor = level === 'low'
    ? 'text-emerald-700 dark:text-emerald-400'
    : level === 'medium'
      ? 'text-amber-700 dark:text-amber-400'
      : 'text-red-700 dark:text-red-400'
  const label = level === 'low' ? 'Low' : level === 'medium' ? 'Medium' : 'High'

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[3px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`w-4 h-[5px] rounded-sm ${i <= filled ? color : 'bg-border-light dark:bg-border'}`} />
        ))}
      </div>
      <span className={`text-[11px] font-semibold ${labelColor}`}>{label}</span>
    </div>
  )
}

function PreviewIdeaCard({ card, className }: { card: PreviewCard; className?: string }) {
  return (
    <div className={`glass-card rounded-card-lg p-5 text-left shadow-card-md border border-border/60 ${className || ''}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${card.industryColor}`}>
          {card.industry}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${card.difficultyColor}`}>
          {card.difficulty}
        </span>
      </div>

      <h3 className="font-bold text-text-primary text-sm mb-1.5 leading-snug line-clamp-2">{card.title}</h3>
      <p className="text-text-muted text-[13px] line-clamp-2 mb-3 leading-[1.65]">{card.tagline}</p>

      <div className="grid grid-cols-2 gap-3 mb-3.5">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1 font-semibold">MRR Est.</div>
          <div className="text-[13px] font-bold text-text-primary">{card.mrr}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1 font-semibold">Build</div>
          <div className="text-[13px] font-bold text-text-primary">{card.build}</div>
        </div>
      </div>

      <div className="border-t border-border/40 pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1.5 font-semibold">Competition</div>
            <CompetitionSegments level={card.competition} />
          </div>
          <div className="text-right min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-text-subtle mb-1.5 font-semibold">Keyword</div>
            <div className="flex items-center justify-end gap-1.5 text-[13px] font-bold text-text-primary">
              <Search className="w-3.5 h-3.5 text-text-subtle shrink-0" />
              {formatNumber(card.searchVolume)}/mo
            </div>
            <div className="text-[11px] text-text-muted mt-0.5 truncate max-w-[160px]">
              &ldquo;{card.keyword}&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-14 sm:pt-16 overflow-hidden">

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-60 dark:opacity-100" />

        {/* Gradient mask over grid (top portion stays, fades to bottom) */}
        <div className="absolute inset-0"
          style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
        />

        {/* Ambient glow orbs */}
        <div className="orb orb-violet top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[500px]" />
        <div className="orb orb-pink top-[15%] right-[5%] w-[400px] h-[400px]" />
        <div className="orb orb-blue top-[25%] left-[5%] w-[350px] h-[350px]" />
        <div className="orb orb-purple bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px]" />

        <div className="relative mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 text-center">

          {/* Badge */}
          <div className="animate-fade-in-up inline-flex max-w-full min-w-0 flex-wrap items-center justify-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white dark:bg-accent-subtle border border-border text-accent text-[11px] sm:text-[13px] font-semibold tracking-[0.06em] mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
            1000+ Validated SaaS Ideas
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-100 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold sm:font-bold text-text-primary leading-[1.12] sm:leading-[1.1] tracking-[0.005em] mb-5 sm:mb-6 break-words text-balance">
            Hit
            <span className="text-gradient"> $1K MRR </span>
            Faster With The Right Idea<br />
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up delay-200 mx-auto mb-10 max-w-2xl min-w-0 text-pretty break-words text-[1.02rem] sm:text-[1.2rem] leading-[1.7] sm:leading-[1.75] font-medium text-text-muted">
            Stop building the wrong thing. Find validated SaaS ideas based on real demand and pain points—so you build something people would pay for.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Button size="lg" className="gap-2 text-base" onClick={() => setShowAuth(true)}>
              {PRICING.ctaHero} <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="#preview">
              <Button variant="secondary" size="lg" className="gap-2 text-base">
                See What&apos;s Inside <ArrowDown className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Money-back guarantee */}
          <div className="animate-fade-in-up delay-350 flex items-center justify-center gap-1.5 mb-10 text-text-subtle text-sm">
            <ShieldCheck className="w-4 h-4 text-success shrink-0" />
            <span>
              15-day money-back guarantee
              <span className="hidden sm:inline"> &mdash; no questions asked</span>
            </span>
          </div>

          {/* Social proof */}
          <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-14 sm:mb-20">
            <Image
              src="/trusted_user.png"
              alt="Founders who use SaaSIdea Pro"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-sm font-semibold text-text-primary leading-tight text-center sm:text-left">Trusted by 500+ founders &amp; indie hackers</span>
              <span className="text-xs text-text-muted leading-tight text-center sm:text-left">already building with these ideas</span>
            </div>
          </div>

          {/* Preview cards - marquee on mobile, static grid on sm+ */}
          <div className="animate-fade-in-up delay-500">

            {/* Mobile: continuous auto-scroll marquee */}
            <div className="min-w-0 sm:hidden overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
                {[...CARDS, ...CARDS].map((card, i) => (
                  <PreviewIdeaCard
                    key={i}
                    card={card}
                    className="w-[78vw] max-w-[300px] flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Desktop: static 3-col grid with float animations */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {CARDS.map((card, i) => (
                <PreviewIdeaCard
                  key={i}
                  card={card}
                  className={`${floatClasses[i]} hover:shadow-card-lg hover:border-border-light transition-all duration-300`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
