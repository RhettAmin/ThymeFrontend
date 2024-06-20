import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Recipe } from 'app/model/recipe';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import ThymeAPI from '@/API/thymeAPI';
import firebaseAPI from 'app/API/firebaseAPI'
import NutritionFactsComponent from '@/components/nutritionFacts/nutritionFacts';
import Divider from '@/components/divider';
import IngredientBox from '@/components/ingredientBox/ingredientBox'
import InstructionDisplay from '@/components/instructionDisplay/instructionDisplay'
import LoadingScreen from '@/components/loadingScreen/loadingScreen';
import ErrorPage from '@/components/errorPage/errorPage';
import { isMobileSize } from '@/utils/windowSize';


interface ImageProps {
    mainImage: Blob | undefined
}

function convertMinutesToHourNotation(timeInMinutes: number) {
    if (timeInMinutes < 60) {
        return `00:${timeInMinutes}`
    }
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes % 60 == 0 ? '00' : timeInMinutes % 60 
    return `${hours}:${minutes}`
}

function DisplayMainImage({mainImage}: ImageProps) {
    return <View className="items-center">
        {
            mainImage ? 
            <Image
                source={ URL.createObjectURL(mainImage) } 
                style={{ width: 300, height: 300 }}
            /> :
            undefined
        }
    </View>
}

{/* ========================================== Main View Export =============================================================================== */}
export default function RecipePage() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe>();
    const [serverError, setServerError] = useState<Boolean>(false);
    const [firebaseError, setFirebaseError] = useState<Boolean>(false);
    
    const loadRecipe = async () => {
        ThymeAPI.getRecipes(id).then((response) => {
            firebaseAPI.getRecipeImages(response[0]).then((recipeUpdated) => {
                setRecipe({...recipe, ...recipeUpdated})
            }).catch((error) => {
                setFirebaseError(true)
            })
        }).catch((error)=>{
            console.error(error)
            setServerError(true)
        })
    }
    
    useEffect(() => {
        loadRecipe();
    }, [id]);

    return (
        <View className="my-5 items-center">
            {
                serverError ?
                    <ErrorPage errorCode={404}/>
                :
                firebaseError ? 
                    <ErrorPage errorCode={500} />
                :
                    <View className="w-[90%] sm:w-3/4">
                    {
                        recipe ?
                
                        <View id="recipeCard" className="py-5 sm:px-4 sm:flex-col md:flex-row sm:divide-x bg-recipeCard">
                            {/* Image and Ingredients  */}
                            <View className="flex py-4 sm:px-4 items-center sm:items-start">
                                {  
                                    recipe.mainImage ?
                                        <DisplayMainImage mainImage={ recipe.mainImage.imageFileRef } />
                                        : undefined
                                }

                                { isMobileSize() ? <Text className="uppercase text-3xl font-bold text-primary text-center">{ recipe.name }</Text> : '' }

                                {/* Ingredients */}
                                <View className="flex w-3/4 sm:w-[100svh]">
                                    <Text className="uppercase text-2xl sm:text-xl font-bold text-primary pt-5 pb-4 text-center sm:text-left">Ingredients</Text>
                                    <IngredientBox ingredientSection={ recipe.ingredientSection } serving={ recipe.serving } />
                                </View>
                            </View>


                            {/* Main Info */}
                            <View className="sm:flex-col flex-[2_2_0%] px-8">
                                <View>
                                    { isMobileSize() ? '' : <Text className="uppercase text-xl font-bold text-primary">{ recipe.name }</Text> }
                                    <View className="divide-y-2 divide-dashed divide-emerald-800">
                                        <View className="flex pt-2 mb-4 flex-row sm:flex-col">
                                            <View className="flex-1 flex-row sm:flex-none">
                                                <Text className="font-bold text-primary">Time: </Text><Text className="text-black">{ convertMinutesToHourNotation(recipe.timeToPlate) }</Text>
                                            </View>
                                            <View className="flex-1 flex-row sm:flex-none">
                                                <Text className="font-bold text-primary">Servings: </Text><Text className="text-black">{ recipe.serving.totalServings }</Text>
                                            </View>
                                        </View>
                                        {/* Instructions */}
                                        <View>
                                            <Text className="uppercase text-2xl sm:text-xl font-bold text-primary py-5 text-center sm:text-left">Instructions</Text>
                                            <InstructionDisplay instructionSection={ recipe.instructionSection } />
                                        </View>
                                    </View>
                                </View>
                                <View className="flex items-center">
                                    <Divider divider_text=''/>
                                    <NutritionFactsComponent facts={recipe.nutritionFacts} servingProp={recipe.serving}/>
                                </View>
                            </View>
                        </View>
                
                        :

                        <View className="flex h-screen justify-center items-center">
                            <LoadingScreen />
                        </View>
                    }
                    </View>
            }
        </View>
    );
}
