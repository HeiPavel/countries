'use client'

import { useState, useMemo } from 'react'
import { CountiesChildren } from '@/app/page'
import { Search } from './Search'

export function Countries({children}: {children: CountiesChildren[]}) {
  const [term, setTerm] = useState('')
  
  const countriesToShow = useMemo(() => {
    if (term.length === 0) return children
    return children.filter(country => country.searchTags.some(tag => tag.startsWith(term.trim())))
  }, [term])

  const options = useMemo(() => countriesToShow.slice(0, 10).map(country => country.option), [term])

  return (
    <div className='container mt-14'>
      <div className='grid gap-x-20 gap-y-14 tablet:gap-y-16 grid-cols-1 justify-items-center md:grid-cols-[repeat(auto-fill,_275px)] justify-center'>
        <div className='col-span-full w-full'>
          <Search setTerm={setTerm}>{options}</Search>
        </div>
        {countriesToShow.map((country) => country.countryCard)}
      </div>
    </div>
  )
}