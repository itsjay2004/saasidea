import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Button from '@/components/ui/Button'

const CARDS = [
  {
    industry: 'Fintech', difficulty: 'Easy', difficultyColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
    title: 'Micro-SaaS Invoice Tracker',
    tagline: 'Automated invoice reconciliation for freelancers who lose track of payments',
    mrr: '$800–$3K', build: '2–4 wks',
    industryColor: 'text-blue-700 dark:text-blue-400 bg-blue-500/10',
  },
  {
    industry: 'Health & Wellness', difficulty: 'Medium', difficultyColor: 'text-amber-700 dark:text-amber-400 bg-amber-500/10',
    title: 'Therapist Session Notes AI',
    tagline: 'AI-powered SOAP notes generator for mental health professionals',
    mrr: '$2K–$8K', build: '4–6 wks',
    industryColor: 'text-green-700 dark:text-green-400 bg-green-500/10',
  },
  {
    industry: 'E-commerce', difficulty: 'Easy', difficultyColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
    title: 'Returns Analytics Dashboard',
    tagline: 'Help DTC brands reduce return rates with intelligent pattern analysis',
    mrr: '$1K–$5K', build: '3–5 wks',
    industryColor: 'text-orange-700 dark:text-orange-400 bg-orange-500/10',
  },
]

const floatClasses = ['animate-float delay-0', 'animate-float-alt delay-300', 'animate-float delay-600']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60 dark:opacity-100" />

      {/* Gradient mask over grid (top portion stays, fades to bottom) */}
      <div className="absolute inset-0"
        style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/8 dark:bg-accent/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-[15%] w-[280px] h-[280px] bg-purple-400/8 dark:bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-60 left-[12%] w-[220px] h-[220px] bg-violet-400/6 dark:bg-violet-600/8 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-subtle dark:bg-accent-light/30 border border-accent/20 text-accent text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
          1,200+ Validated Ideas &bull; Updated Monthly
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.08] tracking-tight mb-6 text-balance">
          Stop Guessing.<br />
          Start Building Ideas<br />
          <span className="text-gradient">People Actually Want.</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-200 max-w-xl mx-auto text-text-muted text-xl sm:text-2xl leading-[1.75] mb-10">
          1,200+ pain-driven SaaS ideas across 100s of niches.
          Each idea includes MRR potential, build time, competition level,
          and keyword data. One-time payment. Lifetime access.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link href="/#pricing">
            <Button size="lg" className="gap-2 text-base">
              Get Lifetime Access — $29 <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#preview">
            <Button variant="secondary" size="lg" className="gap-2 text-base">
              See What&apos;s Inside <ArrowDown className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up delay-400 flex items-center justify-center gap-3 mb-20">
          <Image
            src="/trusted_user.png"
            alt="Founders who use SaaSIdea Pro"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-text-primary leading-tight">2,000+ founders</span>
            <span className="text-sm text-text-muted leading-tight">already building with these ideas</span>
          </div>
        </div>

        {/* Floating preview cards */}
        <div className="animate-fade-in-up delay-500 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`${floatClasses[i]} bg-surface border border-border rounded-card-lg p-5 text-left shadow-card-md hover:shadow-card-lg hover:border-border-light transition-all duration-300`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${card.industryColor}`}>
                  {card.industry}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${card.difficultyColor}`}>
                  {card.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-text-primary text-sm mb-1.5 leading-snug">{card.title}</h3>
              <p className="text-text-muted text-[13px] line-clamp-2 mb-3 leading-[1.65]">{card.tagline}</p>
              <div className="flex items-center gap-3 text-xs text-text-subtle">
                <span>MRR: <span className="text-text-muted font-medium">{card.mrr}</span></span>
                <span>Build: <span className="text-text-muted font-medium">{card.build}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
