'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { createClient } from '@/lib/supabase/client'

function PostHogPageView() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const ph = usePostHog()

    // Manual pageview capture — Next App Router does soft client-side nav, so the
    // default page-load listener misses route changes. Fire on every path change.
    useEffect(() => {
        if (!ph) return
        let url = window.origin + pathname
        if (searchParams.toString()) url += `?${searchParams.toString()}`
        ph.capture('$pageview', { $current_url: url })
    }, [pathname, searchParams, ph])

    return null
}


console.log("POSTHOG DEBUG", {
    keyExists: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

function PostHogIdentify() {
    const ph = usePostHog()

    // Stitch anonymous client activity to the Supabase user id. The Dodo webhook
    // fires purchase_completed server-side against this same id, so the funnel
    // (pageview → checkout → purchase) joins across client and server.
    useEffect(() => {
        if (!ph) return
        const supabase = createClient()

        supabase.auth.getUser().then(({ data }) => {
            const user = data.user
            if (user) ph.identify(user.id, { email: user.email })
        })

        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            const user = session?.user
            if (user) ph.identify(user.id, { email: user.email })
            else ph.reset()
        })

        return () => sub.subscription.unsubscribe()
    }, [ph])

    return null
}

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
        if (!key) return
        posthog.init(key, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
            capture_pageview: false, // handled manually in PostHogPageView
            capture_pageleave: true,
            person_profiles: 'identified_only',
        })
    }, [])

    return (
        <PHProvider client={posthog}>
            <PostHogPageView />
            <PostHogIdentify />
            {children}
        </PHProvider>
    )
}
