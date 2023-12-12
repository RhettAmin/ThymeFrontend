import {Text, View, Image, FlatList } from 'react-native';

const LINKS_DATA = [
    {
        name: 'RECIPES',
        style: 'flex-1 px-2 text-sm justify-end',
        text_style: 'text-sm text-primary '
    },
    {
        name: 'ABOUT',
        style: 'flex flex-1 px-8 justify-end',
        text_style: 'text-3xl text-primary '
    },
    {
        name: 'CONTACT',
        style: 'flex flex-1 px-2 justify-end',
        text_style: 'text-sm text-primary '
    }
];

type ItemProps = {
    title: string,
}
const Item = ( {title}: ItemProps ) => (
    <Text className="text-primary py-1 ">{title}</Text>
);

export default function Footer() {
    return (
        <View className='flex absolute bottom-0 w-[100%] items-center bg-footer'>
            <View className='py-2 items-center flex-row space-x-16'>
                {/* Logo */}
                    <Text className="text-lg text-primary ">Thyme to Dine</Text>
                    <Image 
                        className="" 
                        style={{ width: 40, height: 40 }} 
                        source={ require('@/assets/Instagram_logo.png') }
                    />
                    <FlatList
                        className="pl-8"
                        data={LINKS_DATA}
                        renderItem={ ({item}) => <Item title={item.name} /> }
                        horizontal={false}
                    />
            </View>
            <View className="py-1 items-center">
                <Text className="text-primary">SITE BY RHETT</Text>
                <Text className="text-primary">PRIVACY POLICY</Text>
            </View>
        </View>
    );
}

