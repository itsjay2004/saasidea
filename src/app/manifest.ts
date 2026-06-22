import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SaaSIdea Pro — Validated SaaS Ideas',
    short_name: 'SaaSIdea Pro',
    description:
      'Browse 1,200+ pain-driven SaaS ideas across 100+ niches with MRR potential, build time, competition data, and keyword research.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icon-logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
