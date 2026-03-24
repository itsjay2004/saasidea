export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function formatMrrRange(min: number, max: number, currency: string = 'USD'): string {
  return `${formatCurrency(min, currency)} – ${formatCurrency(max, currency)}`
}

export function formatBuildTime(min: number, max: number): string {
  return `${min}–${max} wks`
}

export const INDUSTRY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Fintech': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'HR & Recruiting': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'Health & Wellness': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  'Education': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  'E-commerce': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  'B2B SaaS': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  'Legal': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  'Real Estate': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
  'Creator Economy': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
  'Agency': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  'Food & Beverage': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  'Travel': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  'Developer Tools': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Marketing': { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400', border: 'border-fuchsia-500/20' },
  'Productivity': { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/20' },
}

export const INDUSTRY_ICONS: Record<string, string> = {
  'Fintech': '💰',
  'HR & Recruiting': '👥',
  'Health & Wellness': '🏥',
  'Education': '📚',
  'E-commerce': '🛒',
  'B2B SaaS': '⚙️',
  'Legal': '⚖️',
  'Real Estate': '🏠',
  'Creator Economy': '🎨',
  'Agency': '🏢',
  'Food & Beverage': '🍽️',
  'Travel': '✈️',
  'Developer Tools': '💻',
  'Marketing': '📣',
  'Productivity': '⚡',
}

export const DIFFICULTY_STYLES: Record<string, { bg: string; text: string }> = {
  'Easy': { bg: 'bg-emerald-900/50', text: 'text-emerald-400' },
  'Medium': { bg: 'bg-amber-900/50', text: 'text-amber-400' },
  'Hard': { bg: 'bg-red-900/50', text: 'text-red-400' },
}

export const COMPETITION_COLORS: Record<string, string> = {
  'low': '#10B981',
  'medium': '#F59E0B',
  'high': '#EF4444',
}

export function getCompetitionWidth(level: string): string {
  switch (level) {
    case 'low': return '33%'
    case 'medium': return '66%'
    case 'high': return '100%'
    default: return '50%'
  }
}
