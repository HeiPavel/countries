'use client'

import Image from 'next/image'
import { useMounted } from './hooks/useMounted'
import { useTheme } from 'next-themes'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

export function ThemeSwitch() {
  const isMounted = useMounted()
  const { setTheme, resolvedTheme } = useTheme()

  if (!isMounted) return (
    <div className='flex gap-2 tablet:gap-3 items-center min-w-24 tablet:min-w-36'>
      <Image
        src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiM5Y2EzYWYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGhlaWdodD0iMWVtIiB3aWR0aD0iMWVtIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik05LjE3MyAxNC44M2E0IDQgMCAxIDEgNS42NTcgLTUuNjU3Ij48L3BhdGg+PHBhdGggZD0iTTExLjI5NCAxMi43MDdsLjE3NCAuMjQ3YTcuNSA3LjUgMCAwIDAgOC44NDUgMi40OTJhOSA5IDAgMCAxIC0xNC42NzEgMi45MTQiPjwvcGF0aD48cGF0aCBkPSJNMyAxMmgxIj48L3BhdGg+PHBhdGggZD0iTTEyIDN2MSI+PC9wYXRoPjxwYXRoIGQ9Ik01LjYgNS42bC43IC43Ij48L3BhdGg+PHBhdGggZD0iTTMgMjFsMTggLTE4Ij48L3BhdGg+PC9zdmc+'
        alt='Loading Light/Dark Toggle'
        title='Loading Light/Dark Toggle'
        className='size-4 tablet:size-6'
        width={24}
        height={24}
        sizes='24x24'
      />
      <p className='text-sm tablet:text-lg text-gray-400'>Loading...</p>
    </div>
  )

  return (
    <div 
      className='flex gap-2 tablet:gap-3 items-center cursor-pointer min-w-24 tablet:min-w-36'
      onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? 
        <IoSunnyOutline className='size-4 tablet:size-6 text-white-light'/> : 
        <IoMoonOutline className='size-4 tablet:size-6'/>
      }
      <p className='text-sm tablet:text-lg'>{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
    </div>
  )
}