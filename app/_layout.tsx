import { Slot } from "expo-router";
import Header from '@/components/header'
import Footer from '@/components/footer'
import { NativeWindStyleSheet } from "nativewind";
import { View } from 'react-native';

{/** Home Layout File */}
NativeWindStyleSheet.setOutput({
  default: "native",
});

import "./main.css";

export default function () {
  return (
    <View id="root" className="flex-col min-h-screen bg-background">
      <View className="">
        <Header />
      </View>
      
      <View className="flex-grow background">
        <Slot />
      </View>

      <View className="">
        <Footer />
      </View>
    </View>
  );
}