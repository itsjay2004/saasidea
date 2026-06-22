const steps = [
  {
    num: '01',
    title: 'Listen everywhere',
    body: (
      <>
        Reddit. X. Hacker News. Dev forums. App-store reviews. We read where people complain.{' '}
        <strong>One signal we hunt: &ldquo;there&apos;s no good tool for this.&rdquo;</strong>
      </>
    ),
  },
  {
    num: '02',
    title: 'Confirm the pattern',
    body: (
      <>
        One complaint is noise.{' '}
        <strong>The same frustration across 30+ posts in different communities</strong> is a market
        — not an edge case. No pattern, no card.
      </>
    ),
  },
  {
    num: '03',
    title: 'Stress-test the gap',
    body: (
      <>
        What exists already? Why are people still unhappy?{' '}
        <strong>Is there real room for a solo dev to win?</strong> We answer all three before it
        goes in.
      </>
    ),
  },
  {
    num: '04',
    title: 'Attach the numbers',
    body: (
      <>
        Pain source. MRR range. Build time. Competition. Difficulty. Pricing.{' '}
        <strong>Everything you need to decide — on one card.</strong>
      </>
    ),
  },
]

export default function Methodology() {
  return (
    <section className="methodology" id="how">
      <div className="wrap meth-layout">
        <div className="meth-head rv">
          <span className="eyebrow eyebrow--a">How every idea earns its place</span>
          <h2 className="display">
            We don&apos;t invent ideas.
            <br />
            We <em>go find them.</em>
          </h2>
          <p>
            Four steps, run at scale. Every single card in the library went through all of them.
          </p>
        </div>

        <div className="meth-timeline">
          {steps.map((s, i) => (
            <div className={`meth-row rv${i > 0 ? ` d${i}` : ''}`} key={s.num}>
              <div className="meth-num">{s.num}</div>
              <div className="meth-content">
                <h3 className="meth-title display">{s.title}</h3>
                <p className="meth-text">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
