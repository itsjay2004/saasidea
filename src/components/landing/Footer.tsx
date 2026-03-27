import Link from 'next/link'
import { Zap } from 'lucide-react'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'

const links = [
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refunds', href: '/refund-policy' },
  { label: 'Contact', href: 'mailto:hello@saasidea.pro' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 mb-8">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-white shadow-accent shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-text-primary text-sm sm:text-base">SaaSIdea Pro</span>
              <p className="text-xs text-text-subtle leading-tight mt-0.5 max-w-[18rem]">
                Find your next SaaS idea.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-text-subtle text-left leading-relaxed">
            &copy; {new Date().getFullYear()} SaaSIdea Pro. All rights reserved.
            <span className="mx-1.5 opacity-30">&middot;</span>
            <Link
              href="/ideas"
              className="text-[10px] text-text-subtle/70 hover:text-text-subtle transition-colors whitespace-nowrap"
            >
              Library
            </Link>
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  )
}
