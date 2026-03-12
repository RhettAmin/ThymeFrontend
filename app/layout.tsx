'use client'

import "./globals.css"
import { Store } from '@/lib/store'
import { Provider } from 'react-redux'
import Header from "./components/header"
import Footer from "./components/footer"
import ScrollToTopButton from "./components/scrollTopButton"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={Store}>
      <html lang="en">

        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta title="Thyme to Dine" />
          <meta name="description" content="A Recipe Blog by Rhett Amin"/>
        </head>

        <body className="bg-ThymebackgroundGreen w-full h-full antialiased">
          <Header/>
          <div className="mt-16 py-8">
            { children }
          </div>
          <ScrollToTopButton />
          <Footer/>
        </body>

      </html>
    </Provider>
  );
}
