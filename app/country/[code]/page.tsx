type Params = {
  params: Promise<{code: string}>
}

export default async function CountryPage({params}: Params) {
  const code = (await params).code
  
  return (
    <h1>{code}</h1>
  )
}