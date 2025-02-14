import Image from 'next/image'
import { CountryFullPreview, BorderCountry } from '@/app/country/[code]/page'
import { Description } from './Description'

type Props = {
  countryData: CountryFullPreview
  borders: BorderCountry[]
}

export function Country({countryData, borders}: Props) {
  const {name, nativeName, population, region, subregion, capital, tld, currencies, languages, flags} = countryData

  const baseCountryInfo = {
    'Native Name': nativeName.length > 1 ? nativeName: nativeName.join(''),
    'Population': (population).toLocaleString('en-US'),
    'Region': region,
    'Sub Region': subregion,
    'Capital': capital.length > 1 ? capital: capital.join('')
  }

  const secondaryCountryInfo = {
    'Top Level Domain': tld.join(', '),
    'Currencies': currencies.length > 1 ? currencies : currencies.join(''),
    'Languages': languages.length > 1 ? languages : languages.join('')
  }

  return (
    <div className='mt-10 desktop:mt-16 flex flex-col desktop:flex-row gap-10 justify-normal items-center desktop:justify-between desktop:items-start'>
      <div className='relative w-full max-w-[580px] aspect-[17/10]'>
        <Image
          src={flags.png}
          alt={flags.alt}
          fill
          className='object-cover'
          sizes='640w'
          quality={100}
        />
      </div>
      <div className='w-full max-w-[580px] desktop:pt-6'>
        <p className='text-2xl md:text-3xl font-bold text-black dark:text-white-default text-balance'>{name}</p>
        <div className='flex flex-col tablet:flex-row gap-2 mt-6 justify-normal tablet:justify-between'>
          <div className='flex flex-col gap-2'>
            <Description data={baseCountryInfo}/>
          </div>
          <div className='flex flex-col gap-2'>
            <Description data={secondaryCountryInfo}/>
          </div>
        </div>
      </div>
    </div>
  )
}