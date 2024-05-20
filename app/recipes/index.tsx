import { View, Text, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import ThymeAPI from '@/API/thymeAPI';
import firebaseAPI from 'app/API/firebaseAPI'
import Divider from '@/components/divider';


const router = useRouter();
  
type ImageListProps = {
    recipes: Recipe[],
    hasSetImages: Boolean
}
  
const routeToRecipe = (id: String) => {
    router.push({ pathname: "/recipe", params: { id }})
}

function convertArrayToButtons(array: string[]) {
    return <View>
        <FlatList
            data={array}
            className=""
            renderItem={ ({item}) =>
                <View className="bg-footer p-1 mx-2">
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
                                <Text className="text-xl text-primary font-bold">{ item.name }</Text>
                                <Text className="pt-5 text-lg text-primary font-medium">{ item.description }</Text>
                            </View>
                            <View className="flex-auto">
                                <View className="flex items-center">
                                    <Pressable className={""} onPress={ () => routeToRecipe(item.recipeId) }>
                                        <View className="bg-button rounded-lg flex items-center p-4">
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

        ThymeAPI.getRecipes().then((recipeList) => {
            for(const [index, value] of recipeList.entries()) {
                firebaseAPI.getRecipeImages(value).then((response) => {
                    finalRecipeList.push(response)
                    if (finalRecipeList.length == recipeList.length) {
                        setRecipes([...recipes, ...recipeList])
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
        <View className="flex items-center py-5 bg-background">
            {/** All Recipes title and dividers */}
            <Divider divider_text="All Recipes" />
            <ImageList recipes={recipes} hasSetImages={setImages} />
        </View>
        
    );

}