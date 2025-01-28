import { useState, useEffect } from 'react'

export function usePrimeStylesReady() {
  const [isPrimeStylesLoaded, setIsPrimeStylesLoaded] = useState(false)

  useEffect(() => {
    const intervalID = setInterval(() => {
      const elements = document.querySelectorAll('head > style[data-primereact-style-id]')
      if (elements.length >= 3) {
        setIsPrimeStylesLoaded(true)
        clearInterval(intervalID)
      }
    }, 50)

    return () => clearInterval(intervalID)
  }, [])

  return isPrimeStylesLoaded
}