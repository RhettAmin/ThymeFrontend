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
    <SafeAreaProvider>
        <View className="flex flex-col h-screen">
          <Header />
          <View className="flex-grow"><Slot /></View>
          <Footer />
        </View>
    </SafeAreaProvider>
  );
}