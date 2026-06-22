export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="wrap">
        <div className="hero-pill rv">
          <span className="pill-dot" />
          <span>1,200+ SaaS ideas</span>
          <span className="pill-sep">&nbsp;·&nbsp;</span>
          <span className="pill-extra">Real demand</span>
        </div>

        <h1 className="hero-h1 rv d1">
          Stop guessing
          <br />
          what to build.
          <br />
          <em>Start from demand.</em>
        </h1>

        <div className="hero-sub rv d2">
          <p className="hero-sub-main">
            <strong>
              1,200+ SaaS ideas — each one pulled from a real person saying &ldquo;why doesn&apos;t a
              good tool for this exist?&rdquo;
            </strong>
          </p>
          <p className="hero-sub-how">
            These aren&apos;t invented. Each one is mined from Reddit threads, developer forums, and
            app reviews — real problems people are already frustrated enough to post about — then
            pressure-tested before it reaches you.
          </p>
          <p className="hero-sub-data">
            Every idea ships with:{' '}
            <em>
              the exact complaint it came from · MRR potential · build time · competition level ·
              difficulty rating
            </em>
          </p>
        </div>

        <div className="hero-ctas rv d3">
          <a href="#pricing" className="btn btn--primary btn--lg">
            Get lifetime access — $29
          </a>
          <a href="/ideas" className="btn btn--ghost">
            Or browse the free ideas, no signup <span className="arr">→</span>
          </a>
        </div>

        <div className="hero-trust rv d3">
          <div className="avs">
            <div className="av" style={{ background: '#5080d4' }}>A</div>
            <div className="av" style={{ background: '#4aad72' }}>M</div>
            <div className="av" style={{ background: '#e06328' }}>J</div>
            <div className="av" style={{ background: '#c09e35' }}>S</div>
            <div className="av" style={{ background: '#9b68d4' }}>K</div>
          </div>
          <span className="trust-t">Used by 500+ founders, indie hackers &amp; vibe coders</span>
          <span className="trust-sep" />
          <span className="trust-mono">$29 once · no subscription · 15-day refund</span>
        </div>

        {/* ── ILLUSTRATION: complaint → idea ── */}
        <div className="hero-illus rv d4">
          <div className="illus-left">
            <div className="il-header">
              <span className="il-label">Where it starts</span>
              <span className="il-badge">Same complaint, 40+ threads</span>
            </div>

            <div className="r-card">
              <div className="r-head">
                <div className="r-ico">r/</div>
                <span className="r-sub">r/webdev</span>
                <span className="r-votes">▲ 847</span>
              </div>
              <p className="r-text">
                &ldquo;I&apos;ve been looking for months. There&apos;s no decent webhook debugger
                that isn&apos;t massive overkill for solo devs. Hookdeck is great but starts at
                $25/mo for features I just don&apos;t need. Why doesn&apos;t something simpler
                exist?&rdquo;
              </p>
            </div>

            <div className="sources">
              <div className="src">
                <span className="src-platform">r/devtools</span>
                <span className="src-snippet">
                  &ldquo;another dev asking for a lightweight webhook inspector...&rdquo;
                </span>
                <span className="src-count">+312</span>
              </div>
              <div className="src">
                <span className="src-platform">Hacker News</span>
                <span className="src-snippet">
                  &ldquo;someone should build a simpler alternative to Hookdeck&rdquo;
                </span>
                <span className="src-count">+89</span>
              </div>
              <div className="src">
                <span className="src-platform">Dev Discord</span>
                <span className="src-snippet">
                  &ldquo;still waiting for an indie-dev-priced webhook tool&rdquo;
                </span>
                <span className="src-count">+124</span>
              </div>
            </div>
          </div>

          <div className="illus-arrow">
            <div className="ia-line" />
            <div className="ia-node">→</div>
            <div className="ia-line2" />
          </div>

          <div className="illus-right">
            <span className="ir-label">Idea #389, ready to build</span>

            <div className="idea-card">
              <div className="ic-head">
                <div className="ic-meta">
                  <span className="ic-industry">Developer Tools</span>
                  <span className="ic-model">Subscription</span>
                </div>
                <h3 className="ic-title display">Webhook Delivery Debugger</h3>
                <p className="ic-tagline">
                  A lightweight inspector that captures, replays, and diffs webhook deliveries.
                </p>
              </div>
              <div className="ic-why">
                <span className="ic-why-lbl">Why it works</span>
                <p className="ic-why-txt">
                  Solo devs repeatedly cite Hookdeck as too expensive &amp; too complex. Same unmet
                  need documented across 40+ threads in r/webdev, r/devtools, HN, and developer
                  Discords.
                </p>
              </div>
              <div className="ic-data">
                <div>
                  <span className="icd-l">MRR est.</span>
                  <span className="icd-v icd-v--g">$1K–3K</span>
                </div>
                <div>
                  <span className="icd-l">Build</span>
                  <span className="icd-v">2–3 wks</span>
                </div>
                <div>
                  <span className="icd-l">Difficulty</span>
                  <span className="icd-v icd-v--g">
                    Easy{' '}
                    <span className="ic-meter">
                      <i className="on" />
                      <i className="on" />
                      <i />
                      <i />
                      <i />
                    </span>
                  </span>
                </div>
                <div>
                  <span className="icd-l">Compete</span>
                  <span className="icd-v icd-v--y">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
