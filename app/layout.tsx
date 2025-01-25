import type { Metadata } from 'next'
import { Providers } from './providers'
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
      <body className={`${nunito.className} antialiased dark:bg-grey-default bg-white-default flex flex-col min-h-screen`}>
        <Providers>
          <Header/>
          <main className='grow'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
