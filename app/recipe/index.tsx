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
    console.log(mainImage)
    return <View className="items-center">
        {
            mainImage ? 
            <Image
                source={ URL.createObjectURL(mainImage) } 
                style={{ width: 250, height: 250 }}
            /> :
            undefined
        }
    </View>
}

{/* ========================================== Main View Export =============================================================================== */}
export default function RecipePage() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe>();
    
    const loadRecipe = async () => {
        ThymeAPI.getRecipes(id).then((response) => {
            firebaseAPI.getRecipeImages(response[0]).then((recipeUpdated) => {
                setRecipe({...recipe, ...recipeUpdated})
                console.log(recipeUpdated)
            })
        })
    }
    
    useEffect(() => {
        loadRecipe();
    }, [id]);

    return (
        recipe ?
        <View className="flex-grow items-center bg-background">
            <View id="recipeCard" className="flex py-8 sm:flex-col md:flex-row sm:w-[90%] md:w-[90%] lg:w-[60%] my-10 divide-x bg-recipeCard">
                {/* Image and Ingredients  */}
                <View className="flex px-8">
                    {  
                        recipe.mainImage?
                            <DisplayMainImage mainImage={ recipe.mainImage } />
                            : undefined
                    }
                    
                    {/* Ingredients */}
                    <View className="flex">
                        <Text className="uppercase text-xl font-bold text-primary pt-5 pb-4">Ingredients</Text>
                        <IngredientBox ingredientSection={ recipe.ingredientSection } serving={ recipe.serving } />
                    </View>
                </View>


                {/* Main Info */}
                <View className="sm:flex-col flex-[2_2_0%] px-8">
                    <View>
                        <Text className="uppercase text-xl font-bold text-primary">{ recipe.name }</Text>
                        <View className="divide-y-2 divide-dashed divide-emerald-800">
                            <View className="pt-2 mb-4">
                                <View className="flex-row">
                                    <Text className="font-bold text-primary">Time: </Text><Text className="text-black">{ convertMinutesToHourNotation(recipe.timeToPlate) }</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="font-bold text-primary">Servings: </Text><Text className="text-black">{ recipe.serving.totalServings }</Text>
                                </View>
                            </View>
                            {/* Instructions */}
                            <View>
                                <Text className="uppercase text-xl font-bold text-primary py-5">Instructions</Text>
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
        </View> :
        <View className="flex text-center"> 
            <Text>Loading...</Text>
        </View>
    );
}
