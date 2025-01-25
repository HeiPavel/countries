'use client'

import { CountryPreview } from '@/app/page'
import { CountryCard } from './CountryCard'

export type CountryCardType = Omit<CountryPreview, 'searchTags'>

export function Countries({countries}: {countries: CountryPreview[]}) {

  return (
    <div className='container'>
      <div className='mt-10 grid gap-20 grid-cols-[repeat(auto-fill,_275px)] justify-center'>
        {
          countries.map((country, index) => {
            const {name, population, capital, cca3, region, flags} = country
            const cardData = {
              name,
              population,
              capital,
              cca3,
              region,
              flags
            }

            return <CountryCard 
              cardData={cardData}
              key={index}
            />
          })
        }
      </div>
    </div>
  )
}