type ItemType = {
  fieldName: string
  value: string
}

export function DescriptionItem({fieldName, value}: ItemType) {
  return (
    <div className='flex gap-1'>
      <p className='dark:text-white-default text-black capitalize'>{fieldName}:</p>
      <p className='dark:text-white-dark text-grey-default font-light'>{value}</p>
    </div>
  )
}