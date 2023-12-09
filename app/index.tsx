import { View } from 'react-native';
import Home from './home'
import { useRouter } from "expo-router";
const router = useRouter();


export default function Main() {
    return (
        <Home />
    );
}