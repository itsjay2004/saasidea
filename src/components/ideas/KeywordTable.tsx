import type { Keyword } from '@/types'
import { formatNumber } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface KeywordTableProps {
  keywords: Keyword[]
}

export default function KeywordTable({ keywords }: KeywordTableProps) {
  if (!keywords || keywords.length === 0) {
    return (
      <div className="text-center py-8 text-text-subtle text-sm">
        Keyword data unavailable for this idea
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-text-subtle font-medium">Keyword</th>
            <th className="text-right py-3 px-4 text-text-subtle font-medium">Monthly Searches</th>
            <th className="text-right py-3 px-4 text-text-subtle font-medium">CPC</th>
            <th className="text-right py-3 px-4 text-text-subtle font-medium">Bid Range</th>
            <th className="text-center py-3 px-4 text-text-subtle font-medium">Competition</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((kw) => (
            <tr key={kw.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
              <td className="py-3 px-4">
                <span className="text-text-primary font-medium">{kw.keyword}</span>
                {(kw as any).is_primary && (
                  <Badge variant="info" className="ml-2 text-[10px]">Primary</Badge>
                )}
              </td>
              <td className="text-right py-3 px-4 text-text-muted">
                {kw.search_volume ? formatNumber(kw.search_volume) : '—'}
              </td>
              <td className="text-right py-3 px-4 text-text-muted">
                {kw.cpc ? `$${kw.cpc.toFixed(2)}` : '—'}
              </td>
              <td className="text-right py-3 px-4 text-text-muted">
                {kw.low_top_of_page_bid && kw.high_top_of_page_bid
                  ? `$${kw.low_top_of_page_bid.toFixed(2)} – $${kw.high_top_of_page_bid.toFixed(2)}`
                  : '—'}
              </td>
              <td className="text-center py-3 px-4">
                {kw.competition ? (
                  <Badge
                    variant={
                      kw.competition === 'LOW' ? 'success' :
                      kw.competition === 'MEDIUM' ? 'warning' : 'danger'
                    }
                  >
                    {kw.competition}
                  </Badge>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
