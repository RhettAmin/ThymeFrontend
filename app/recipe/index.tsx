import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Recipe, Metadata } from 'app/model/recipe';
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
    mainImage: Blob | undefined,
    metadata: Metadata
}

function convertMinutesToHourNotation(timeInMinutes: number) {
    if (timeInMinutes < 60) {
        return `00:${timeInMinutes}`
    }
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes % 60 == 0 ? '00' : timeInMinutes % 60 
    return `${hours}:${minutes}`
}

function DisplayMainImage({mainImage, metadata}: ImageProps) {
    return <View className="items-center">
        {
            mainImage ? 
            <Image
                source={ URL.createObjectURL(mainImage) } 
                style={{ width: 300, height: 300 }}
                accessibilityLabel={ metadata.mainImageAltText }
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
                    <View className="w-[90%] sm:w-3/4 bg-background">
                    {
                        recipe ?
                
                        <View id="recipeCard" className="py-5 sm:px-4 sm:flex-col md:flex-row sm:divide-x bg-recipeCard">
                            {/* Image and Ingredients  */}
                            <View className="flex py-4 sm:px-4 items-center sm:items-start">
                                {  
                                    recipe.mainImage ?
                                        <DisplayMainImage mainImage={ recipe.mainImage.imageFileRef } metadata={ recipe.metadata }/>
                                        : undefined
                                }

                                { isMobileSize() ? 
                                    <View>
                                        <Text className="uppercase text-3xl font-bold text-primary text-center">{ recipe.name }</Text> 

                                        <View className="items-center pt-4">
                                            <Divider divider_text='' width={ 100 } height={ 30 }/>
                                        </View>
                                    </View>
                                    : '' 
                                }
                                <View className="flex-1 flex-row sm:flex-none pt-4">
                                    <Text className="font-bold text-primary">Time To Dining Table: </Text>
                                    <Text className="font-semibold text-primary">{ convertMinutesToHourNotation(recipe.timeToPlate) }</Text>
                                </View>
                                
                                {/* Ingredients */}
                                <View className="flex w-3/4 sm:w-full">
                                    <IngredientBox ingredientSection={ recipe.ingredientSection } serving={ recipe.serving } />
                                </View>
                            </View>


                            {/* Main Info */}
                            <View className="sm:flex-col flex-[2_2_0%] px-8">
                                <View>
                                    { isMobileSize() ? '' : <Text className="uppercase text-3xl font-bold text-primary">{ recipe.name }</Text> }

                                    <View className="items-center pt-4">
                                        <Divider divider_text='' width={ 100 } height={ 30 }/>
                                    </View>

                                    <View className="divide-y-2 divide-dashed divide-emerald-800">
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
