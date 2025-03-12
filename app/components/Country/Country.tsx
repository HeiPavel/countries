import Image from 'next/image'
import { CountryFullPreview, BorderCountry } from '@/app/country/[code]/page'
import { Description } from './Description'
import { Borders } from './Borders'
import { checkListLength } from '@/app/util/checkListLength'
import * as motion from 'motion/react-client'

type Props = {
  countryData: CountryFullPreview
  borders: BorderCountry[]
}

const transition = {
  duration: 0.7,
  ease: 'easeInOut'
}

export function Country({countryData, borders}: Props) {
  const {name, nativeName, population, region, subregion, capital, tld, currencies, languages, flags} = countryData

  const uniqueNativeNames = [...new Set(nativeName)]

  const baseCountryInfo = {
    'Native Name': checkListLength(uniqueNativeNames),
    'Population': (population).toLocaleString('en-US'),
    'Region': region,
    'Sub Region': subregion,
    'Capital': checkListLength(capital)
  }

  const secondaryCountryInfo = {
    'Top Level Domain': checkListLength(tld),
    'Currencies': checkListLength(currencies),
    'Languages': checkListLength(languages)
  }

  return (
    <div className='mt-10 desktop:mt-16 flex flex-col desktop:flex-row gap-10 justify-normal items-center desktop:justify-between desktop:items-start'>
      <motion.div 
        className='relative w-full max-w-[580px] aspect-[17/10] shadow-box'
        initial={{opacity: 0, x: 0}}
        animate={{opacity: [0, 1], x: [-100, 0]}}
        transition={transition}
      >
        <Image
          src={flags.png}
          alt={flags.alt}
          fill
          className='object-cover'
          sizes='640w'
          quality={100}
        />
      </motion.div>
      <div className='w-full max-w-[580px] desktop:pt-6'>
        <motion.div
          initial={{opacity: 0, x: 0}}
          animate={{opacity: [0, 1], x: [100, 0]}}
          transition={transition}
        >
          <p className='text-2xl md:text-3xl font-bold text-black dark:text-white-default text-balance'>{name}</p>
          <div className='flex flex-col tablet:flex-row gap-2 mt-6 justify-normal tablet:justify-between'>
            <div className='flex flex-col gap-2'>
              <Description data={baseCountryInfo}/>
            </div>
            <div className='flex flex-col gap-2'>
              <Description data={secondaryCountryInfo}/>
            </div>
          </div>
        </motion.div>
        <Borders borders={borders}/>
      </div>
    </div>
  )
}