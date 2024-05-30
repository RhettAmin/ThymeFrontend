import { Slot } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
    <SafeAreaProvider className="bg-background">
        <View className="flex-col h-screen w-screen">
          <View className="">
            <Header />
          </View>
          
          <View className="flex-grow">
            <Slot />
          </View>

          <View className="">
            <Footer />
          </View>
        </View>
    </SafeAreaProvider>
  );
}