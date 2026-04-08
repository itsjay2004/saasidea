import type { Metadata } from 'next'
import { Newsreader, DM_Sans } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import RouteTransitionLoader from '@/components/ui/RouteTransitionLoader'

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

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=document.documentElement;if(s==='dark')d.classList.add('dark');else d.classList.remove('dark');}catch(e){document.documentElement.classList.remove('dark');}})();`

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${newsreader.variable} ${dmSans.variable} antialiased`}>
        <Suspense fallback={null}>
          <RouteTransitionLoader />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
