import { View, Text, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import ThymeAPI from '@/API/thymeAPI';
import firebaseAPI from 'app/API/firebaseAPI'
import Divider from '@/components/divider';

const router = useRouter();
const tagColour = [
    '#B2E1E4',
    '#CDB2E4',
    '#E4B4B2'
]
  
type ImageListProps = {
    recipes: Recipe[],
    hasSetImages: Boolean
}
  
const routeToRecipe = (id: String) => {
    router.push({ pathname: "/recipe", params: { id }})
}

function getTagColour(num: number): string {
    let returnVal = tagColour[0]
    if (num % 3 == 0) {
        returnVal = tagColour[2]
    } else if (num % 2 == 0) {
        returnVal = tagColour[1]
    } 
    console.log(returnVal)
    return returnVal
}

function convertArrayToButtons(array: string[]) {
    return <View>
        <FlatList
            data={array}
            className=""
            renderItem={ ({item, index}) =>
                <View className="bg-button p-1 mx-2 rounded-lg border"
                    style={{ backgroundColor: getTagColour(index)}}>
                    <Text>{ item }</Text>
                </View>
            }
            horizontal={true}
        />  
    </View>
}
  
function ImageList({ recipes, hasSetImages }: ImageListProps) {
    if (hasSetImages) {
        return <FlatList
        data={recipes}
        className="w-[50%]"
        renderItem={ ({item}) =>
            // Card border
            <View className="flex p-4 bg-recipeCard my-2">
                    <View className="flex-row">
                        <View className="flex-none">
                            <Pressable className={""} onPress={ () => routeToRecipe(item.recipeId) }>
                                <Image 
                                    source={URL.createObjectURL(item.mainImage!!)}
                                    className=""
                                    style={{ width: 300, height: 300 }}
                                /> 
                            </Pressable>
                        </View>
                        <View className="flex-1">
                            <View className="flex-auto pl-5">
                                <View className="flex-row justify-between">
                                    <Text className="text-xl text-primary font-bold">{ item.name }</Text>
                                    <Text className="text-base text-primary pt-1 ">{ item.updatedDate }</Text>
                                </View>
                                <Text className="pt-5 text-lg text-primary font-medium">{ item.description }</Text>
                            </View>
                            <View className="flex-auto">
                                <View className="flex items-center">
                                    <Pressable className={""} onPress={ () => routeToRecipe(item.recipeId) }>
                                        <View className="bg-header rounded-lg border flex items-center py-2 px-4">
                                            <Text className="text-lg font-semibold">Cook it!</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                            <View className="pl-3 flex-intial">
                                { convertArrayToButtons(item.tags) }
                            </View>
                        </View>
                    </View>
            </View>
        }
        />  
    }
}

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [setImages, hasSetImages] = useState<Boolean>(false);

    const getRecipes = async () => {
        let finalRecipeList = []
        console.log(getTagColour(1))
        ThymeAPI.getRecipes().then((recipeList) => {
            for(const [index, value] of recipeList.entries()) {
                firebaseAPI.getRecipeImages(value).then((response) => {
                    finalRecipeList.push(response)
                    if (finalRecipeList.length == recipeList.length) {
                        setRecipes(recipeList)
                        hasSetImages(true)
                    }
                })
            }
        })
    }



    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <View className="flex items-center py-5 bg-[#e7f3dc]">
            {/** All Recipes title and dividers */}
            <Divider divider_text="All Recipes" />
            <ImageList recipes={recipes} hasSetImages={setImages} />
        </View>
        
    );

}