import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import ThymeAPI from '@/API/thymeAPI';
import firebaseAPI from 'app/API/firebaseAPI'
import Divider from '@/components/divider';
import LoadingScreen from '@/components/loadingScreen/loadingScreen';
import ErrorPage from '@/components/errorPage/errorPage';
import { isMobileSize, getRecipesWindowSize } from '@/utils/windowSize';

const tagColour = [
    '#B2E1E4',
    '#CDB2E4',
    '#E4B4B2'
]
  
type ImageListProps = {
    recipes: Recipe[],
    hasSetImages: Boolean
}

function getTagColour(num: number): string {
    let returnVal = tagColour[0]
    if (num % 3 == 0) {
        returnVal = tagColour[2]
    } else if (num % 2 == 0) {
        returnVal = tagColour[1]
    } 
    return returnVal
}

function convertArrayToButtons(array: string[]) {
    const horizontal = isMobileSize() ? true : false
    return <View className="">
        <FlatList
            data={array}
            className="text-center"
            renderItem={ ({item, index}) =>
                <View className="bg-button p-1 m-1 rounded-lg border"
                    style={{ backgroundColor: getTagColour(index)}}>
                    <Text className="text-center">{ item }</Text>
                </View>
            }
            horizontal={horizontal}
        />  
    </View>
}
  
function ImageList({ recipes, hasSetImages }: ImageListProps) {
    
    if (hasSetImages) {
        return <FlatList
        data={recipes}
        className="w-3/5"
        renderItem={ ({item}) =>
            // Card border
            <View className="flex p-4 bg-recipeCard my-2">
                <View className="flex-col sm:flex-row">
                    <View className="flex-none items-center">
                        <Link href={{ pathname:"/recipe" , params: {id: item.recipeId } }}>
                            <Image 
                                source={URL.createObjectURL(item.mainImage?.imageFileRef)}
                                className=""
                                style={{ width: 150 , height: 150 }}
                            /> 
                        </Link>
                            <View className="pt-2 flex-intial">
                                { convertArrayToButtons(item.tags) }
                            </View> 
                    </View>
                    <View className="flex-1">
                        <View className="flex-auto pl-5 ">
                            <View className="flex-col sm:flex-row justify-between">
                                <Text className="text-xl text-primary font-bold">{ item.name }</Text>
                                <Text className="text-base text-primary font-semibold pt-1">{ item.updatedDate }</Text>
                            </View>
                            <Text className="py-5 text-lg text-primary font-medium">{ item.description }</Text>
                        </View>
                        <View className="flex-auto">
                            <View className="flex items-center">
                                <Link href={{ pathname:"/recipe" , params: {id: item.recipeId } }}>
                                    <View className="bg-header rounded-lg border flex items-center py-2 px-4">
                                        <Text className="text-lg font-semibold">Cook it!</Text>
                                    </View>
                                </Link>
                            </View>
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
    const [backendError, setBackendError] = useState<Boolean>(false);
    const [fireBaseError, setFireBaseError] = useState<Boolean>(false);

    const getRecipes = async () => {
        let finalRecipeList = []
        ThymeAPI.getRecipes().then((recipeList) => {
            for(const [index, value] of recipeList.entries()) {
                firebaseAPI.getRecipeImages(value).then((response) => {
                    finalRecipeList.push(response)
                    if (finalRecipeList.length == recipeList.length) {
                        setRecipes(recipeList)
                        hasSetImages(true)
                    }
                }).catch((error)=> {
                    setFireBaseError(true)
                })
            }
        }).catch((error) => {
            setBackendError(true)
        })
    }

    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <View className="flex-1 items-center py-5 bg-background">
            {
                backendError || fireBaseError ?
                    <ErrorPage errorCode={500}></ErrorPage>
                :
                    <View className="items-center w-[150%] sm:w-[100%]">
                        <Divider divider_text="All Recipes" />
                        {
                            recipes.length > 0 ? 
                            <ImageList recipes={recipes} hasSetImages={setImages} /> :
                            <LoadingScreen />
                        }
                    </View>
            }
        </View>
        
    );

}