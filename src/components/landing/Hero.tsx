import Link from 'next/link'
import { ArrowRight, ArrowDown, Star } from 'lucide-react'
import Button from '@/components/ui/Button'

const cardColorStyles: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-400',
  green: 'bg-green-500/10 text-green-400',
  orange: 'bg-orange-500/10 text-orange-400',
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 grid-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          1,200+ Validated Ideas &bull; Updated Monthly
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] mb-6 tracking-tight">
          Stop Guessing.<br />
          Start Building Ideas<br />
          <span className="text-accent">People Actually Want.</span>
        </h1>

        <p className="max-w-xl mx-auto text-text-muted text-lg sm:text-xl leading-relaxed mb-10">
          1,200+ pain-driven SaaS ideas across 100s of niches.
          Each idea includes MRR potential, build time, competition level,
          and keyword data. One-time payment. Lifetime access.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="/ideas">
            <Button size="lg" className="gap-2 text-base">
              Browse All Ideas <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#preview">
            <Button variant="secondary" size="lg" className="gap-2 text-base">
              See What&apos;s Inside <ArrowDown className="w-4 h-4" />
            </Button>
          </a>
        </div>

        <div className="flex items-center justify-center gap-1 mb-16">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 text-sm text-text-muted">Trusted by 2,000+ founders</span>
        </div>

        {/* Floating preview cards */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { industry: 'Fintech', difficulty: 'Easy', title: 'Micro-SaaS Invoice Tracker', tagline: 'Automated invoice reconciliation for freelancers who lose track of payments', mrr: '$800 – $3K', build: '2–4 wks', color: 'blue' },
              { industry: 'Health & Wellness', difficulty: 'Medium', title: 'Therapist Session Notes AI', tagline: 'AI-powered SOAP notes generator for mental health professionals', mrr: '$2K – $8K', build: '4–6 wks', color: 'green' },
              { industry: 'E-commerce', difficulty: 'Easy', title: 'Returns Analytics Dashboard', tagline: 'Help DTC brands reduce return rates with pattern analysis', mrr: '$1K – $5K', build: '3–5 wks', color: 'orange' },
            ].map((card, i) => (
              <div
                key={i}
                className="relative bg-surface border border-border rounded-card-lg p-5 text-left shadow-xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cardColorStyles[card.color] ?? 'bg-gray-500/10 text-gray-400'}`}>
                    {card.industry}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${card.difficulty === 'Easy' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-amber-900/50 text-amber-400'}`}>
                    {card.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-text-primary text-sm mb-1">{card.title}</h3>
                <p className="text-text-muted text-xs line-clamp-2 mb-3">{card.tagline}</p>
                <div className="flex items-center gap-3 text-xs text-text-subtle mb-3">
                  <span>MRR: {card.mrr}</span>
                  <span>Build: {card.build}</span>
                </div>
                <div className="h-12 bg-gradient-to-t from-surface via-surface/80 to-transparent absolute bottom-0 left-0 right-0 rounded-b-card-lg backdrop-blur-[2px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
