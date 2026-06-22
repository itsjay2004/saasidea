const pains = [
  { d: '', stmt: 'Ideas everywhere. Conviction nowhere.', note: 'Your notes are full of maybes. Not one feels safe enough to bet a month of your life on.' },
  { d: 'd1', stmt: 'A graveyard of dead repos.', note: 'You start strong, lose faith around week two, and move on to the next one. Every time.' },
  { d: 'd2', stmt: 'Months in. Zero users.', note: "You shipped something clean. Nobody showed up. You still don't know why." },
  { d: '', stmt: "Cursor's ready. You're not.", note: 'You can ship a SaaS in a weekend now. You just don’t know which one is worth the weekend.' },
  { d: 'd1', stmt: 'Weeks of your life, on a hunch.', note: 'Every project is a bet placed blind — you only learn if anyone wanted it after it’s built.' },
  { d: 'd2', stmt: 'More features. Still no buyers.', note: 'You keep adding. The features were never the problem — the idea was.' },
]

export default function WhoItsFor() {
  return (
    <section className="for">
      <div className="wrap">
        <div className="for-head rv">
          <span className="eyebrow">Who it&apos;s for</span>
          <h2 className="display">
            The bottleneck
            <br />
            isn&apos;t your code.
          </h2>
          <p>
            Solo founder, indie hacker, or vibe-coding your tenth weekend project — the trap is the
            same. If any of these land, this was built for you.
          </p>
        </div>

        <div className="pain-grid">
          {pains.map((p, i) => (
            <div className={`pain-card rv${p.d ? ` ${p.d}` : ''}`} key={i}>
              <span className="pain-x">✕</span>
              <p className="pain-stmt display">{p.stmt}</p>
              <p className="pain-note">{p.note}</p>
            </div>
          ))}
        </div>

        <div className="for-resolution rv">
          <div className="fr-left">
            <h3 className="display">Start from demand, not a hunch.</h3>
            <p>
              Every idea here already has people asking for it. You just browse, pick the one that
              fits you, and build.
            </p>
          </div>
          <div className="fr-right">
            <a href="/free-ideas" className="btn btn--outline">
              Browse free ideas
            </a>
            <a href="#pricing" className="btn btn--primary">
              Get the library — $29
            </a>
          </div>
        </div>

        <p className="for-not rv">
          Not for: dropshipping, no-code templates, or content businesses. These are buildable SaaS
          products — for people who can build (or vibe-code) them.
        </p>
      </div>
    </section>
  )
}
