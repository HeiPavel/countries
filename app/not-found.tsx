import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='pt-32 md:pt-52 flex flex-col gap-4 items-center text-center text-balance text-3xl md:text-5xl dark:text-white-default text-black'>
      <h2>Not Found</h2>
      <p>404</p>
      <p>Could not find requested resource</p>
      <Link 
        href="/"
        className='mt-8 px-4 py-2 block outline-none rounded-md text-lg dark:bg-grey-light shadow-box hover:shadow-button transition-shadow duration-150 ease-linear'
      >
        Return Home
      </Link>
    </div>
  )
}