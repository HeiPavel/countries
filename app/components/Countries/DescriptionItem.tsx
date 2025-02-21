type ItemType = {
  fieldName: string
  value: string
  isCard: boolean
}

export function DescriptionItem({fieldName, value, isCard}: ItemType) {
  const isColumn = !isCard && value.length > 23

  return (
    <div className={`flex gap-1 ${isColumn ? 'flex-col' : ''}`}>
      <p className='dark:text-white-default text-black capitalize font-bold text-nowrap'>{fieldName}:</p>
      <p className={`dark:text-white-dark text-black ${isColumn ? 'pl-1.5' : 'truncate'}`}>{value.length ? value : 'None'}</p>
    </div>
  )
}