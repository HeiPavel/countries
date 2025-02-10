import Image from 'next/image'

export type Template = {
  name: string
  flag: string
  alt: string
}

export function CountryOptionTemplate ({option}: {option: Template}) {
    return (
      <div className='py-3 px-2 flex items-center gap-1.5 cursor-pointer animate-appear'>
        <div className='relative w-[18px] h-3 shrink-0'>
          <Image
            src={option.flag}
            alt={option.alt}
            fill
            sizes='10vw'
            className='object-cover'
            quality={75}
            priority={true}
          />
        </div>
        <p className='truncate'>{option.name}</p>
      </div>
    )
  }