import { Text, View, Dimensions, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
var {width, height} = Dimensions.get('window');

export default function Recipes() {
    return (
        <View className="flex-[3_3_0%] items-center bg-background">
            <View id="recipeCard" className="flex-1 sm:flex-col md:flex-row sm:w-[90%] md:w-[90%] lg:w-[60%] my-10 pt-5 items-top bg-recipeCard">
                {/** Image and Ingredients */}
                <View className="flex-1 px-2">
                    <View className="items-center">
                        <Image
                            source={ require('assets/Ramen.jpg') } 
                            style={{ width:'100%', height: height*0.25 }}
                        />
                    </View>
                    <View className="flex-auto">
                        <Text className="uppercase text-base font-bold text-primary pt-5">Ingredients</Text>
                        <FlatList
                            data={[
                                { key: '340g (12oz) Beef Brisket' },
                                { key: '400g (24oz) Ramen Noodles' },
                                { key: '100g (10z) Bok Choy' },
                                { key: '150ml (2 cups) Stock' },
                                { key: '12dml (2 cups) Stock' },
                                { key: '130ml (2 cups) Stock' },
                                { key: '15ml (2 cups) Stock' },
                                { key: '1520ml (2 cups) Stock' },
                                { key: '1330ml (2 cups) Stock' },
                                { key: '1110ml (2 cups) Stock' },
                                { key: '111ml (2 cups) Stock' },
                                { key: '1ml (2 cups) Stock' },
                                { key: '15g (0.25) Oshinko (Pickled Radish)' }
                            ]}
                            renderItem={({ item }) => {
                                return (
                                <View className="">
                                    <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                </View>
                                );
                            }}
                        />
                    </View>
                </View>
                {/** Main Info */}
                <View className="sm:flex-col flex-[2_2_0%] px-2 pb-5">
                    <View>
                        <Text className="uppercase text-lg font-bold text-primary">Beef Brisket Ramen</Text>
                        <View className="pt-2">
                            <View className="flex-row">
                                <Text className="font-bold text-primary">Time: </Text><Text className="text-black">1 hr</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="font-bold text-primary">Servings: </Text><Text className="text-black">6</Text>
                            </View>
                        </View>
                        <View>
                            <Text className="uppercase text-base font-bold text-primary py-5">Instructions</Text>
                            <View>
                                <Text className="font-bold">Noodles</Text>
                                <FlatList
                                    data={[
                                        { key: 'Cook Noodles according to package instructions' },
                                        { key: 'While it cooks proceed with the other steps' },
                                        { key: 'When Noodles are done take them out of the water and place in the bowl' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                            <View>
                                <Text className="font-bold">Beef Brisket</Text>
                                <FlatList
                                    data={[
                                        { key: 'Mariante meat for at least 2 hours' },
                                        { key: 'Turn on oven to 400°C. Once it reaches temperature put Brisket in ' +
                                                'for 20 minutes' },
                                        { key: 'Let meat rest for 10 minutes before slicing it' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                            <View>
                                <Text className="font-bold">Putting it together</Text>
                                <FlatList
                                    data={[
                                        { key: 'With the Noodles in the bowl, pour in your Dashi, followed by the soup base' },
                                        { key: 'Place your brisket and the rest of your toppings together on top' },
                                        { key: 'Enjoy!' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                            <View>
                                <Text className="font-bold">Putting it together</Text>
                                <FlatList
                                    data={[
                                        { key: 'With the Noodles in the bowl, pour in your Dashi, followed by the soup base' },
                                        { key: 'Place your brisket and the rest of your toppings together on top' },
                                        { key: 'Enjoy!' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                            <View>
                                <Text className="font-bold">Putting it together</Text>
                                <FlatList
                                    data={[
                                        { key: 'With the Noodles in the bowl, pour in your Dashi, followed by the soup base' },
                                        { key: 'Place your brisket and the rest of your toppings together on top' },
                                        { key: 'Enjoy!' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                            <View>
                                <Text className="font-bold">Putting it together</Text>
                                <FlatList
                                    data={[
                                        { key: 'With the Noodles in the bowl, pour in your Dashi, followed by the soup base' },
                                        { key: 'Place your brisket and the rest of your toppings together on top' },
                                        { key: 'Enjoy!' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                            <View>
                                <Text className="font-bold">Putting it together</Text>
                                <FlatList
                                    data={[
                                        { key: 'With the Noodles in the bowl, pour in your Dashi, followed by the soup base' },
                                        { key: 'Place your brisket and the rest of your toppings together on top' },
                                        { key: 'Enjoy!' },
                                    ]}
                                    renderItem={({ item }) => {
                                        return (
                                        <View className="">
                                            <Text className="pl-3 text-black text-lg">{ `\u2022 ${item.key}` }</Text>
                                        </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}