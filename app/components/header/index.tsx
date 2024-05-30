import { View, FlatList, Text } from 'react-native'
import { Link } from 'expo-router'



type ItemProps = {
    title: string,
    style: string,
    text_style: string,
    navigation: string
}
const Item = ( {title, style, text_style, navigation}: ItemProps ) => (
    <View className={style}>
        <Link href={navigation} className={text_style}> {title} </Link>
    </View>
);

export default function Header() {
    return (
        <View className="py-5 items-center bg-background flex-row justify-center">

            <View className='pt-7'>
                <Link href="/recipes" className='text-sm text-primary font-bold'> 
                    <Text> RECIPES </Text>
                </Link>
            </View>

            <View>
                <Link href="/home" className='text-5xl text-primary font-bold'> 
                    <Text> THYME TO DINE </Text> 
                </Link>
            </View>

            <View className='pt-7'>
                <Link href="/about" className='text-sm text-primary font-bold'>
                    <Text> ABOUT </Text>
                </Link>
            </View>

        </View>
    );
}

