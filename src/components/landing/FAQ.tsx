'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What exactly is in the idea library?',
    a: '1,200+ SaaS ideas each with a title, tagline, the specific pain point it solves, target audience, estimated MRR range, build time, difficulty level, competition level, pricing model suggestion, and keyword data where available. Ideas span 15 industries and 75 niches.',
  },
  {
    q: 'How is this different from free idea lists online?',
    a: 'Free lists give you generic ideas with no data. Every idea here includes MRR potential, build time estimates, competition level, and is built around a specific real pain point — not a vague concept. Plus keyword search data for planning your SEO.',
  },
  {
    q: 'Do I need to be a developer to use this?',
    a: "No. The ideas are useful for anyone evaluating what to build — developers, no-coders, or founders looking to hire. Difficulty ratings and build time estimates help you gauge what's realistic.",
  },
  {
    q: 'Is this really a one-time payment?',
    a: 'Yes. Pay once, access everything forever including all new ideas added in the future. No monthly fees, no subscription.',
  },
  {
    q: "What if it's not right for me?",
    a: "30-day money back guarantee, no questions asked. Email us and you'll get a full refund.",
  },
  {
    q: 'How often are new ideas added?',
    a: 'New batches of ideas are added regularly. All future additions are included in your one-time purchase.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-14 sm:py-24 bg-surface-alt section-mesh overflow-hidden">
      <div className="orb orb-blue top-[15%] right-[-5%] w-[400px] h-[400px]" />
      <div className="orb orb-purple bottom-[10%] left-[-5%] w-[350px] h-[350px]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass-card rounded-card-lg overflow-hidden shadow-card transition-all duration-200 ${
                open === i ? 'border-accent/30' : 'hover:border-border-light'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={`font-medium text-[15px] leading-snug transition-colors ${open === i ? 'text-text-primary' : 'text-text-muted'}`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  open === i ? 'bg-accent text-white' : 'bg-surface-2 text-text-subtle'
                }`}>
                  {open === i
                    ? <Minus className="w-3 h-3" />
                    : <Plus  className="w-3 h-3" />
                  }
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  open === i ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-6 text-[15px] text-text-muted leading-[1.8]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
