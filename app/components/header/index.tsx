import {Text, View, FlatList } from 'react-native';

const HEADER_DATA = [
    {
        name: 'RECIPES',
        style: 'flex-1 px-2 text-sm justify-end',
        text_style: 'text-sm text-primary font-ultra'
    },
    {
        name: 'THYME TO DINE',
        style: 'flex flex-1 px-8 justify-end',
        text_style: 'text-3xl text-primary font-ultra'
    },
    {
        name: 'ABOUT',
        style: 'flex flex-1 px-2 justify-end',
        text_style: 'text-sm text-primary font-ultra'
    }
];

type ItemProps = {
    title: string,
    style: string,
    text_style: string
}
const Item = ( {title, style, text_style}: ItemProps ) => (
    <View className={style}>
        <Text className={text_style}>{title}</Text>
    </View>
);

export default function Header() {
    return (
        <View className="flex-small bg-green-100 justify-items-end items-center bg-background">
            <FlatList
                data={HEADER_DATA}
                renderItem={ ({item}) => <Item title={item.name} style={item.style} text_style={item.text_style} /> }
                horizontal={true}
                />
        </View>
    );
}

