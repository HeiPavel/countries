'use client'

import { useState, useMemo } from 'react'
import { CountryPreview } from '@/app/page'
import { CountryCard } from './CountryCard'
import { Search } from './Search'

export function Countries({countries}: {countries: CountryPreview[]}) {
  const [term, setTerm] = useState('')
  
  const countriesToShow = useMemo(() => {
    if (term.length === 0) return countries
    return countries.filter(country => country.searchTags.some(tag => tag.includes(term.trim())))
  }, [term])

  const options = useMemo(() => {
    return countriesToShow.map(country => {
      return {
        name: country.name,
        flag: country.flags.svg,
        alt: country.flags.alt
      }
    })
  }, [term])
  

  return (
    <div className='container mt-14'>
      <div className='grid gap-20 grid-cols-[repeat(auto-fill,_275px)] justify-center'>
        <div className='col-span-full'>
          <Search
            setTerm={setTerm}
            options={options}
          />
        </div>
        {
          countriesToShow.map((country, index) => (
            <CountryCard 
              cardData={country}
              key={index}
            />
          ))
        }
      </div>
    </div>
  )
}