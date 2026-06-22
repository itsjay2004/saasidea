const rows = [
  { label: 'Where ideas come from', us: 'Real, documented complaints', ai: 'Training-data patterns', free: 'Mostly recycled / AI', prem: 'Real research (usually)' },
  {
    label: 'Proof of demand attached',
    us: <><span className="chk">✓</span> Source threads cited</>,
    ai: <span className="crs">✗</span>,
    free: <span className="crs">✗</span>,
    prem: <><span className="chk">✓</span> Sometimes</>,
  },
  {
    label: 'MRR + build estimates',
    us: <><span className="chk">✓</span> Every idea</>,
    ai: <><span className="crs">✗</span> It&apos;ll guess</>,
    free: <span className="crs">✗</span>,
    prem: <span className="chk">✓</span>,
  },
  {
    label: 'Competition + difficulty data',
    us: <><span className="chk">✓</span> Every idea</>,
    ai: <span className="crs">✗</span>,
    free: <span className="crs">✗</span>,
    prem: <span className="chk">✓</span>,
  },
  {
    label: '1,200+ ideas, ready now',
    us: <><span className="chk">✓</span> Instant</>,
    ai: 'One at a time',
    free: '~50, generic',
    prem: <><span className="chk">✓</span> Often drip-fed</>,
  },
  {
    label: 'Cost',
    us: <span style={{ color: 'var(--a)', fontWeight: 500 }}>$29 · once, forever</span>,
    ai: 'Free (but guesses)',
    free: 'Free (but generic)',
    prem: '$199–999 / year',
  },
]

export default function Compare() {
  return (
    <section className="compare">
      <div className="wrap">
        <div className="rv">
          <span className="eyebrow">The honest comparison</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(30px,4.2vw,46px)', color: 'var(--t)', marginBottom: 6 }}
          >
            Why not just ask AI,
            <br />
            or grab a free list?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--t2)', fontWeight: 300 }}>
            Fair question. Here&apos;s every other way to get an idea — and exactly where each one
            leaves you.
          </p>
        </div>
        <div className="comp-table-wrap rv">
          <table className="comp-table">
            <thead>
              <tr>
                <th />
                <th className="col-us">SaaSIdea Pro</th>
                <th>Ask AI</th>
                <th>Free idea lists</th>
                <th>Premium subscriptions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td className="col-us">{r.us}</td>
                  <td>{r.ai}</td>
                  <td>{r.free}</td>
                  <td>{r.prem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="comp-note rv">
          AI gives you patterns. Subscriptions charge you yearly. We give you documented demand — for
          the price of two coffees, once.
        </p>
      </div>
    </section>
  )
}
