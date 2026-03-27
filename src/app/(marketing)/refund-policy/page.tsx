import type { Metadata } from 'next'
import PolicyPage from '@/components/legal/PolicyPage'

export const metadata: Metadata = {
  title: 'Refund Policy - SaaSIdea Pro',
  description: 'Read the refund policy for SaaSIdea Pro purchases.',
}

const sections = [
  {
    title: '15-Day Refund Window',
    body: [
      'You can request a refund within 15 days of your purchase.',
      'If SaaSIdea Pro is not right for you, we will issue a refund with no questions asked.',
    ],
  },
  {
    title: 'How To Request A Refund',
    body: [
      'Email us at hello@saasidea.pro within 15 days of your purchase and let us know you would like a refund.',
      'We will review the request and process your refund as quickly as possible.',
    ],
  },
  {
    title: 'Policy Scope',
    body: [
      'This refund policy applies to purchases made directly through SaaSIdea Pro.',
      'If you have any questions before purchasing, you can also contact us at hello@saasidea.pro.',
    ],
  },
]

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      intro="We want you to feel confident trying SaaSIdea Pro. If it does not feel like a fit, you can request a refund within 15 days of purchase."
      updatedAt="March 27, 2026"
      sections={sections}
    />
  )
}
