'use client'

import { useState, useEffect, useRef, KeyboardEventHandler, MouseEventHandler } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePrimeStylesReady } from '../hooks/usePrimeStylesReady'
import { ClearIcon } from './ClearIcon'
import { dropdownSharedStyles } from './dropdownSharedStyles'

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
  const [value, setValue] = useState('')
  const dropdownRef = useRef<Dropdown>(null)
  const overlayContainerRef = useRef<HTMLDivElement>(null)
  const {root, trigger, item, ...rest} = dropdownSharedStyles

  const handleChange = (event: DropdownChangeEvent) => {
    setValue(event.value ? event.value : '')
    if (dropdownRef.current && !event.value) dropdownRef.current.hide()
  }

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (value.length === 0 && event.key === 'Backspace') dropdownRef.current?.hide()
  }

  const handleTriggerClick: MouseEventHandler = (event) => {
    if (dropdownRef.current) dropdownRef.current.hide()
    event.stopPropagation()
  }

  const template = (option: SearchChildren) => <>{option.option}</>

  const emptyMessage = [{
    disabled: true,
    option: <p className={`${!children.length && term.length ? 'block' : 'hidden'} py-3 pl-6 dark:text-grey-soft text-grey-medium`}>No country was found</p>
  }]

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTerm(value.toLowerCase())
    }, 300)

    return () => clearTimeout(timeoutID)
  }, [value])

  return (
    <div className={`relative max-w-[490px] h-14 grow ${isPrimeStylesLoaded ? 'shadow-box' : ''} rounded-md`}>
      <Dropdown
        ref={dropdownRef}
        appendTo={overlayContainerRef.current}
        value={value}
        onChange={handleChange}
        onFocus={() => value.length ? dropdownRef.current?.show() : null}
        onKeyDown={handleKeyDown}
        options={children.length ? children : emptyMessage}
        itemTemplate={template}
        optionLabel='name'
        optionValue='name'
        optionDisabled='disabled'
        placeholder='Search for a country...'
        editable={true}
        showClear={value.length > 0}
        className={`${isPrimeStylesLoaded ? '' : 'hidden'}`}
        focusOnHover={false}
        clearIcon={<ClearIcon ref={dropdownRef}/>}
        pt={{
          root: (dropdown) => ({
            className: `${root(dropdown?.state.focused)} before:content-["⚲"] before:dark:text-white-light before:text-grey-medium before:absolute before:left-5 before:laptop:left-10 before:text-3xl before:-rotate-45`
          }),
          input: {
            className: 'pl-12 laptop:pl-20 pr-14 text-ellipsis placeholder:dark:text-grey-soft placeholder:text-grey-medium size-full outline-none bg-transparent'
          },
          trigger: (dropdown) => ({
            className: `${dropdown?.state.overlayVisible ? 'block opacity-100' : 'hidden opacity-0'} ${trigger} starting:opacity-0 transition-all duration-300 transition-discrete`,
            onClick: handleTriggerClick
          }),
          item: (items) => ({
            className: `${item(items?.context.selected)} ${items?.context.disabled ? 'pointer-events-none' : ''}`,
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