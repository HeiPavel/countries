'use client'

import { useState, useRef } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'
import { ClearIcon } from './ClearIcon'

type Props = {
  region: string
  setRegion: (region: string) => void
}

type FilterTemplate = {
  region: string
}

const options = [
  {region: 'Antarctic'},
  {region: 'Americas'},
  {region: 'Europe'},
  {region: 'Africa'},
  {region: 'Asia'},
  {region: 'Oceania'}
]

export function FilterByRegion({region, setRegion}: Props) {
  const isPrimeStylesLoaded = usePrimeStylesReady()
  const dropdownRef = useRef<Dropdown>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (event: DropdownChangeEvent) => {
    setRegion(event.value ? event.value : '')
  }

  const handleHide = () => {
    if (dropdownRef.current) {
      const input = dropdownRef.current.getFocusInput()
      input.blur()
    }

    setIsFocused(false)
  }

  const template = (option: FilterTemplate) => <p className='px-6 py-3 hover:bg-blue-light hover:dark:text-grey-light cursor-pointer'>{option.region}</p>

  return (
    <div className={`relative w-52 h-14 ${isPrimeStylesLoaded ? 'shadow-box' : ''} rounded-md`}>
      <Dropdown
        ref={dropdownRef}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        appendTo='self'
        value={region}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onHide={handleHide}
        options={options}
        itemTemplate={template}
        optionLabel='region'
        optionValue='region'
        placeholder='Filter by Region'
        showClear={region.length > 0}
        clearIcon={<ClearIcon ref={dropdownRef}/>}
        focusOnHover={false}
        pt={{
          root: {
            className: `${isFocused ? 'shadow-input' : ''} relative flex items-center size-full dark:bg-grey-light bg-white-light rounded-md border border-transparent hover:border-blue-default transition-all duration-200 cursor-pointer`
          },
          input: {
            className: `pl-6 flex items-center ${region.length ? 'dark:text-white-default text-black' : 'text-grey-medium dark:text-grey-soft'} size-full`
          },
          panel: {
            className: `mt-1 h-52 w-full overflow-x-hidden dark:bg-grey-light bg-white-light rounded-md !left-[-1px] !top-14`
          },
          trigger: {
            className: 'absolute right-0 pl-1 pr-3'
          },
          item: (items) => ({
            className: `${items?.context.selected ? 'bg-blue-light dark:text-grey-light' : ''} outline-none`
          }),
          list: {
            className: 'py-2'
          },
          transition: {
            timeout: 150,
            classNames: {
              enter: 'opacity-0 scale-75',
              enterActive: 'opacity-100 !scale-100 transition-[transform,opacity] duration-150',
              exit: 'opacity-100',
              exitActive: '!opacity-0 transition-opacity duration-150'
            }
          }
        }}
      />
    </div>
  )
}