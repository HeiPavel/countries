'use client'

import { useState, useMemo } from 'react'
import { CountiesChildren } from '@/app/page'
import { Search } from './Search'
import { FilterByRegion } from './FilterByRegion'

export function Countries({children}: {children: CountiesChildren[]}) {
  const [term, setTerm] = useState('')
  const [region, setRegion] = useState('')

  const filteredByRegion = useMemo(() => {
    if (region.length === 0) return children
    return children.filter(country => country.region.toLowerCase() === region.toLowerCase())
  }, [region])
  
  const countriesToShow = useMemo(() => {
    if (term.length === 0) return filteredByRegion
    return filteredByRegion.filter(country => country.searchTags.some(tag => tag.startsWith(term.trim())))
  }, [term, region])

  const options = useMemo(() => {
    if (term.length === 0) return []
    return countriesToShow.slice(0, 10).map(country => {
      return {
        name: country.name,
        option: country.option
      }
    })
  }, [term, region])

  const fallback = () => {
    if (children.length === 0) return (
      <p className='pt-10 md:pt-20 col-span-full w-full text-center text-balance text-3xl md:text-5xl dark:text-white-default text-black'>
        Sorry, the service is currently unavailable. Please try again later.
      </p>
    )

    return (
      <>{countriesToShow.map((country) => country.countryCard)}</>
    )
  }

  return (
    <div className='container mt-14'>
      <div className='grid gap-x-20 laptop:gap-x-14 desktop:gap-x-16 gap-y-14 laptop:gap-y-16 grid-cols-1 justify-items-center md:grid-cols-[repeat(auto-fill,_275px)] justify-center'>
        <div className='col-span-full w-full flex flex-col gap-14 laptop:flex-row laptop:justify-between'>
          <Search
            term={term}
            setTerm={setTerm}
          >
            {options}
          </Search>
          <FilterByRegion setRegion={setRegion}/>
        </div>
        {fallback()}
      </div>
    </div>
  )
}