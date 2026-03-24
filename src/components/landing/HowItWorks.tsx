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
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Simple Process</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            From Idea to Launch-Ready in Minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-surface border border-border rounded-card-lg p-8 text-center group hover:border-accent/30 transition-colors">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-6">
                <step.icon className="w-6 h-6" />
              </div>
              <span className="absolute top-4 right-4 text-xs font-mono text-text-subtle">{step.num}</span>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
