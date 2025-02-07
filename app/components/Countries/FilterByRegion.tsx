'use client'

import { useState, useRef } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'
import { ClearIcon } from './ClearIcon'
import { dropdownSharedStyles } from './dropdownSharedStyles'

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
  const {root, trigger, item, ...rest} = dropdownSharedStyles

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
            className: `${root(isFocused)} cursor-pointer`
          },
          input: {
            className: `pl-6 flex items-center ${region.length ? 'dark:text-white-default text-black' : 'text-grey-medium dark:text-grey-soft'} size-full`
          },
          trigger: {
            className: trigger
          },
          item: (items) => ({
            className: item(items?.context.selected)
          }),
          ...rest
        }}
      />
    </div>
  )
}