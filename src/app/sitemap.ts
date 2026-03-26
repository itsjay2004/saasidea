import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://saasidea.pro'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/ideas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  let ideaPages: MetadataRoute.Sitemap = []
  try {
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )
    const { data } = await supabase.from('ideas').select('id, created_at')
    if (data) {
      ideaPages = data.map((idea: any) => ({
        url: `${baseUrl}/ideas/${idea.id}`,
        lastModified: new Date(idea.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch {}

  return [...staticPages, ...ideaPages]
}
