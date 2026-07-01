import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <Image src="/logo-icon.png" alt="SaaSIdea Pro" width={160} height={160} className="nav-mark-img" />
              <span className="nav-brand display">
                SaaS<em>Idea</em>
              </span>
            </div>
            <p className="footer-tagline">
              1,200+ SaaS ideas, each traced to a real complaint. $29 once — no subscription, ever.
            </p>
          </div>
          <div className="footer-links-group">
            <div className="footer-link-col">
              <span className="footer-link-title">Product</span>
              <Link href="/free-ideas">Free Ideas</Link>
              <a href="#samples">Sample Ideas</a>
              <a href="#industries">Industries</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-link-col">
              <span className="footer-link-title">Company</span>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/refund-policy">Refunds</Link>
              <a href="mailto:hello@saasidea.pro">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 SaaSIdea Pro. All rights reserved.
            <Link href="/ideas" className="footer-seo-link">Full idea library</Link>
          </p>
          <div className="footer-guarantee-bar">
            <span className="footer-guarantee-dot" />
            15-day money-back guarantee &nbsp;·&nbsp; Secure checkout &nbsp;·&nbsp; Lifetime access
          </div>
        </div>
      </div>
    </footer>
  )
}
