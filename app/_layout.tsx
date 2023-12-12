import { Slot } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '@/components/header'
import Footer from '@/components/footer'
import { NativeWindStyleSheet } from "nativewind";

{/** Home Layout File */}
NativeWindStyleSheet.setOutput({
  default: "native",
});

import "./main.css";

export default function () {
  return (
    <SafeAreaProvider>
        <Header />
        <div className="flex flex-col"><Slot /></div>
        <Footer />
    </SafeAreaProvider>
  );
}