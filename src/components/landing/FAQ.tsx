'use client'

import { useState } from 'react'
import { Plus, Minus, CircleQuestionMark } from 'lucide-react'
import { faqItems } from '@/lib/faq-data'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-14 sm:py-24 bg-surface-alt section-mesh overflow-hidden">
      <div className="orb orb-blue top-[15%] right-[-5%] w-[400px] h-[400px]" />
      <div className="orb orb-purple bottom-[10%] left-[-5%] w-[350px] h-[350px]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-subtle border border-accent/50 dark:border-blue-800 text-xs font-semibold text-accent tracking-wide uppercase mb-5">
            <CircleQuestionMark className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqItems.map((faq, i) => (
            <div
              key={faq.q}
              className={`glass-card rounded-card-lg overflow-hidden shadow-card transition-all duration-200 ${
                open === i ? 'border-accent/30' : 'hover:border-border-light'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={`font-medium text-[15px] leading-snug transition-colors ${
                  open === i ? 'text-text-primary' : 'text-text-muted'
                }`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  open === i ? 'bg-accent text-white' : 'bg-surface-2 text-text-subtle'
                }`}>
                  {open === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
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
