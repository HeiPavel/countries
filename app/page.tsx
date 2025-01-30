import { removeDiacritics } from './util/removeDiacritics'
import { fetchAllCountries } from './util/fetchAllCountries'
import { Countries } from './components/Countries/Countries'

export type NameBase = {
  common: string
  official: string
}

export interface NameRaw extends NameBase {
  nativeName: NameBase
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
  searchTags: string[]
}

export const revalidate = 2592000

export default async function CountriesMain() {
  const countriesRaw = await fetchAllCountries()
  const countries: CountryPreview[] = countriesRaw.map(country => {
    const {name, altSpellings, ...rest} = country
    const normalizedName = removeDiacritics(name.common)
    const searchTags = [normalizedName.toLowerCase()]

    for (const key in name) {
      if (typeof name[key as keyof NameRaw] === 'string' && name[key as keyof NameRaw] !== normalizedName) {
        searchTags.push(name[key as keyof NameBase].toLowerCase())
      }
    }
    
    for (const altName of altSpellings) {
      const tag = altName.toLowerCase()
      if (!searchTags.includes(tag)) searchTags.push(tag)
    }

    return {
      name: name.official,
      searchTags: searchTags,
      ...rest
    }
  })

  return (
    <Countries countries={countries} />
  )
}