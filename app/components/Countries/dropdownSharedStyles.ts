import { HTMLAttributes } from 'react'
import { DropdownPassThroughType, DropdownPassThroughTransitionType } from 'primereact/dropdown'

type SharedStylesType = {
  root: (isFocused: boolean) => string
  trigger: string
  panel: DropdownPassThroughType<HTMLAttributes<HTMLDivElement>>
  item: (selected: boolean | undefined) => string
  list: DropdownPassThroughType<HTMLAttributes<HTMLUListElement>>
  transition: DropdownPassThroughTransitionType
}

export const dropdownSharedStyles: SharedStylesType = {
  root: (isFocused) => `relative flex items-center size-full dark:bg-grey-light bg-white-light rounded-md border border-transparent hover:border-blue-default transition-all duration-200 ${isFocused ? 'shadow-input' : ''}`,
  trigger: 'absolute right-0 pl-1 pr-3',
  panel: {
    className: `mt-1 h-52 w-full overflow-x-hidden dark:bg-grey-light bg-white-light rounded-md !left-[-1px] !top-14`
  },
  item: (selected) => `${selected ? 'bg-blue-light dark:text-grey-light' : ''} outline-none`,
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
}