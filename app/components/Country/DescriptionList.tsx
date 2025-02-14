type Data = {
  title: string
  options: string[]
}

export function DescriptionList({title, options}: Data) {
  return (
    <div>
      <p className='dark:text-white-default text-black capitalize font-bold'>{title}:</p>
      <ul 
        className='mt-1 pl-6 list-disc flex flex-col gap-1'
      >
        {options.map((option, index) => (
            <li 
              key={index}
              className='dark:text-white-dark text-black'
            >
              {option}
            </li>
          )
        )}
      </ul>
    </div>
  )
}