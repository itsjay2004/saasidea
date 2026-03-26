import type { Metadata } from 'next'
import PolicyPage from '@/components/legal/PolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - SaaSIdea Pro',
  description: 'Learn how SaaSIdea Pro collects, uses, and protects your information.',
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We collect information you provide directly, such as your name, email address, and payment details when you create an account or purchase access.',
      'We may also collect limited usage data, such as pages viewed and interactions with the product, to help us improve the experience.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use your information to create and manage accounts, process purchases, deliver access to paid content, respond to support requests, and improve the product.',
      'We may also use aggregated analytics to understand how people use the site and identify issues.',
    ],
  },
  {
    title: 'Payments and Account Access',
    body: [
      'Payments are processed through third-party providers. We do not store full payment card details on our servers.',
      'Your account access may be tied to the email address used at checkout or sign-in.',
    ],
  },
  {
    title: 'Cookies and Analytics',
    body: [
      'We may use cookies or similar technologies to keep you signed in, remember preferences, and measure site usage.',
      'You can usually control cookies through your browser settings, though some features may not work properly without them.',
    ],
  },
  {
    title: 'Data Sharing',
    body: [
      'We do not sell your personal information.',
      'We may share limited data with service providers that help us operate the website, process payments, provide analytics, or deliver support.',
    ],
  },
  {
    title: 'Your Choices',
    body: [
      'You can request access, correction, or deletion of your personal information by contacting us.',
      'You may also unsubscribe from non-essential emails using the link in those messages.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="This policy explains what information we collect, how we use it, and the choices you have when using SaaSIdea Pro."
      updatedAt="March 26, 2026"
      sections={sections}
    />
  )
}
