import type { Metadata } from 'next'
import { Providers } from './providers'
import {PrimeReactProvider} from 'primereact/api'
import { Header } from './components/Header'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700']
})

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_ENV === 'production' ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) : process.env.VERCEL_ENV === 'preview' ? new URL(`https://${process.env.VERCEL_BRANCH_URL}`) : new URL('http://localhost:3000'),
  title: {
    default: 'Countries info',
    template: '%s | Countries info'
  },
  description: 'Explore and discover countries worldwide with key information at your fingertips. Search, filter by region, and learn essential details about any country in just a few clicks.',
  twitter: {
    card: 'summary_large_image'
  },
  verification: {
    google: 'zm1RyOb1pXk-onkAmaiQy3K6rIczA99wKk4vLZun4gg'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${nunito.className} antialiased dark:bg-grey-default bg-white-default flex flex-col min-h-screen overflow-y-scroll`}>
        <Providers>
          <Header/>
          <main className='relative overflow-hidden grow px-4 tablet:px-8 desktop:px-16 pb-14'>
            <PrimeReactProvider value={{unstyled: true, pt: {}}}>
              {children}
            </PrimeReactProvider>
          </main>
        </Providers>
      </body>
    </html>
  )
}
