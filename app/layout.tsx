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
  title: 'Countries'
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
          <main className='grow'>
            <PrimeReactProvider value={{unstyled: true, pt: {}}}>
              {children}
            </PrimeReactProvider>
          </main>
        </Providers>
      </body>
    </html>
  )
}
