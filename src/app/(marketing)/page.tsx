import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturesGrid from '@/components/landing/FeaturesGrid'
import PreviewSection from '@/components/landing/PreviewSection'
import NicheGrid from '@/components/landing/NicheGrid'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'
import { getFreeIdeas, getPaidPreviewIdeas, getIndustries } from '@/lib/supabase/queries'

export default async function HomePage() {
  let freeIdeas: Awaited<ReturnType<typeof getFreeIdeas>> = []
  let lockedIdeas: Awaited<ReturnType<typeof getPaidPreviewIdeas>> = []
  let industries: { industry: string; count: number }[] = []

  try {
    ;[freeIdeas, lockedIdeas, industries] = await Promise.all([
      getFreeIdeas(45),
      getPaidPreviewIdeas(3),
      getIndustries(),
    ])
  } catch {
    // Will render with empty data gracefully
  }

  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <PreviewSection ideas={freeIdeas} lockedIdeas={lockedIdeas} />
      <FeaturesGrid />
      <NicheGrid industries={industries} />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  )
}
