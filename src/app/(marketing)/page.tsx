import Hero from '@/components/landing/v3/Hero'
import Strip from '@/components/landing/v3/Strip'
import Objection from '@/components/landing/v3/Objection'
import Methodology from '@/components/landing/v3/Methodology'
import WhoItsFor from '@/components/landing/v3/WhoItsFor'
import SampleIdeas from '@/components/landing/v3/SampleIdeas'
import StatsBar from '@/components/landing/v3/StatsBar'
import WhatsIncluded from '@/components/landing/v3/WhatsIncluded'
import Industries from '@/components/landing/v3/Industries'
import Compare from '@/components/landing/v3/Compare'
import Founder from '@/components/landing/v3/Founder'
import Pricing from '@/components/landing/v3/Pricing'
import FAQ from '@/components/landing/v3/FAQ'
import Finale from '@/components/landing/v3/Finale'
import JsonLd from '@/components/seo/JsonLd'
import { getFreeIdeas, getPaidPreviewIdeas, getIndustries } from '@/lib/supabase/queries'
import { getHomeJsonLd } from '@/lib/structured-data'

export default async function HomePage() {
  let freeIdeas: Awaited<ReturnType<typeof getFreeIdeas>> = []
  let lockedIdeas: Awaited<ReturnType<typeof getPaidPreviewIdeas>> = []
  let industries: { industry: string; count: number }[] = []

  try {
    ;[freeIdeas, lockedIdeas, industries] = await Promise.all([
      getFreeIdeas(16),
      getPaidPreviewIdeas(3),
      getIndustries(),
    ])
  } catch {
    // Will render with empty/fallback data gracefully
  }

  const liveIndustries = industries.filter((i) => i.count > 0)
  const totalIdeas = industries.reduce((sum, i) => sum + i.count, 0)

  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <Hero />
      <Strip />
      <Objection />
      <Methodology />
      <WhoItsFor />
      <SampleIdeas ideas={freeIdeas} lockedIdeas={lockedIdeas} />
      <StatsBar totalIdeas={totalIdeas} industryCount={liveIndustries.length} />
      <WhatsIncluded />
      <Industries industries={industries} />
      <Compare />
      <Founder />
      <Pricing />
      <FAQ />
      <Finale />
    </>
  )
}
