const features = [
  {
    num: '01',
    title: (
      <>
        The exact complaint
        <br />
        it came from — <em>not a guess</em>
      </>
    ),
    body: (
      <>
        Every idea links back to a real moment: a Reddit thread where someone said &ldquo;there&apos;s
        no good tool for this,&rdquo; an app review trashing the alternatives, a forum asking if
        anything exists. <strong>Documented pain, not a hypothetical market.</strong> If people are
        frustrated enough to post about it, they&apos;ll pay to make it stop.
      </>
    ),
  },
  {
    num: '02',
    title: (
      <>
        The revenue ceiling,
        <br />
        before you commit
      </>
    ),
    body: (
      <>
        Each idea carries an MRR range (based on comparable products and pricing in the space) and a
        realistic build-time estimate. Before you hand 6 weeks of your life to a project, you should
        know whether the ceiling is <strong>$500/mo or $5,000/mo.</strong> Both are on the card.
      </>
    ),
  },
  {
    num: '03',
    title: (
      <>
        Whether you&apos;ve got
        <br />
        a clear lane
      </>
    ),
    body: (
      <>
        Some gaps are wide open. Others have three funded startups already fighting. Every idea is
        rated <strong>Low / Medium / High</strong> on competition and on build difficulty — so you
        can match an idea to your risk appetite and your timeline.
      </>
    ),
  },
  {
    num: '04',
    title: (
      <>
        A product spec,
        <br />
        <em>not a prompt</em>
      </>
    ),
    body: (
      <>
        Each idea is a concrete, buildable product — a clear tagline, the exact target audience, and
        a suggested pricing model.{' '}
        <strong>
          Not &ldquo;build a SaaS for therapists,&rdquo; but the specific tool, for the specific
          person, priced a specific way.
        </strong>{' '}
        Enough to open your editor and start today.
      </>
    ),
  },
]

export default function WhatsIncluded() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head rv">
          <span className="eyebrow">What&apos;s on every card</span>
          <h2 className="section-title">
            Weeks of validation,
            <br />
            <em>already done.</em>
          </h2>
          <p className="section-sub">
            Validating one idea from scratch is weeks of Reddit deep-dives, competitor pricing
            research, and market sizing. Every idea here has already been through all of it — so you
            skip straight to building.
          </p>
        </div>

        <div className="features-grid rv">
          {features.map((f) => (
            <div className="feature-card" key={f.num}>
              <span className="feature-num">{f.num}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
