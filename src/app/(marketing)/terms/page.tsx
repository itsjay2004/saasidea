import type { Metadata } from 'next'
import PolicyPage from '@/components/legal/PolicyPage'

export const metadata: Metadata = {
  title: 'Terms of Service - SaaSIdea Pro',
  description: 'Read the terms that govern your use of SaaSIdea Pro.',
}

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using SaaSIdea Pro, you agree to these Terms of Service and any policies referenced here.',
      'If you do not agree, do not use the site or purchase access.',
    ],
  },
  {
    title: 'Access and Accounts',
    body: [
      'You are responsible for providing accurate account information and for maintaining the confidentiality of your login credentials.',
      'We may suspend or terminate access if we believe an account is being misused or used in violation of these terms.',
    ],
  },
  {
    title: 'Purchases and Refunds',
    body: [
      'Access to paid content is granted according to the purchase terms shown at checkout.',
      'If a refund policy is offered on the site or checkout page, that policy applies in addition to these terms.',
    ],
  },
  {
    title: 'Acceptable Use',
    body: [
      'You may use the site and content for lawful business purposes only.',
    ],
    bullets: [
      'Do not scrape, resell, or redistribute the idea library without permission.',
      'Do not attempt to interfere with site security or bypass access controls.',
      'Do not use the service in a way that violates applicable laws or third-party rights.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All site design, branding, product text, and original content remain the property of SaaSIdea Pro or its licensors.',
      'Purchasing access does not transfer ownership of the platform or its intellectual property.',
    ],
  },
  {
    title: 'Disclaimer and Liability',
    body: [
      'The content on SaaSIdea Pro is provided for informational purposes only and is not a guarantee of business success.',
      'To the fullest extent permitted by law, we are not liable for indirect or consequential losses arising from your use of the service.',
    ],
  },
]

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Service"
      intro="These terms govern your use of SaaSIdea Pro, including access to the idea library and related services."
      updatedAt="March 26, 2026"
      sections={sections}
    />
  )
}
