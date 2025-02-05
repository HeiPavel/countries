import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  return (
    <header className='dark:bg-grey-light bg-white-light px-4 tablet:px-10 desktop:px-20 shadow-header'>
      <div className='container h-24 tablet:h-20 flex justify-between items-center'>
        <p className='text-lg tablet:text-xl laptop:text-2xl font-bold dark:text-white-light text-black'>Where in the world?</p>
        <ThemeSwitch/>
      </div>
    </header>
  )
}