import type { Metadata } from 'next'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import RouteTransitionLoader from '@/components/ui/RouteTransitionLoader'

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
  applicationName: 'SaaSIdea Pro',
  authors: [{ name: 'SaaSIdea Pro', url: 'https://saasidea.pro' }],
  creator: 'SaaSIdea Pro',
  publisher: 'SaaSIdea Pro',
  category: 'business',
  keywords: [
    'SaaS ideas',
    'validated startup ideas',
    'micro SaaS ideas',
    'startup ideas for founders',
    'SaaS business ideas',
    'profitable SaaS ideas',
    'indie hacker ideas',
    'SaaS niche ideas',
    'MRR potential',
    'keyword research for SaaS',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon-logo.png', type: 'image/png' }],
    shortcut: '/favicon.ico',
    apple: '/icon-logo.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: '1,200+ Validated SaaS Ideas for Founders | SaaSIdea Pro',
    description:
      'Browse 1,200+ pain-driven SaaS ideas across 100+ niches. MRR potential, build time, competition data, and keyword research included.',
    url: 'https://saasidea.pro',
    siteName: 'SaaSIdea Pro',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@saas_idea',
    creator: '@saas_idea',
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
      <body className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <RouteTransitionLoader />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
