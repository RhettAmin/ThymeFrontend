import { Text, View, Dimensions, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import getRecipeList from '@/API/thymeHTTP'
import { Image } from 'expo-image';

var {width, height} = Dimensions.get('window');

export default function Recipes() {
    const { id } = useLocalSearchParams<{ id: string }>();
    let recipes = getRecipeList(id)

    return (
        <View className="flex-grow items-center bg-background">
            { recipes.map( recipe => {
                return (
                    <View id="recipeCard" className="flex py-8 sm:flex-col md:flex-row sm:w-[90%] md:w-[90%] lg:w-[60%] my-10 divide-x bg-recipeCard">
                        {/** Image and Ingredients */}
                        <View className="flex px-8">
                            <View className="items-center">
                                <Image
                                    source={ require('@/assets/Ramen.jpg') } 
                                    style={{ width:width*0.12, height: height*0.25 }}
                                />
                            </View>
                            <View className="flex">
                                {/* Ingredients */}
                                <Text className="uppercase text-lg font-bold text-primary pt-5 pb-2">Ingredients</Text>
                                { recipe.ingredientSection.map( ingredientSection => {
                                    return (
                                        <View className="pl-2">
                                            <Text className="font-bold my-2">{ ingredientSection.sectionName }</Text>
                                            <ul>
                                                <FlatList
                                                    data={ ingredientSection.ingredients }
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item }) => {
                                                        return (
                                                            <li className="pl-3 text-black text-lg"> 
                                                                { `
                                                                    ${ item.name }  
                                                                    ${ item.quantity.toString() }
                                                                    ${ item.measurement }
                                                                `}
                                                            </li>
                                                        );
                                                    }}
                                                />
                                            </ul>
                                        </View>
                                    ) 
                                })}
                                
                            </View>
                        </View>
                        {/** Main Info */}
                        <View className="sm:flex-col flex-[2_2_0%] px-8">
                            <View>
                                <View>
                                    <Text className="uppercase text-xl font-bold text-primary">{ recipe.name }</Text>
                                    <View className="divide-y-2 divide-dashed divide-emerald-800">
                                        <View className="pt-2 mb-4">
                                            <View className="flex-row">
                                                <Text className="font-bold text-primary">Time: </Text><Text className="text-black">{ recipe.timeToPlate }</Text>
                                            </View>
                                            <View className="flex-row">
                                                <Text className="font-bold text-primary">Servings: </Text><Text className="text-black">{ recipe.servings.toString() }</Text>
                                            </View>
                                        </View>
                                        <View>
                                            {/* Instructions */}
                                            <Text className="uppercase text-lg font-bold text-primary py-5">Instructions</Text>
                                            { recipe.instructionSection.map( instruction => {
                                                return(
                                                    <View>
                                                        <Text className="font-bold py-2">{ instruction.sectionName }</Text>
                                                        <FlatList
                                                            data={ instruction.steps }
                                                            keyExtractor={(item, index) => index.toString()}
                                                            renderItem={({ item }) => {
                                                                return (
                                                                <View className="">
                                                                    <Text className="pl-3 text-black text-lg">{ `\u2022 ${item}` }</Text>
                                                                </View>
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    );
}