import { PRICING } from '@/lib/config'
import { faqItems } from '@/lib/faq-data'
import type { Idea, IdeaWithKeywords } from '@/types'

const SITE_URL = 'https://saasidea.pro'
const SITE_NAME = 'SaaSIdea Pro'
const LOGO_URL = `${SITE_URL}/icon-logo.png`
const SAME_AS = [
  'https://x.com/saas_idea',
  'https://www.producthunt.com/@placeholder',
]

export function getHomeJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: 'hello@saasidea.pro',
      logo: LOGO_URL,
      sameAs: SAME_AS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/ideas?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${SITE_NAME} Idea Library`,
      description:
        'A curated library of validated SaaS ideas across 100+ niches with MRR potential, build time, competition data, and keyword research.',
      brand: {
        '@type': 'Brand',
        name: SITE_NAME,
      },
      category: 'Business Idea Library',
      offers: {
        '@type': 'Offer',
        price: PRICING.amount,
        priceCurrency: PRICING.currency,
        availability: 'https://schema.org/InStock',
        url: SITE_URL,
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 15,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
          url: `${SITE_URL}/refund-policy`,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ]
}

export function getIdeasPageJsonLd(ideas: Idea[], total: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SaaS Ideas Library',
    description:
      'Browse validated SaaS ideas filtered by industry, difficulty, pricing model, MRR potential, and competition level.',
    url: `${SITE_URL}/ideas`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: total,
      itemListElement: ideas.slice(0, 24).map((idea, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/ideas/${idea.id}`,
        name: idea.title,
      })),
    },
  }
}

export function getIdeaPageJsonLd(idea: IdeaWithKeywords) {
  const topKeyword = idea.primary_keyword?.keyword
  const totalSearchVolume = idea.all_keywords?.reduce((sum, keyword) => sum + (keyword.search_volume || 0), 0) || 0

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Ideas',
          item: `${SITE_URL}/ideas`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: idea.title,
          item: `${SITE_URL}/ideas/${idea.id}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: idea.title,
      description: idea.tagline,
      url: `${SITE_URL}/ideas/${idea.id}`,
      datePublished: idea.created_at,
      dateModified: idea.created_at,
      about: [
        idea.industry,
        idea.niche,
        idea.sub_niche,
        ...idea.tags,
      ].filter(Boolean),
      keywords: [
        ...idea.keywords,
        ...(topKeyword ? [topKeyword] : []),
      ].filter(Boolean).join(', '),
      audience: {
        '@type': 'Audience',
        audienceType: idea.target_audience,
      },
      isAccessibleForFree: idea.is_free,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Competition level',
          value: idea.competition_level,
        },
        {
          '@type': 'PropertyValue',
          name: 'Difficulty',
          value: idea.difficulty_label,
        },
        {
          '@type': 'PropertyValue',
          name: 'MRR potential',
          value: `${idea.mrr_potential.min}-${idea.mrr_potential.max} ${idea.mrr_potential.currency} per month`,
        },
        {
          '@type': 'PropertyValue',
          name: 'Build time',
          value: `${idea.build_time_weeks.min}-${idea.build_time_weeks.max} weeks`,
        },
        {
          '@type': 'PropertyValue',
          name: 'Suggested price',
          value: `${idea.suggested_price.amount} ${idea.suggested_price.currency} / ${idea.suggested_price.interval}`,
        },
        ...(totalSearchVolume > 0
          ? [{
            '@type': 'PropertyValue',
            name: 'Total keyword search volume',
            value: `${totalSearchVolume} monthly searches`,
          }]
          : []),
      ],
    },
  ]
}
