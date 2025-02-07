import { MouseEventHandler, RefObject } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { IoCloseOutline } from 'react-icons/io5'

type Props = {
  ref: RefObject<Dropdown | null>
}

export function ClearIcon({ref}: Props) {
  const handleClear: MouseEventHandler = (event) => {
    if (!ref.current) return
    event.stopPropagation()
    ref.current.clear()
  }

  return (
    <IoCloseOutline
      className='absolute size-5 outline-none right-9 cursor-default'
      onClick={handleClear}
    />
  )
}