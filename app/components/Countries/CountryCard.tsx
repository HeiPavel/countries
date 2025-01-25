import Link from 'next/link'
import Image from 'next/image'
import { CountryCardType } from './Countries'
import { DescriptionItem } from './DescriptionItem'

export function CountryCard({cardData}: {cardData: CountryCardType}) {
  const {name, capital, population, cca3, region, flags} = cardData
  const description = {
    population: String(population),
    region,
    capital: capital.join(',')
  }

  return (
    <Link 
      href={`/country/${cca3}`}
      className='w-full h-[360px] dark:bg-grey-light bg-white-light rounded-md overflow-hidden'
    >
      <div className='relative w-full h-40'>
        <Image
          src={flags.png}
          alt={flags.alt}
          fill
          sizes='25vw'
          className='object-cover'
        />
      </div>
      <div className='mt-5 pl-4'>
        <p className='dark:text-white-light text-black text-xl font-bold'>{name}</p>
        <div className='flex flex-col gap-1.5 mt-3'>
          {
            Object.entries(description).map((item, index) => {
              const [fieldName, value] = item

              return <DescriptionItem
                key={index}
                fieldName={fieldName}
                value={value}
              />
            })
          }
        </div>
      </div>
    </Link>
  )
}