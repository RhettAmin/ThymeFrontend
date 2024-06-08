import { Text, View } from 'react-native';
import { Linking } from 'react-native';
import { Image } from 'expo-image';
import { Link } from "expo-router";

const paragraph = "Welcome to Thyme to Dine! This is my recipe blog where you'll find a " +
                    "variety of recipes that I was interested in making, inspired to create" +
                    "or just really wanted to eat. All the recipes in this blog can be updated" +
                    "or improved upon at anytime so keep an eye out for changes." 
const thanks = "Thanks for checking out the blog!"

export default function About() {
    return (
        <View className="flex-1 items-center bg-background ">
            <View id="recipeCard" className="flex-row w-[50%] my-10 p-5 bg-recipeCard">
                <View className="">
                    <Image
                        source={ require('@/assets/Profile.webp') } 
                        style={{ width:250, height:250}}
                    />
                </View>
                <View className="flex-1 pl-5">
                    <Text className="break-normal">
                        { paragraph }
                    </Text>
                    <Text>
                        { thanks }
                    </Text>
                    <Text className="font-bold text-primary pt-2">
                        -  Rhett   
                    </Text>
                    <View className="flex-row pt-[16%] space-x-8">
                        <View className="flex-row">
                            <Text className="font-bold text-primary">
                                Contact:   
                            </Text>
                            <Text className="pl-2 text-blue-700"
                                    onPress={() => Linking.openURL('mailto:rhett.thyme@gmail.com')}>
                                    rhett.thyme@gmail.com
                            </Text>
                        </View>
                        <View className="flex-row">
                            <Text className="font-bold text-primary">
                                Socials:   
                            </Text>
                            <View className="text-blue-700" >
                                <Link href={{ pathname:"https://www.instagram.com/_thyme_to_dine_/" }} className="mb-2 pl-2">
                                    <Image
                                        className=""
                                        source={ require('@/assets/Instagram_Glyph_Black.png') } 
                                        style={{ width: 20, height: 20 }}
                                    />
                                </Link>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}