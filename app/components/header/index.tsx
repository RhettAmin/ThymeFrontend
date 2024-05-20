import { View, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { useRouter } from "expo-router"
const router = useRouter();

const HEADER_DATA = [
    {
        name: 'RECIPES',
        style: 'flex-1 text-sm justify-end',
        text_style: 'text-sm text-primary font-bold',
        navigation: "/recipes"
    },
    {
        name: 'THYME TO DINE',
        style: 'flex flex-1 px-10 justify-end',
        text_style: 'text-5xl text-primary font-bold',
        navigation: "/home"
    },
    {
        name: 'ABOUT',
        style: 'flex flex-1 justify-end',
        text_style: 'text-sm text-primary font-bold',
        navigation: "/about"
    }
];


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
        <View className="flex pt-5 items-center bg-background">
            <FlatList
                data={HEADER_DATA}
                renderItem={ ({item}) => 
                    <Item 
                        title={item.name} 
                        style={item.style} 
                        text_style={item.text_style} 
                        navigation={item.navigation}
                    /> 
                }
                horizontal={true}
                />
        </View>
    );
}

