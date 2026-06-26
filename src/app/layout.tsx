import type { Metadata } from 'next'
import { Newsreader, DM_Sans, Fraunces, Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import RouteTransitionLoader from '@/components/ui/RouteTransitionLoader'
import { Providers } from './providers'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// ── v3 redesign typefaces ──
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// The app is dark-only (v3 design). Force the `dark` class so every `dark:`
// Tailwind variant resolves, regardless of any stale localStorage preference.
const themeInitScript = `(function(){try{document.documentElement.classList.add('dark');}catch(e){}})();`

export const metadata: Metadata = {
  title: '1,200+ Validated SaaS Ideas for Founders | SaaSIdea Pro',
  description:
    'Browse 1,200+ pain-driven SaaS ideas across 100+ niches. Each idea includes MRR potential, build time, competition data, and keyword research. One-time payment, lifetime access.',
  metadataBase: new URL('https://saasidea.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '1,200+ Validated SaaS Ideas for Founders | SaaSIdea Pro',
    description:
      'Browse 1,200+ pain-driven SaaS ideas across 100+ niches. MRR potential, build time, competition data, and keyword research included.',
    url: 'https://saasidea.pro',
    siteName: 'SaaSIdea Pro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1,200+ Validated SaaS Ideas for Founders | SaaSIdea Pro',
    description: 'Browse 1,200+ pain-driven SaaS ideas across 100+ niches.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${newsreader.variable} ${dmSans.variable} ${fraunces.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <RouteTransitionLoader />
        </Suspense>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}
