import { NativeWindStyleSheet } from "nativewind";
import { Slot } from "expo-router";
import { View } from 'react-native';
import { useState, useEffect } from 'react';
import Header from '@/components/header'
import Footer from '@/components/footer'

{/** Home Layout File */}
NativeWindStyleSheet.setOutput({
  default: "native",
});

import "./main.css";

export default function () {

  useEffect(() =>  {
    let viewport = document.querySelector("meta[name=viewport]");
    const content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
    // this is where the magic happens by changing the vewport meta tag
    viewport!!.setAttribute('content', content);    
  }, [])

  return (
    <View id="root" className="flex-col min-h-screen bg-background">
      <header className="">
        <Header />
      </header>
      
      <main className="flex-grow background">
        <Slot />
      </main>

      <footer className="">
        <Footer />
      </footer>
    </View>
  );
}