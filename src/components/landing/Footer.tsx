import Link from 'next/link'
import { Zap } from 'lucide-react'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'

const links = [
  { label: 'Pricing',      href: '/#pricing'   },
  { label: 'FAQ',          href: '/#faq'       },
  { label: 'Contact',      href: 'mailto:hello@saasidea.pro' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent text-white shadow-accent">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-text-primary text-sm">SaaSIdea Pro</span>
              <p className="text-xs text-text-subtle leading-tight mt-0.5">Find your next SaaS idea.</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-subtle text-center sm:text-left">
            &copy; {new Date().getFullYear()} SaaSIdea Pro. All rights reserved.
            <span className="mx-1.5 opacity-30">·</span>
            <Link
              href="/ideas"
              className="text-[10px] text-text-subtle/50 hover:text-text-subtle transition-colors"
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
