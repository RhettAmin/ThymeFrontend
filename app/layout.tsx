'use client'

import "./globals.css"
import { Store } from '@/lib/store'
import { Provider } from 'react-redux'
import Header from "./components/header"
import Footer from "./components/footer"
import ScrollToTopButton from "./components/scrollTopButton"
import { Lora } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={Store}>
      <html lang="en" className={lora.className}>

        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta title="Thyme to Dine" />
          <meta name="description" content="A Recipe Blog by Rhett Amin"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        </head>

        <body className="bg-surface-page w-full h-screen antialiased">
          <Header/>
          <div className="mt-16 py-8 h-full">
            { children }
          </div>
          <ScrollToTopButton />
          {/* <Footer/> */}
        </body>

      </html>
    </Provider>
  );
}
