import { Text, View, FlatList, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ThymeAPI from '@/API/thymeAPI';
import firebaseAPI from 'app/API/firebaseAPI'
import NutritionFactsComponent from '@/components/nutritionFacts/nutritionFacts';
import { Recipe, IngredientSection, Ingredient, InstructionSection, NutritionFacts } from 'app/model/recipe';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import Divider from '@/components/divider';
import IngredientBox from '@/components/ingredientBox/ingredientBox'


{/* ========================================== Props =========================================================================================== */}
interface PageProps {
    recipe: Recipe
}

interface IngredientSectionProps {
    sectionArray: IngredientSection[]
}

interface InstructionSectionProps {
    sectionArray: InstructionSection[]
}

interface NutritionFactsProps {
    facts: NutritionFacts
}


{/* ========================================== Display Functions =============================================================================== */}

function DisplayIngredients({sectionArray}: IngredientSectionProps) {
    const keyExtractor = (item: IngredientSection, idx: any) => `${Object.keys(item)}-${idx}`
    const innerKeyExtractor = (item: Ingredient, idx: any) => `${Object.keys(item)}-${idx}`

    return <FlatList
        data={ sectionArray }
        keyExtractor={ keyExtractor }
        renderItem={({ item }) => {
            return (
                <View className="pl-2 pb-4">
                    <Text className="text-primary font-bold">{ item.sectionName }</Text>
                    <FlatList
                        data={ item.ingredients }
                        keyExtractor={ innerKeyExtractor }
                        renderItem={({ item }) => {
                            return (
                                <li className="pl-3"> 
                                    { ` \u2022
                                        ${ item.name }  
                                        ${ item.quantity.toString() }
                                        ${ item.measurement }
                                    `}
                                </li>
                            );
                        }}
                    />
                </View>
            );
        }}
    />
}

function DisplayInstructions({sectionArray}: InstructionSectionProps) {
    const keyExtractor = (item: InstructionSection, idx: any) => `${Object.keys(item)}-${idx}`
    const innerKeyExtractor = (item: string, idx: any) => `${Object.keys(item)}-${idx}`
    let counter = 0
    return <FlatList
        data={ sectionArray }
        keyExtractor={ keyExtractor }
        renderItem={({ item }) => {
            return (
                <View className="pb-4">
                    <Text className="text-primary font-bold">{ item.sectionName }</Text>
                    <View>
                        {
                            item.image ?
                                <Image source={ URL.createObjectURL(item.image!!)} style={{ width: 250, height: 250 }}/>
                                : ''
                        }
                    </View>
                    
                    <FlatList
                        data={ item.steps }
                        keyExtractor={ innerKeyExtractor }
                        renderItem={({item, index}) => {
                            return (
                                <View className="flex flex-row pl-2">
                                    <Text>{ index + 1 }</Text>
                                    <Text className="pl-3 text-medium">{ item }</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            );
            counter++
        }}
    />
}

function convertMinutesToHourNotation(timeInMinutes: number) {
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes % 60 == 0 ? '00' : timeInMinutes % 60 
    return `${hours}:${minutes}`
}


function PageContent({recipe} : PageProps) {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    if (recipe.recipeId != '') {
        return <View id="recipeCard" className="flex py-8 sm:flex-col md:flex-row sm:w-[90%] md:w-[90%] lg:w-[60%] my-10 divide-x bg-recipeCard">
            {/* Image and Ingredients  */}
            <View className="flex px-8">
                <View className="items-center">
                    <Image
                        source={ URL.createObjectURL(recipe.mainImage!!) } 
                        style={{ width: 250, height: 250 }}
                    />
                </View>
                {/* Ingredients */}
                <View className="flex">
                    <Text className="uppercase text-lg font-bold text-primary pt-5 pb-4">Ingredients</Text>
                    
                    <IngredientBox ingredientSection={ recipe.ingredientSection }/>
                    {/* <DisplayIngredients sectionArray={recipe.ingredientSection}/>                     */}
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
                            <Text className="uppercase text-lg font-bold text-primary py-5">Instructions</Text>
                            <DisplayInstructions sectionArray={ recipe.instructionSection }/>
                        </View>
                    </View>
                </View>
                <View className="flex items-center">
                    <Divider divider_text=''/>
                    <NutritionFactsComponent facts={recipe.nutritionFacts} servingProp={recipe.serving}/>
                </View>
            </View>
        </View>
    }
}

{/* ========================================== Main View Export =============================================================================== */}
export default function RecipePage() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe>(new Recipe);
    
    const loadRecipe = async () => {
        ThymeAPI.getRecipes(id).then((response) => {
            firebaseAPI.getRecipeImages(response[0]).then((recipeUpdated) => {
                setRecipe({...recipe, ...recipeUpdated})
            })
        })
    }
    
    useEffect(() => {
        loadRecipe();
    }, [id]);

    return (
        <View className="flex-grow items-center bg-background">
            <PageContent recipe={recipe} />
        </View>
    );
}
