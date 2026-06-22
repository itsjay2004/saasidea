import Nav from '@/components/landing/v3/Nav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="v3">
            <Nav />
            <main className="min-h-screen">{children}</main>
        </div>
    )
}
