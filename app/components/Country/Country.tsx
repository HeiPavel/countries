import { CountryFullPreview, BorderCountry } from '@/app/country/[code]/page'

type Props = {
  countryData: CountryFullPreview
  borders: BorderCountry[]
}

export function Country({countryData, borders}: Props) {
  
  return (
    <div className='mt-14'>
      <h1>{countryData.name}</h1>
    </div>
  )
}