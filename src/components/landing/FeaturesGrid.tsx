import { Lightbulb, TrendingUp, LayoutGrid, BarChart2, Search, Infinity } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: '1,200+ Pain-Driven Ideas',
    desc: 'Every idea is built around a real, specific frustration — not generic concepts. Real pain = real paying customers.',
  },
  {
    icon: TrendingUp,
    title: 'MRR & Build Time Estimates',
    desc: "Know your revenue potential and how long it'll take to build before you commit. No more guessing.",
  },
  {
    icon: LayoutGrid,
    title: 'Industry & Niche Taxonomy',
    desc: 'Browse 15 industries, 75 niches, and 375 sub-niches. Find ideas in your area of expertise or interest.',
  },
  {
    icon: BarChart2,
    title: 'Difficulty & Competition Data',
    desc: 'Easy, Medium, Hard difficulty ratings plus low/medium/high competition levels so you know where to start.',
  },
  {
    icon: Search,
    title: 'Keyword Search Data',
    desc: 'Primary keyword search volume, CPC, and bid range for ideas that have keyword data — so you can plan SEO.',
  },
  {
    icon: Infinity,
    title: 'One-Time Payment, Forever Access',
    desc: 'No subscriptions. No monthly fees. Pay once and access everything including all future ideas added.',
  },
]

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-14 sm:py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">What You Get</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Everything You Need to Find Your Next SaaS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-surface border border-border rounded-card-lg p-6 shadow-card hover:shadow-card-md hover:-translate-y-0.5 hover:border-border-light transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-subtle border border-accent/15 text-accent mb-4 group-hover:bg-accent-light transition-colors duration-200">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-[17px] font-bold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-muted text-[15px] leading-[1.8]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
