import { removeDiacritics } from './util/removeDiacritics'
import { fetchAllCountries } from './util/fetchAllCountries'
import { Countries } from './components/Countries/Countries'
import { addTags } from './util/addTags'
import { CountryCard } from './components/Countries/CountryCard'
import { CountryOptionTemplate } from './components/Countries/CountryOptionTemplate'

export type NameBase = {
  common: string
  official: string
}

export type NativeName = {
  [key: string]: NameBase
}

export interface NameRaw extends NameBase {
  nativeName: NativeName
}

export type Flags = {
  alt: string
  png: string
  svg: string
}

export type CountryRaw = {
  altSpellings: string[]
  name: NameRaw
  population: number
  region: string
  capital: string[]
  cca3: string
  flags: Flags
}

export interface CountryPreview extends Omit<CountryRaw, 'altSpellings' | 'name'> {
  name: string
}

export type CountiesChildren = {
  name: string
  region: string
  searchTags: string[]
  countryCard: React.ReactNode
  option: React.ReactNode
}

export const revalidate = 15552000

export default async function CountriesMain() {
  const countriesRaw = await fetchAllCountries()
  const countries: CountiesChildren[] = countriesRaw.map(country => {
    const {name, region, altSpellings, flags, ...rest} = country
    const searchTags: string[] = []

    for (const key in name) {
      if (typeof name[key as keyof NameRaw] === 'string') {
        const tag = name[key as keyof NameBase].toLowerCase()
        addTags(tag, searchTags)        
      }
    }

    const normalizedName = removeDiacritics(name.common).toLowerCase()
    addTags(normalizedName, searchTags)
    
    for (const altName of altSpellings) {
      const tags = altName.toLowerCase().split(' ')
      addTags(tags, searchTags)
    }

    const cardData = {
      name: name.official,
      searchTags: searchTags,
      flags,
      region,
      ...rest
    }

    const option = {
      name: name.official,
      flag: flags.svg,
      alt: flags.alt
    }

    return {
      name: name.official,
      region,
      searchTags,
      countryCard: <CountryCard cardData={cardData}/>,
      option: <CountryOptionTemplate option={option}/>
    }
  })

  return (
    <Countries>{countries}</Countries>
  )
}