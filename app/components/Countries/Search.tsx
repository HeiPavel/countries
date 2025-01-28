'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'

type Template = {
  name: string
  flag: string
  alt: string
}

type Props = {
  setTerm: (term: string) => void
  options: Template[]
}

export function Search({setTerm, options}: Props) {
  const isPrimeStylesLoaded = usePrimeStylesReady()
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const dropdownRef = useRef<Dropdown>(null)

  const handleChange = (event: DropdownChangeEvent) => {
    setValue(event.value ? event.value : '')
  }

  const countryOptionTemplate = (option: Template) => {
    return (
      <div className='py-3 pl-2 flex items-center gap-1.5 hover:bg-blue-light hover:dark:text-grey-light cursor-pointer'>
        <div className='relative w-[18px] h-3 shrink-0'>
          <Image
            src={option.flag}
            alt={option.alt}
            fill
            sizes='10vw'
            className='object-cover'
          />
        </div>
        <p className='whitespace-nowrap'>{option.name}</p>
      </div>
    )
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTerm(value.toLowerCase())
    }, 200)

    return () => clearTimeout(timeoutID)
  }, [value])

  return (
    <div className='relative max-w-[490px] h-14'>
      <Dropdown
        ref={dropdownRef}
        appendTo='self'
        value={value}
        onChange={handleChange}
        onFocus={() => dropdownRef.current ? dropdownRef.current.show() : null}
        onShow={() => setIsFocused(true)}
        onHide={() => setIsFocused(false)}
        options={options}
        itemTemplate={countryOptionTemplate}
        optionLabel='name'
        optionValue='name'
        placeholder='Search for a country...'
        editable={true}
        showClear={true}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        pt={{
          root: {
            className: 'relative flex items-center size-full before:content-["⚲"] before:dark:text-white-light before:text-grey-medium before:absolute before:left-10 before:text-3xl before:-rotate-45'
          },
          input: {
            className: 'pl-20 pr-10 placeholder:dark:text-white-dark placeholder:text-grey-medium size-full outline-none dark:bg-grey-light bg-white-light rounded-md border border-transparent hover:border-blue-default transition-all duration-200 focus:shadow-input'
          },
          trigger: {
            className: `${isFocused ? 'opacity-100' : 'opacity-0'} absolute right-0 px-3 transition-all duration-300`
          },
          panel: {
            className: `mt-1 h-52 w-full overflow-x-hidden dark:bg-grey-light bg-white-light rounded-md scrollbar-hide !left-0 !top-14`
          },
          item: (items) => ({
            className: items?.context.selected ? 'bg-blue-light dark:text-grey-light' : ''
          }),
          list: {
            className: 'py-2'
          },
          clearIcon: {
            className: `${isFocused ? 'opacity-100' : 'opacity-0'} absolute right-10 transition-all duration-300 cursor-pointer`
          }
        }}
      />
    </div>
  )
}