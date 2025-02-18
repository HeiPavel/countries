import Link from 'next/link'
import { CountryRaw, NameRaw } from '@/app/page'
import { Country } from '@/app/components/Country/Country'
import { FaArrowLeftLong } from 'react-icons/fa6'

export type Params = {
  params: Promise<{code: string}>
}

export type Currency = {
  name: string
  symbol: string
}

export type Currencies = {
  [key: string]: Currency
}

export type Languages = {
  [key: string]: string
}

export interface CountryFullPreviewRaw extends Omit<CountryRaw, 'altSpellings' | 'cca3'> {
  subregion: string
  tld: string[]
  currencies: Currencies
  languages: Languages
  borders: string[]
}

export interface CountryFullPreview extends Omit<CountryFullPreviewRaw, 'name' | 'currencies' | 'languages'> {
  name: string
  nativeName: string[]
  currencies: string[]
  languages: string[]
}

export type BorderCountryRaw = {
  name: NameRaw
  cca3: string
}

export type BorderCountry = {
  name: string
  cca3: string
}

export default async function CountryPage({params}: Params) {
  const code = (await params).code.toUpperCase()

  const countryDataRaw: CountryFullPreviewRaw[] = await fetch(`https://restcountries.com/v3.1/alpha?codes=${code}&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`).then(res => res.json())
  const {name, currencies, languages, borders, ...rest} = countryDataRaw[0]
  const nativeNames = Object.values(name.nativeName)
  const currenciesToPreview = Object.values(currencies).map(currency => currency.name)
  const languagesToPreview = Object.values(languages)
  
  const countryData: CountryFullPreview = {
    name: name.official,
    nativeName: nativeNames.length ? nativeNames.map(name => name.common) : [name.common],
    borders: borders.map(code => code.toUpperCase()),
    currencies: currenciesToPreview,
    languages: languagesToPreview,
    ...rest
  }
  
  const borderCountriesDataRaw: BorderCountryRaw[] = countryData.borders.length ? await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}&fields=name,cca3`).then(res => res.json()) : []
  const borderCountriesData: BorderCountry[] = borderCountriesDataRaw.map(contry => {
    return {
      name: contry.name.common,
      cca3: contry.cca3
    }
  })
  
  return (
    <div className='w-full max-w-7xl mx-auto mt-10 desktop:mt-14'>
      <Link 
        href='/'
        className='block w-36 h-12 outline-none'
      >
        <button className='size-full rounded-md outline-none flex items-center justify-center gap-3 dark:bg-grey-light shadow-box hover:shadow-button transition-shadow duration-150 ease-linear'>
          <FaArrowLeftLong 
            className='size-5 dark:text-white-default text-black'
          />
          <span className='dark:text-white-dark text-grey-default'>Back</span>
        </button>
      </Link>
      <Country 
        countryData={countryData}
        borders={borderCountriesData}
      />
    </div>
  )
}