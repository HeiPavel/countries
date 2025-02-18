import Link from 'next/link'
import { BorderCountry } from '@/app/country/[code]/page'
import * as motion from 'motion/react-client'

const fadeAnimation = {
  hidden: {opacity: 0, y: -100},
  visible: {opacity: 1, y: 0}
}

export function Borders({borders}: {borders: BorderCountry[]}) {
  const borderCountries = () => {
    const {length} = borders
    if (length === 0) return (
      <motion.p 
        className='py-1 text-black dark:text-white-dark'
        initial='hidden'
        animate='visible'
        variants={fadeAnimation}
        transition={{ease: 'easeInOut'}}
      >
        None
      </motion.p>
    )

    return borders.map((country, index) => (
      <motion.div
        key={index}
        initial='hidden'
        animate='visible'
        variants={fadeAnimation}
        transition={{
          delay: (length - 1 - index) * 0.1, 
          ease: 'easeInOut'
        }}
        className='will-change-transform'
      >
        <Link
          href={`/country/${country.cca3}`}
          className='block min-w-32 text-center px-4 py-1 text-black dark:text-white-default bg-white-light dark:bg-grey-light shadow-box hover:shadow-button rounded-sm transition-shadow duration-150 ease-linear'
        >
          {country.name}
        </Link>
      </motion.div>
    ))
  }

  return (
    <div className={`mt-10 md:mt-12 flex ${borders.length ? 'flex-col tablet:flex-row': ''} gap-4`}>
      <motion.p 
        className='py-1 text-black dark:text-white-default font-bold shrink-0'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
          ease: 'easeInOut',
          duration: 0.5
        }}
      >
        Border Countries:
      </motion.p>
      <div className='flex gap-4 flex-wrap'>
        {borderCountries()}
      </div>
    </div>
  )
}