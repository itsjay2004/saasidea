import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="font-heading text-6xl font-bold text-text-primary mb-4">404</h1>
        <p className="text-text-muted text-lg mb-8">Page not found</p>
        <Link href="/">
          <Button className="gap-2">
            <Home className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
