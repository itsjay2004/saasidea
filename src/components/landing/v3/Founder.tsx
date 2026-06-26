import Image from 'next/image'

export default function Founder() {
  return (
    <section className="founder">
      <div className="wrap">
        <div className="founder-inner rv">
          <span className="founder-quote-mark display">&ldquo;</span>
          <div className="founder-body">
            <p>
              We spent years shipping products nobody asked for — clean code, polished UIs, launches
              that landed in silence. The skill was never the problem. We kept building from{' '}
              <em>our own</em> heads instead of from real, proven demand.
            </p>
            <p>
              So we flipped it and read the complaints first. Reddit, forums, app-store reviews —
              anywhere people asked &ldquo;why doesn&apos;t a tool for this exist?&rdquo; When the
              same frustration surfaced dozens of times across different communities, we&apos;d dig
              in, weigh the competition, size the gap, and write it up.{' '}
              <strong>That research is the whole product.</strong>
            </p>
            <p>
              We won&apos;t promise you&apos;ll get rich. <strong>No one honest can.</strong> What we
              will promise: you&apos;ll never start from a blank screen and a hunch again. You&apos;ll
              start from people who already told you what they want.
            </p>
          </div>
          <div className="founder-sign">
            <div className="founder-av">
              <Image
                src="/logo-icon.png"
                alt="SaaSIdea Pro"
                width={46}
                height={46}
                className="founder-av-img"
              />
            </div>
            <div>
              <div className="founder-name">The SaaSIdea team</div>
              <div className="founder-role">Builders who got tired of building the wrong thing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
