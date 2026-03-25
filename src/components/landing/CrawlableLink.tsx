import type { ReactNode } from 'react'

export default function CrawlableLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <>
      <a href="/#pricing" className={className}>
        {children}
      </a>
      <a
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      >
        {href}
      </a>
    </>
  )
}
