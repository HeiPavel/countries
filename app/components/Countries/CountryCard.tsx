import Link from 'next/link'
import Image from 'next/image'
import { CountryPreview } from '@/app/page'
import { DescriptionItem } from './DescriptionItem'

export function CountryCard({cardData}: {cardData: CountryPreview}) {
  const {name, capital, population, cca3, region, flags} = cardData
  const description = {
    population: (population).toLocaleString('en-US'),
    region,
    capital: capital.join(', ')
  }

  return (
    <Link 
      href={`/country/${cca3}`}
      className='block w-[275px] h-[360px] dark:bg-grey-light bg-white-light rounded-md overflow-hidden shadow-box animate-appear transition-[box-shadow,filter] will-change-[filter] ease-linear duration-150 hover:saturate-150 hover:shadow-box-hover'
    >
      <div className='relative w-full h-40 shadow-flag'>
        <Image
          src={flags.png}
          alt={flags.alt}
          fill
          sizes='25vw'
          className='object-cover'
        />
      </div>
      <div className='mt-5 px-4'>
        <p className='dark:text-white-light text-black text-xl font-bold truncate'>{name}</p>
        <div className='flex flex-col gap-1.5 mt-3'>
          {
            Object.entries(description).map((item, index) => {
              const [fieldName, value] = item

              return <DescriptionItem
                key={index}
                fieldName={fieldName}
                value={value}
                isCard={true}
              />
            })
          }
        </div>
      </div>
    </Link>
  )
}