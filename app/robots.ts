import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const protocol = process.env.VERCEL_ENV === 'development' ? 'http://' : 'https://'
  const baseURL = process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_BRANCH_URL : 'localhost:3000'

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${protocol}${baseURL}/sitemap.xml`
  }
}