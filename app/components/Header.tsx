import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  return (
    <header className='px-4 tablet:px-8 desktop:px-16 dark:bg-grey-light bg-white-light shadow-header'>
      <div className='w-full max-w-7xl mx-auto h-24 tablet:h-20 flex justify-between items-center'>
        <p className='text-lg tablet:text-xl laptop:text-2xl font-bold dark:text-white-light text-black'>Where in the world?</p>
        <ThemeSwitch/>
      </div>
    </header>
  )
}