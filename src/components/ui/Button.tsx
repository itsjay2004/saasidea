import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent hover:bg-accent-hover text-white shadow-accent hover:shadow-[0_6px_32px_rgba(124,58,237,0.38)] dark:hover:shadow-[0_6px_32px_rgba(167,139,250,0.35)] active:scale-[0.97]',
  secondary:
    'bg-surface-2 hover:bg-border text-text-primary border border-border-light hover:border-border active:scale-[0.97]',
  ghost:
    'text-text-muted hover:text-text-primary hover:bg-surface-2 active:scale-[0.97]',
  outline:
    'border border-accent text-accent hover:bg-accent-subtle active:scale-[0.97]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
export default Button
