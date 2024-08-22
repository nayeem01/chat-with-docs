import type { Metadata } from 'next'
import { GlobalContextProvider } from './Context/store'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Research Buddy',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}
