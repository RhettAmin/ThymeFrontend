import { Text, View, Image } from 'react-native';
import { Linking } from 'react-native';

export default function About() {
    return (
        <View className="flex-1 items-center bg-background">
            <View id="recipeCard" className="flex-row w-[50%] my-10 p-5 items-top bg-recipeCard">
                <View className="">
                    <Image
                        source={ require('@/assets/Me.jpg') } 
                        style={{ width:250, height:250}}
                    />
                </View>
                <View className="flex-1 pl-5">
                    <Text className="break-normal">
                        Welcome to Thyme to Dine! Here you'll find recipes that I was interested in, inspired to create or just really want to eat. I plan to add a lot more in the future so stay tuned. 
                        
                    </Text>
                    <Text className="font-bold text-primary pl-[5%] pt-2">
                        -  Rhett   
                    </Text>
                    <View className="flex-row pt-[16%]">
                        <Text className="font-bold text-primary">
                            Contact:   
                        </Text>
                        <Text className="pl-2 text-blue-700"
                                onPress={() => Linking.openURL('mailto:rhett.thyme@gmail.com')}>
                                rhett.thyme@gmail.com
                        </Text>
                    </View>
                </View>
            </View>
        </View>

    );
}