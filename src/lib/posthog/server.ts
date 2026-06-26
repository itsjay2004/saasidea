import { PostHog } from 'posthog-node'

// Server-side PostHog singleton. Used for trusted, money-critical events
// (e.g. purchase_completed fired from the Dodo webhook) that must not be lost
// to a closed tab or ad-blocker the way client-side capture can be.
let client: PostHog | null = null

export function getPostHogServer(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return null

  if (!client) {
    client = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      // Webhooks are short-lived serverless invocations: flush every event
      // immediately rather than batching, since the process may be frozen.
      flushAt: 1,
      flushInterval: 0,
    })
  }

  return client
}
