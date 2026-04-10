import Image from 'next/image'
import Link from 'next/link'
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
    <footer className="relative bg-background/80 backdrop-blur-sm">
      {/* Gradient top border — text-gradient colors, fades from center to sides */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F59E0B 100%)',
          maskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 mb-8">
          <div className="flex items-start sm:items-center gap-3">
            <div className="min-w-0">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo-light.png"
                  alt="SaaSIdea Pro"
                  width={140}
                  height={35}
                  className="h-7 sm:h-8 w-auto dark:hidden"
                />
                <Image
                  src="/logo-dark.png"
                  alt="SaaSIdea Pro"
                  width={140}
                  height={35}
                  className="hidden h-7 sm:h-8 w-auto dark:block"
                />
              </Link>
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
