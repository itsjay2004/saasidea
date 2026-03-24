interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

const variantStyles = {
  default: 'bg-surface-2 text-text-muted border-border',
  success: 'bg-emerald-900/50 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-900/50 text-amber-400 border-amber-500/20',
  danger: 'bg-red-900/50 text-red-400 border-red-500/20',
  info: 'bg-blue-900/50 text-blue-400 border-blue-500/20',
}

export default function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
