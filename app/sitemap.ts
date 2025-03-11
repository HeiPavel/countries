import { MetadataRoute } from 'next'

type Code = {
  cca3: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const protocol = process.env.VERCEL_ENV === 'development' ? 'http://' : 'https://'
  const baseURL = process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_BRANCH_URL : 'localhost:3000'

  const codes: Code[] = await fetch('https://restcountries.com/v3.1/all?fields=cca3').then(res => res.json())

  const countryPages: MetadataRoute.Sitemap = codes.map(code => ({url: `${protocol}${baseURL}/country/${code.cca3.toUpperCase()}`}))

  return [
    {
      url: `${protocol}${baseURL}`
    },
    ...countryPages
  ]
}