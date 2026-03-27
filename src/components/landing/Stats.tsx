import { Lightbulb, Building2, Layers, DollarSign } from 'lucide-react'

const stats = [
  { value: '1000+', label: 'Validated Ideas', icon: Lightbulb },
  { value: '15', label: 'Industries', icon: Building2 },
  { value: '100+', label: 'Niches', icon: Layers },
  { value: '$0/mo', label: 'No subscription ever', icon: DollarSign },
]

export default function Stats() {
  return (
    <section className="relative border-y border-border/50 bg-surface-alt/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4 px-4 py-6 sm:px-6 sm:py-8">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-text-primary font-heading leading-none mb-0.5 sm:mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-text-subtle leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
