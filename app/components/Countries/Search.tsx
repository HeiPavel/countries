'use client'

import { useState, useEffect, useRef } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'

type Props = {
  setTerm: (term: string) => void
  children: React.ReactNode[]
}

export function Search({setTerm, children}: Props) {
  const isPrimeStylesLoaded = usePrimeStylesReady()
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const dropdownRef = useRef<Dropdown>(null)

  const handleChange = (event: DropdownChangeEvent) => {
    setValue(event.value ? event.value : '')
  }

  const handleHide = () => {
    if (dropdownRef.current) {
      const input = dropdownRef.current.getFocusInput()
      input.blur()
    }

    setIsFocused(false)
  }

  const template = (option: React.ReactNode) => <>{option}</>

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
        onHide={handleHide}
        options={children}
        itemTemplate={template}
        optionLabel='name'
        optionValue='name'
        placeholder='Search for a country...'
        editable={true}
        showClear={value.length > 0}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        focusOnHover={false}
        pt={{
          root: {
            className: 'relative flex items-center size-full before:content-["⚲"] before:dark:text-white-light before:text-grey-medium before:absolute before:left-5 before:laptop:left-10 before:text-3xl before:-rotate-45'
          },
          input: {
            className: 'pl-12 laptop:pl-20 pr-14 text-ellipsis placeholder:dark:text-white-dark placeholder:text-grey-medium size-full outline-none dark:bg-grey-light bg-white-light rounded-md border border-transparent hover:border-blue-default transition-all duration-200 focus:shadow-input'
          },
          trigger: {
            className: `${isFocused ? 'opacity-100' : 'opacity-0'} absolute right-0 pl-1 pr-3 transition-all duration-300`
          },
          panel: {
            className: `mt-1 h-52 w-full overflow-x-hidden dark:bg-grey-light bg-white-light rounded-md !left-0 !top-14`
          },
          item: (items) => ({
            className: `${items?.context.selected ? 'bg-blue-light dark:text-grey-light' : ''} outline-none`
          }),
          list: {
            className: 'py-2'
          },
          clearIcon: {
            className: 'absolute outline-none right-9 cursor-pointer'
          }
        }}
      />
    </div>
  )
}