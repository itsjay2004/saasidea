'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface TrendChartProps {
  data: { year: number; month: number; search_volume: number }[]
  trend?: 'growing' | 'stable' | 'declining' | null
}

const TREND_COLORS = {
  growing: '#10B981',
  stable: '#3B82F6',
  declining: '#EF4444',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function TrendChart({ data, trend }: TrendChartProps) {
  if (!data || data.length === 0) return null

  const last12 = data.slice(-12).map((d) => ({
    label: `${MONTHS[d.month - 1]} ${String(d.year).slice(-2)}`,
    volume: d.search_volume,
  }))

  const color = TREND_COLORS[trend || 'stable']

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={last12} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F9FAFB',
            }}
            formatter={(value) => [Number(value).toLocaleString(), 'Searches']}
          />
          <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
            {last12.map((_, index) => (
              <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
