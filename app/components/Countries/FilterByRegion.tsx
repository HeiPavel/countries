'use client'

import { useState, useEffect, useRef, MouseEvent } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'
import { ClearIcon } from './ClearIcon'
import { dropdownSharedStyles } from './dropdownSharedStyles'

type Props = {
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

export function FilterByRegion({setRegion}: Props) {
  const isPrimeStylesLoaded = usePrimeStylesReady()
  const [value, setValue] = useState('')
  const dropdownRef = useRef<Dropdown>(null)
  const overlayContainerRef = useRef<HTMLDivElement>(null)
  const {root, trigger, item, ...rest} = dropdownSharedStyles

  const handleChange = (event: DropdownChangeEvent) => {
    setValue(event.value ? event.value : '')
  }

  const handleClick = (event: MouseEvent, overlayVisible: boolean | undefined) => {
    document.body.click()
    
    if (overlayVisible) {
      dropdownRef.current?.hide()
      dropdownRef.current?.getFocusInput().blur()
    } else{
      dropdownRef.current?.show()
      dropdownRef.current?.getFocusInput().focus()
    }

    event.stopPropagation()
  }

  const template = (option: FilterTemplate) => <p className='px-6 py-3 cursor-pointer'>{option.region}</p>

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setRegion(value)
    }, 200)

    return () => clearTimeout(timeoutID)
  }, [value])

  return (
    <div className={`relative w-52 h-14 ${isPrimeStylesLoaded ? 'shadow-box' : ''} rounded-md`}>
      <Dropdown
        ref={dropdownRef}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        appendTo={overlayContainerRef.current}
        value={value}
        onChange={handleChange}
        options={options}
        itemTemplate={template}
        optionLabel='region'
        optionValue='region'
        placeholder='Filter by Region'
        showClear={value.length > 0}
        clearIcon={<ClearIcon ref={dropdownRef}/>}
        focusOnHover={false}
        id='filter-by-region-dropdown'
        pt={{
          root: (dropdown) => ({
            className: `${root(dropdown?.state.focused)} cursor-pointer`
          }),
          input: (dropdown) => ({
            className: `pl-6 flex items-center ${value.length ? 'dark:text-white-default text-black' : 'text-grey-medium dark:text-grey-soft'} size-full outline-none`,
            onClick: (event) => handleClick(event, dropdown?.state.overlayVisible),
            "aria-labelledby": 'filter-by-region-dropdown'
          }),
          trigger: (dropdown) =>  ({
            className: trigger,
            onClick: (event) => handleClick(event, dropdown?.state.overlayVisible)
          }),
          item: (items) => ({
            className: item(items?.context.selected),
            onClick: () => dropdownRef.current?.getFocusInput().blur()
          }),
          select: {
            "aria-labelledby": 'filter-by-region-dropdown'
          },
          ...rest
        }}
      />
      <div 
        className='relative mt-1'
        ref={overlayContainerRef}
      >
      </div>
    </div>
  )
}