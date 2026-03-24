import Link from 'next/link'
import { Zap } from 'lucide-react'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-bold text-text-primary">SaaSIdea Pro</span>
            <span className="text-text-subtle text-sm ml-2">Find your next SaaS idea.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/ideas" className="text-sm text-text-muted hover:text-text-primary transition-colors">Browse Ideas</Link>
            <Link href="/#pricing" className="text-sm text-text-muted hover:text-text-primary transition-colors">Pricing</Link>
            <Link href="/#faq" className="text-sm text-text-muted hover:text-text-primary transition-colors">FAQ</Link>
            <a href="mailto:hello@saasidea.pro" className="text-sm text-text-muted hover:text-text-primary transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-subtle text-center sm:text-left">
            &copy; 2025 SaaSIdea Pro. All rights reserved.
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  )
}
