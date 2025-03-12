import { DescriptionItem } from '../Countries/DescriptionItem'
import { DescriptionList } from './DescriptionList'

type DescriptionType = {
  [key: string]: string | string[]
}

export function Description({data}: {data: DescriptionType}) {
  return (
    <>
      {
        Object.entries<string | string[]>(data).map((item, index) => {
          const [fieldName, value] = item

          if (typeof value === 'string') {
            return (
              <DescriptionItem
                key={index}
                fieldName={fieldName}
                value={value}
                isCard={false}
              />
            )
          } else {
            return (
              <DescriptionList
                key={index}
                title={fieldName}
                options={value}
              />
            )
          }
        })
      }
    </>
  )
}