import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

type PolicySection = {
  title: string
  body: string[]
  bullets?: string[]
}

interface PolicyPageProps {
  title: string
  intro: string
  updatedAt: string
  sections: PolicySection[]
}

export default function PolicyPage({ title, intro, updatedAt, sections }: PolicyPageProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="orb orb-violet top-[-5%] left-[-8%] w-[420px] h-[420px]" />
      <div className="orb orb-blue top-[20%] right-[-10%] w-[360px] h-[360px]" />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:underline transition-colors mb-4 bg-accent-subtle hover:bg-accent-light rounded-md px-2 py-1 -ml-1">
            <ChevronLeft className="w-5 h-5" />
            Back to home
          </Link>


          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent mb-3">
            Legal
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
            {intro}
          </p>
          <p className="text-xs text-text-subtle mt-4">
            Last updated: {updatedAt}
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-card">
              <h2 className="font-semibold text-lg text-text-primary mb-3">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted list-disc pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 bg-accent-subtle dark:bg-accent/8 border border-accent/15 rounded-2xl p-5 sm:p-6">
          <p className="text-sm text-text-muted leading-relaxed">
            Questions about these policies? Contact us at{' '}
            <a href="mailto:hello@saasidea.pro" className="text-accent hover:underline">
              hello@saasidea.pro
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
