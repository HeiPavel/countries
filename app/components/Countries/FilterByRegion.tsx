'use client'

import { useRef, MouseEvent } from 'react'
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
  const overlayContainerRef = useRef<HTMLDivElement>(null)
  const {root, trigger, item, ...rest} = dropdownSharedStyles

  const handleChange = (event: DropdownChangeEvent) => {
    setRegion(event.value ? event.value : '')
  }

  const handleClick = (event: MouseEvent, overlayVisible: boolean | undefined) => {
    if (overlayVisible) {
      dropdownRef.current?.hide()
      dropdownRef.current?.getFocusInput().blur()
    } else{
      dropdownRef.current?.show()
      dropdownRef.current?.getFocusInput().focus()
    }

    event.stopPropagation()
  }

  const template = (option: FilterTemplate) => <p className='px-6 py-3 hover:bg-blue-light hover:dark:text-grey-light cursor-pointer transition-colors duration-150'>{option.region}</p>

  return (
    <div className={`relative w-52 h-14 ${isPrimeStylesLoaded ? 'shadow-box' : ''} rounded-md`}>
      <Dropdown
        ref={dropdownRef}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        appendTo={overlayContainerRef.current}
        value={region}
        onChange={handleChange}
        options={options}
        itemTemplate={template}
        optionLabel='region'
        optionValue='region'
        placeholder='Filter by Region'
        showClear={region.length > 0}
        clearIcon={<ClearIcon ref={dropdownRef}/>}
        focusOnHover={false}
        pt={{
          root: (dropdown) => ({
            className: `${root(dropdown?.state.focused)} cursor-pointer`
          }),
          input: (dropdown) => ({
            className: `pl-6 flex items-center ${region.length ? 'dark:text-white-default text-black' : 'text-grey-medium dark:text-grey-soft'} size-full`,
            onClick: (event) => handleClick(event, dropdown?.state.overlayVisible)
          }),
          trigger: (dropdown) =>  ({
            className: trigger,
            onClick: (event) => handleClick(event, dropdown?.state.overlayVisible)
          }),
          item: (items) => ({
            className: item(items?.context.selected),
            onClick: () => dropdownRef.current?.getFocusInput().blur()
          }),
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