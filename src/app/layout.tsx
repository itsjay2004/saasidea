import type { Metadata } from 'next'
import { Newsreader, DM_Sans } from 'next/font/google'
import './globals.css'

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

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=document.documentElement;if(s==='light')d.classList.remove('dark');else d.classList.add('dark');}catch(e){}})();`

export const metadata: Metadata = {
  title: 'SaaSIdea Pro — 1,200+ Validated SaaS Ideas for Founders',
  description:
    'Browse 1,200+ pain-driven SaaS ideas across 100+ niches. Each idea includes MRR potential, build time, competition data, and keyword research. All in One-time payment.',
  metadataBase: new URL('https://saasidea.pro'),
  openGraph: {
    title: 'SaaSIdea Pro — 1,200+ Validated SaaS Ideas for Founders',
    description:
      'Browse 1,200+ pain-driven SaaS ideas across 100+ niches. MRR potential, build time, competition data, and keyword research included.',
    url: 'https://saasidea.pro',
    siteName: 'SaaSIdea Pro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaSIdea Pro — 1,200+ Validated SaaS Ideas for Founders',
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
        {children}
      </body>
    </html>
  )
}
