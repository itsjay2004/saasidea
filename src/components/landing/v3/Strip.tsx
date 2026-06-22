type Complaint = { src: string; platform: string; eng: string; quote: string }

const ROW_A: Complaint[] = [
  { src: '#ff4500', platform: 'r/webdev', eng: '▲ 847', quote: "There's no decent webhook debugger that isn't total overkill for solo devs. Why doesn't a simple one exist?" },
  { src: '#ff6600', platform: 'Hacker News', eng: '▲ 289', quote: 'We burn ~$2k/mo on cloud and half of it is idle resources nobody cleans up. Someone should just build a detector.' },
  { src: '#ff4500', platform: 'r/SaaS', eng: '▲ 376', quote: 'Whole team shares one OpenAI key and I have zero idea which project is burning the budget. It’s maddening.' },
  { src: '#4aad72', platform: 'Indie Hackers', eng: '64 replies', quote: 'Is there a lightweight tool that runs a real A/B test on cold email sequences? Apollo’s reporting is useless.' },
  { src: '#ff4500', platform: 'r/Entrepreneur', eng: '▲ 431', quote: 'QuickBooks dashboards need an accounting degree to read. I just want my KPIs in plain English.' },
  { src: '#ff4500', platform: 'r/freelance', eng: '▲ 722', quote: 'QuickBooks is built for accountants, not solo freelancers. I just want to track invoices without the bloat.' },
  { src: '#ff4500', platform: 'r/devops', eng: '▲ 512', quote: 'I just want an alert when my API error rate spikes. Every uptime tool wants $99/mo for stuff I’ll never use.' },
  { src: '#5865F2', platform: 'Dev Discord', eng: '128 msgs', quote: "Still waiting for an indie-priced webhook inspector. Hookdeck's great but way too much for what I need." },
]

const ROW_B: Complaint[] = [
  { src: '#ff4500', platform: 'r/Therapists', eng: '▲ 398', quote: "I spend 2+ hours a day writing SOAP notes by hand. There's no affordable tool made for solo practitioners." },
  { src: '#ff4500', platform: 'r/ecommerce', eng: '▲ 284', quote: "I can't see WHY products get returned at the pattern level. The tools that do this are enterprise-only." },
  { src: '#1d9bf0', platform: 'X / Twitter', eng: '1.2K likes', quote: 'why is there no simple tool to audit who changed what in my SaaS app? every option is bloated enterprise stuff' },
  { src: '#ff4500', platform: 'r/marketing', eng: '▲ 341', quote: 'Building a report across Google, Meta and email by hand every week is killing me. Everything else is $300/mo.' },
  { src: '#ff4500', platform: 'r/SaaS', eng: '▲ 267', quote: 'I need to know which trial users are actually likely to convert. Building lead scoring from scratch is a slog.' },
  { src: '#ff4500', platform: 'r/emailmarketing', eng: '▲ 203', quote: 'My cold emails keep landing in spam with no early warning. Deliverability monitors all cost a fortune.' },
  { src: '#ff4500', platform: 'r/devops', eng: '▲ 455', quote: 'One cloud misconfig from a breach and there’s no cheap tool that just flags the obvious ones for small teams.' },
  { src: '#4aad72', platform: 'Indie Hackers', eng: '47 replies', quote: 'I want a clean MRR dashboard for my Stripe data without paying for a whole analytics suite.' },
]

function Card({ c }: { c: Complaint }) {
  return (
    <div className="sc" style={{ '--src': c.src } as React.CSSProperties}>
      <div className="sc-src">
        <span className="sc-platform">{c.platform}</span>
        <span className="sc-eng">{c.eng}</span>
      </div>
      <p className="sc-quote">&ldquo;{c.quote}&rdquo;</p>
    </div>
  )
}

export default function Strip() {
  return (
    <div className="strip">
      <p className="strip-lbl">
        Real complaints, pulled from the wild — every one is a future idea →
      </p>
      <div className="strip-wrap">
        <div className="srow srow--a">
          {[...ROW_A, ...ROW_A].map((c, i) => (
            <Card key={`a${i}`} c={c} />
          ))}
        </div>
        <div className="srow srow--b">
          {[...ROW_B, ...ROW_B].map((c, i) => (
            <Card key={`b${i}`} c={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
