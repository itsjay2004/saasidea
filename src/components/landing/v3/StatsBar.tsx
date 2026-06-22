interface StatsBarProps {
  totalIdeas?: number
  industryCount?: number
}

export default function StatsBar({ totalIdeas, industryCount }: StatsBarProps) {
  const ideas = totalIdeas && totalIdeas > 0 ? totalIdeas.toLocaleString() : '1,200'
  const industries = industryCount && industryCount > 0 ? String(industryCount) : '9'

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        <div className="stat-item rv">
          <div className="stat-value">
            {ideas}
            <em>+</em>
          </div>
          <div className="stat-label">Demand-backed ideas</div>
        </div>
        <div className="stat-item rv d1">
          <div className="stat-value">{industries}</div>
          <div className="stat-label">Live industries</div>
        </div>
        <div className="stat-item rv d2">
          <div className="stat-value">
            100<em>+</em>
          </div>
          <div className="stat-label">Niche categories</div>
        </div>
        <div className="stat-item rv d3">
          <div className="stat-value">
            <em>$</em>29
          </div>
          <div className="stat-label">Once. No subscription.</div>
        </div>
      </div>
    </div>
  )
}
