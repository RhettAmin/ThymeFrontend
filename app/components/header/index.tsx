import { Text, View, FlatList, Pressable } from 'react-native';
import { useRouter } from "expo-router"
const router = useRouter();

const HEADER_DATA = [
    {
        name: 'RECIPES',
        style: 'flex-1 text-sm justify-end',
        text_style: 'text-sm text-primary ',
        navigation: "/recipes"
    },
    {
        name: 'THYME TO DINE',
        style: 'flex flex-1 px-10 justify-end',
        text_style: 'text-3xl text-primary ',
        navigation: "/home"
    },
    {
        name: 'ABOUT',
        style: 'flex flex-1 justify-end',
        text_style: 'text-sm text-primary ',
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
        <Pressable onPress={ () => router.push(navigation) }>
            <Text className={text_style}> {title} </Text>
        </Pressable>
    </View>
);

export default function Header() {
    return (
        <View className="flex-initial pt-5 items-center bg-background">
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

