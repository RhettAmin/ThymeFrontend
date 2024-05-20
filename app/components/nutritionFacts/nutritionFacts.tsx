import { Serving, NutritionFacts } from 'app/model/recipe';
import { Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import calculateDV from './dailyValues'

interface NutritionFactsProps {
    facts: NutritionFacts
    servingProp: Serving
}

const NutritionFactsComponent = ({facts, servingProp}: NutritionFactsProps) => {
    const [nutriFactsPerServing, setNutriFactsPerServing] = useState<NutritionFacts>(new NutritionFacts);
    const [serving, setServing] = useState<Serving>(new Serving);
    const [mainNutritionValues, setMainNutritionValues] = useState<string[]>([
        "Fat", "Saturated", "Trans", "Carbohydrate", "Fibre", 
        "Sugars", "Protein", "Cholesterol", "Sodium"
    ]);
    const [topVitamins, setTopVitamins] = useState<string[]>(["Vitamin D", "Iron", "Potassium", "Calcium"]);

    function getValue(value: string): number {
        switch(value as string) {
            case "Calories": {
                return nutriFactsPerServing.calories;
            }
            case "Fat": {
                return nutriFactsPerServing.fat;
            }
            case "Saturated": {
                return nutriFactsPerServing.saturatedFat;
            }
            case "Trans": {
                return nutriFactsPerServing.transFat;
            }
            case "Carbohydrate": {
                return nutriFactsPerServing.carbohydrate;
            }
            case "Fibre": {
                return nutriFactsPerServing.fibre;
            }
            case "Sugars": {
                return nutriFactsPerServing.sugars;
            }
            case "Protein": {
                return nutriFactsPerServing.protein;
            }
            case "Cholesterol": {
                return nutriFactsPerServing.cholesterol;
            }
            case "Sodium": {
                return nutriFactsPerServing.sodium;
            }
            case "Vitamin D": {
                return nutriFactsPerServing.vitaminD;
            }
            case "Iron": {
                return nutriFactsPerServing.iron;
            }
            case "Potassium": {
                return nutriFactsPerServing.potassium;
            }
            case "Calcium": {
                return nutriFactsPerServing.calcium;
            }
        }
        return 1
    }
    
    function setNutritionFactsPerServing(servingObj: Serving) {
        let nutritionFacts = new NutritionFacts
        nutritionFacts.calories = facts.calories / servingObj.totalServings
        nutritionFacts.fat = facts.fat / servingObj.totalServings
        nutritionFacts.saturatedFat = facts.saturatedFat / servingObj.totalServings
        nutritionFacts.transFat = facts.transFat / servingObj.totalServings
        nutritionFacts.carbohydrate = facts.carbohydrate / servingObj.totalServings
        nutritionFacts.fibre = facts.fibre / servingObj.totalServings
        nutritionFacts.sugars = facts.sugars / servingObj.totalServings
        nutritionFacts.protein = facts.protein / servingObj.totalServings
        nutritionFacts.cholesterol = facts.cholesterol / servingObj.totalServings
        nutritionFacts.sodium = facts.sodium / servingObj.totalServings
        nutritionFacts.vitaminD = facts.vitaminD / servingObj.totalServings
        nutritionFacts.iron = facts.iron / servingObj.totalServings
        nutritionFacts.potassium = facts.potassium / servingObj.totalServings
        nutritionFacts.calcium = facts.calcium / servingObj.totalServings
        setNutriFactsPerServing({...nutriFactsPerServing,...nutritionFacts})
    }

    useEffect(() => {
        setServing({...serving, ...servingProp})
        setNutritionFactsPerServing(servingProp)
    }, [servingProp])

    return (

        <View className="flex items-center">
            <View className="border border-black box-border-1 w-[125%]">
                {/* Title */}
                <View className="flex flex-col">
                    <Text className="font-bold text-[30px] flex justify-center">Nutrition Facts</Text>
                    <View className="bg-black h-[1px]"/>
                    <Text className="text-m flex justify-end pr-1">Serving size { serving.servingSize + " " + serving.amount }</Text>
                </View>
                <View className="bg-black h-[10px]"/>
                {/* Calories and Fats */}

                <View className="flex flex-row divide-x-2 divide-black">
                    {/* ================= Col1 =============== */}
                    <View className="px-1 flex-1">
                        <View className="pt-7">
                            <Text className="font-bold text-2xl">Calories</Text>
                        </View>

                        <View className="bg-black h-[5px]" /> 

                        <View className="divide-y divide-black"> 
                            <View className="h-6" />
                            <FlatList
                                data={ mainNutritionValues }
                                className={"divide-y divide-black"}
                                renderItem={({ item }) => {
                                    return (
                                        item=='Saturated' || item=='Trans'||
                                        item=='Fibre' || item=='Sugars' ?
                                            <Text className="pl-2 capitalize">
                                                { item }
                                            </Text>
                                        :
                                            <Text className="font-semibold capitalize">
                                                { item }
                                            </Text>
                                    )
                                }}
                            />
                        </View>

                        <View className="bg-black h-[10px]"/>

                        <View className="">
                            <FlatList
                                data={ topVitamins }
                                renderItem={({ item }) => {
                                    return (
                                        <Text className="font-semibold">
                                            { item }
                                        </Text>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    {/* ================= Col 2 =============== */}
                    <View className="px-1 flex-1">
                        <View className="flex flex-col items-end"> 
                            <Text className="text-lg font-bold justify-end">Per Serving</Text>
                            <Text className="text-2xl font-bold">{ Math.round(nutriFactsPerServing.calories) }</Text>  
                        </View>

                        <View className="bg-black h-[5px]"/>

                        <View className="divide-y divide-black"> 
                            <View className="h-6">
                                <Text className="flex justify-end font-semibold">% DV*</Text>
                            </View>

                            <FlatList
                                data={ mainNutritionValues }
                                renderItem={({ item }) => {
                                    return (
                                        <View className="flex flex-row justify-between"> 
                                            <View>
                                                <Text>
                                                    { Math.round(getValue(item)) }
                                                    { item=='Cholesterol' || item=='Sodium' ? "mg" : "g" }
                                                </Text>
                                            </View>
                                            <View>
                                                <Text> 
                                                    { 
                                                        item=='Trans' || item=='Protein' || item=='Cholesterol' || item=='Sugars' ?
                                                        '' : ` ${calculateDV(item, getValue(item))} % `                                                        
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View className="bg-black h-[10px]"/>
                        
                        <View className="divide-y divide-black"> 
                            <FlatList
                                data={ topVitamins }
                                renderItem={({ item }) => {
                                    return (
                                        <View className="flex flex-row justify-between"> 
                                            <View className="flex"> 
                                                <Text> 
                                                    { getValue(item).toFixed(1) } 
                                                    { item=='Vitamin D' ? ' mcg' : ' mg' }
                                                </Text>
                                            </View>
                                            <View className="flex pl-5">
                                                <Text >
                                                    { calculateDV(item, getValue(item)) }
                                                    { '%' }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    {/* ================= Col 3 ===============
                    <View className="px-1 flex-1">
                        <View className="flex flex-col items-end"> 
                            <Text className="text-xl font-bold">Total</Text>
                            <Text className="text-2xl font-bold">{ nutriFacts.calories }</Text>
                        </View>

                        <View className="bg-black h-[5px]"/>

                        <View className="divide-y divide-black"> 
                            <View className="h-6">
                                <Text className="flex justify-end font-semibold">% DV*</Text>
                            </View>


                            <FlatList
                                data={ mainNutritionValues }
                                renderItem={({ item }) => {
                                    return (
                                        <View className="flex flex-row justify-between"> 
                                            <View className="flex">
                                                <Text>
                                                    { getValue(nutriFacts, item) }
                                                    { item=='Cholesterol' || item=='Sodium' ? ' mg' : ' g' }
                                                </Text>
                                            </View>
                                            <View className="flex pl-5">
                                                <Text >
                                                { 
                                                    item=='Trans' || item=='Protein' || item=='Cholesterol' || item=='Sugars' ?
                                                        calculateDV(item, getValue(nutriFacts, item)) :
                                                        ''
                                                }
                                                {
                                                    item=='Trans' || item=='Protein' || item=='Cholesterol' || item=='Sugars' ? 
                                                        '%' : '' 
                                                }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View className="bg-black h-[10px]"/>

                        <View className="divide-y divide-black"> 
                            <FlatList
                                data={ topVitamins }
                                renderItem={({ item }) => {
                                    return (
                                        <View className="flex flex-row justify-between"> 
                                            <View className="flex"> 
                                                <Text> 
                                                    { getValue(nutriFacts, item).toFixed(1) }
                                                    { item=='Vitamin D' ? ' mcg' : ' mg' }
                                                </Text>
                                            </View>
                                            <View className="flex pl-5">
                                                <Text >
                                                    { calculateDV(item, getValue(nutriFacts, item)) }
                                                    { '%' }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View> */}
                </View>

                <View className="bg-black h-[5px]"/>

                <View className="pl-1 text-xs flex flex-col"> 
                    <Text>* 5% or less is <strong>a little</strong>, 15% or more is <strong>a lot</strong></Text>
                </View>
            </View>
        </View>
    )
}

export default NutritionFactsComponent