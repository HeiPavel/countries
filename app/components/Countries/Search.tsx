'use client'

import { useState, useEffect, useRef, KeyboardEventHandler, MouseEventHandler } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'
import { IoCloseOutline } from 'react-icons/io5'

type SearchChildren = {
  name: string
  option: React.ReactNode
}

type Props = {
  term: string
  setTerm: (term: string) => void
  children: SearchChildren[]
}

export function Search({term, setTerm, children}: Props) {
  const isPrimeStylesLoaded = usePrimeStylesReady()
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const dropdownRef = useRef<Dropdown>(null)

  const handleChange = (event: DropdownChangeEvent) => {
    setValue(event.value ? event.value : '')
  }

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (value.length === 0 && event.key === 'Backspace') dropdownRef.current?.hide()
  }

  const handleHide = () => {
    if (dropdownRef.current) {
      const input = dropdownRef.current.getFocusInput()
      input.blur()
    }

    setIsOpen(false)
  }

  const handleClear: MouseEventHandler = (event) => {
    if (!dropdownRef.current) return
    event.stopPropagation()
    dropdownRef.current.clear()
  }

  const template = (option: SearchChildren) => <>{option.option}</>

  const emptyMessage = () => {
    return (
      <p className={`${!children.length && term.length ? 'block' : 'hidden'} py-3 pl-6 dark:text-grey-soft text-grey-medium`}>No country was found</p>
    )
  }

  const clearIcon = () => {
    return (
      <IoCloseOutline
        className='absolute size-5 outline-none right-9 cursor-pointer'
        onClick={handleClear}
      />
    )
  }

  useEffect(() => {
    if (dropdownRef.current) {
      value.length && isFocused ? dropdownRef.current.show() : dropdownRef.current.hide()
    }

    const timeoutID = setTimeout(() => {
      setTerm(value.toLowerCase())
    }, 300)

    return () => clearTimeout(timeoutID)
  }, [value, isFocused])

  return (
    <div className='relative max-w-[490px] h-14'>
      <Dropdown
        ref={dropdownRef}
        appendTo='self'
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onShow={() => setIsOpen(true)}
        onHide={handleHide}
        onKeyDown={handleKeyDown}
        options={children}
        itemTemplate={template}
        optionLabel='name'
        optionValue='name'
        placeholder='Search for a country...'
        emptyMessage={emptyMessage}
        editable={true}
        showClear={value.length > 0}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        focusOnHover={false}
        clearIcon={clearIcon}
        pt={{
          root: {
            className: 'relative flex items-center size-full before:content-["⚲"] before:dark:text-white-light before:text-grey-medium before:absolute before:left-5 before:laptop:left-10 before:text-3xl before:-rotate-45'
          },
          input: {
            className: 'pl-12 laptop:pl-20 pr-14 text-ellipsis placeholder:dark:text-grey-soft placeholder:text-grey-medium size-full outline-none dark:bg-grey-light bg-white-light rounded-md border border-transparent hover:border-blue-default transition-all duration-200 focus:shadow-input'
          },
          trigger: {
            className: `${isOpen ? 'block opacity-100' : 'hidden opacity-0'} trigger absolute right-0 pl-1 pr-3 starting:opacity-0 transition-all duration-300 transition-discrete`
          },
          panel: {
            className: `mt-1 h-52 w-full overflow-x-hidden dark:bg-grey-light bg-white-light rounded-md !left-0 !top-14`
          },
          item: (items) => ({
            className: `${items?.context.selected ? 'bg-blue-light dark:text-grey-light' : ''} outline-none`
          }),
          list: {
            className: 'py-2'
          }
        }}
      />
    </div>
  )
}