'use client'

import "./globals.css"
import { Store } from '@/lib/store'
import { Provider } from 'react-redux'
import Header from "./components/header"
import Footer from "./components/footer"
import ScrollToTopButton from "./components/scrollTopButton"
import { Lora } from 'next/font/google'
import { usePathname } from 'next/navigation'

const lora = Lora({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const needsFlexibleHeight = pathname === '/recipe' || pathname === '/main'

  return (
    <Provider store={Store}>
      <html lang="en" className={lora.className}>

        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta title="Thyme to Dine" />
          <meta name="description" content="A Recipe Blog by Rhett Amin"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        </head>

        <body className="bg-page w-full h-screen pt-16 antialiased">
          <Header/>
          <div className={`py-8 ${needsFlexibleHeight ? 'min-h-full' : 'h-full'}`}>
            { children }
          </div>
          <ScrollToTopButton />
          <Footer/>
        </body>

      </html>
    </Provider>
  );
}
