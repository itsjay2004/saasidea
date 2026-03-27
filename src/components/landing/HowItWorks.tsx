import { Search, BarChart3, Rocket, Sparkle } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Browse 1000+ Ideas & 100+ Niche',
    desc: 'Filter across industry & niches by complixity, Build Time, competition etc.',
  },
  {
    num: '02',
    icon: BarChart3,
    title: 'Evaluate Every Idea with Real Data',
    desc: 'MRR potential, build time estimate, target audience, pain point, and keyword data.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Build What People Already Want',
    desc: 'Every idea is derived from pain points of real users. Demand is already there. Just build.',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-14 sm:py-24 bg-background section-glow">
      <div className="orb orb-violet top-[10%] left-[-5%] w-[500px] h-[500px]" />
      <div className="orb orb-blue bottom-[5%] right-[-5%] w-[400px] h-[400px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-subtle border border-accent/15 text-xs font-semibold text-accent tracking-wide uppercase mb-5">
            <Sparkle className="w-3.5 h-3.5" />
            READY TO BUILD IDEAS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Pick an Idea. Know the Market. <span className='text-gradient'>Start Building</span>
          </h2>
          <p className="text-text-muted max-w-md mx-auto text-base leading-relaxed">
            Everything You Need to Launch a Profitable SaaS Business
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-px border-t border-dashed border-border-light z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative glass-card rounded-card-lg p-5 sm:p-8 text-center shadow-card hover:shadow-card-md hover:-translate-y-0.5 hover:border-border-light transition-all duration-200 z-10"
            >
              {/* Step number top-right */}
              <span className="absolute top-4 right-5 text-[11px] font-mono font-semibold text-accent/50">
                {step.num}
              </span>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-subtle border border-accent/15 text-accent mb-5 shadow-accent">
                <step.icon className="w-6 h-6" />
              </div>

              <h3 className="font-heading text-xl font-bold text-text-primary mb-3 text-balance">
                {step.title}
              </h3>
              <p className="text-text-muted text-[15px] leading-[1.8]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
