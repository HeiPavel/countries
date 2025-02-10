import { CountryRaw, NameRaw } from '@/app/page'

type Params = {
  params: Promise<{code: string}>
}

type Currency = {
  name: string
  symbol: string
}

type Currencies = {
  [key: string]: Currency
}

type Languages = {
  [key: string]: string
}

interface CountryFullPreviewRaw extends Omit<CountryRaw, 'altSpellings' | 'cca3'> {
  subregion: string
  tld: string[]
  currencies: Currencies
  languages: Languages
  borders: string[]
}

interface CountryFullPreview extends Omit<CountryFullPreviewRaw, 'name' | 'currencies' | 'languages'> {
  name: string
  nativeName: string
  currencies: string[]
  languages: string[]
}

type BorderCountryRaw = {
  name: NameRaw
  cca3: string
}

type BorderCountry = {
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
    nativeName: nativeNames.length ? nativeNames[0].official : name.official,
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
    <h1>{code}</h1>
  )
}