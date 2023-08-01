import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import LandingPage from './src/landingpage'

export default function App() {
  return (
    <View>
      <LandingPage />
      <StatusBar style="auto" />
    </View>
  );
}


