import { Search, BarChart3, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Browse by Industry or Niche',
    desc: 'Filter 1,200+ ideas by industry, difficulty, MRR potential, and competition level to find your perfect match.',
  },
  {
    num: '02',
    icon: BarChart3,
    title: 'Evaluate with Real Data',
    desc: 'Every idea shows MRR potential, build time estimate, target audience, pain point, and keyword search data.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Build with Confidence',
    desc: 'Know your market before you write a single line of code. Validate demand, understand competition, start building.',
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
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Simple Process</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            From Idea to Launch-Ready in Minutes
          </h2>
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
