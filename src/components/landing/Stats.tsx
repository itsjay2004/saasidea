import { Lightbulb, Building2, Layers, DollarSign } from 'lucide-react'

const stats = [
  { value: '1,200+', label: 'Validated Ideas', icon: Lightbulb },
  { value: '15', label: 'Industries', icon: Building2 },
  { value: '75+', label: 'Niches', icon: Layers },
  { value: '$0', label: 'Monthly fee — pay once', icon: DollarSign },
]

export default function Stats() {
  return (
    <section className="py-12 border-y border-border bg-surface/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="text-3xl font-bold text-text-primary font-heading">{stat.value}</div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
