'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-surface/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">FAQ</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface border border-border rounded-card-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-text-primary text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-text-subtle shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
