import {Text, View, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { Link } from "expo-router";
import { Linking } from 'react-native';
import Divider from '../divider';
import { isMobileSize } from '@/utils/windowSize';

const LINKS_DATA = [
    
    {
        name: 'Home',
        style: 'flex flex-1 px-2 justify-end',
        text_style: 'text-sm text-primary '
    },
    {
        name: 'Recipes',
        style: 'flex-1 px-2 text-sm justify-end',
        text_style: 'text-sm text-primary '
    },
    {
        name: 'About',
        style: 'flex flex-1 px-8 justify-end',
        text_style: 'text-3xl text-primary '
    }
];

export default function Footer() {
    return (
        <View className='flex items-center bg-footer'>
            <View className='flex-col sm:flex-row items-center py-2 sm:mx-16 gap-x-20'>
                <Link href={{ pathname:"/home" }} className="">
                    <Text className="text-xl text-primary font-bold">Thyme to Dine</Text>
                </Link>
                <View className="">
                    <FlatList
                        className=""
                        data={LINKS_DATA}
                        renderItem={ ({item}) => 
                            <Link href={{ pathname:"/"+item.name.toLowerCase() }} className="py-1 mx-2 sm:mx-0">
                                <Text className="text-primary font-bold">{ item.name } </Text> 
                            </Link>
                        }
                        horizontal={ isMobileSize() ? true : false }
                    />
                </View>
                {/* Contact Us and Social */}
                <View className="text-center items-center sm:items-start px-4 sm:mx-0">
                    <Text className="text-primary font-bold pb-1" 
                            onPress={() => Linking.openURL('mailto:rhett.thyme@gmail.com')}>
                                Email Me
                    </Text>
                    <Text className="text-primary font-bold pb-2">Socials</Text>
                    <View className="flex sm:pl-3">
                        <Link href={{ pathname:"https://www.instagram.com/_thyme_to_dine_/" }} className="py-1">
                            <Image
                                className=""
                                source={ require('@/assets/Instagram_Glyph_Black.png') } 
                                style={{ width: 20, height: 20 }}
                            />
                        </Link>
                    </View>
                </View>
            </View>
            <View className="items-center flex ">
                <View className="-my-2">
                    <Divider width={100} height={34} divider_text=''/>
                </View>
                <Text className="text-primary font-bold">&copy; Rhett Amin</Text>
            </View>
        </View>
    );
}

