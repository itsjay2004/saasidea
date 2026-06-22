import OfferBar from '@/components/landing/v3/OfferBar'
import Nav from '@/components/landing/v3/Nav'
import Footer from '@/components/landing/v3/Footer'
import Reveal from '@/components/landing/v3/Reveal'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v3">
      <OfferBar />
      <Nav />
      <main>{children}</main>
      <Footer />
      <Reveal />
    </div>
  )
}
