import { CountryRaw } from '../page'

export const fetchAllCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,altSpellings,population,region,capital,cca3,flags')
    const jsonResponse: CountryRaw[] = await response.json()
    return jsonResponse
  } catch(error) {
    console.log(error)
    return []
  }
}