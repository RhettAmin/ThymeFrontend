import { Recipe, IngredientSection, Ingredient, InstructionSection, NutritionFacts } from 'app/model/recipe';
import { Text, View, FlatList, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import conversionUtil from './convertUnits';

interface IngredientBoxProps {
    ingredientSection: IngredientSection[]
}

class ConvertedMeasurement {
    measurement: string = ''
    quantity: number = 0
}

const IngredientBox = ({ingredientSection}: IngredientBoxProps) => {
    const [ingredientSectionsMetric, setIngredientSectionsMetric] = useState<IngredientSection[]>([])
    const [ingredientSectionsImperial, setIngredientSectionsImperial] = useState<IngredientSection[]>([])
    const keyExtractor = (item: IngredientSection, idx: any) => `${Object.keys(item)}-${idx}`
    const innerKeyExtractor = (item: Ingredient, idx: any) => `${Object.keys(item)}-${idx}`
    const [isMetric, setIsMetric] = useState(true);
    const toggleSwitch = () => setIsMetric(previousState => !previousState);


    async function convertMetricToImperial(ingredientSectionToChange: IngredientSection[]) {
        return await new Promise<IngredientSection[]>((resolve, reject)=> {

            let ingSection: IngredientSection[] = []

            for(const [index, section] of ingredientSectionToChange.entries()) { 
                let iSection: IngredientSection = new IngredientSection
                iSection.sectionName = section.sectionName
                for(const [index, ingredient] of section.ingredients.entries()) { 
                    let ingre = new Ingredient
                    let convertedValue: ConvertedMeasurement = conversionUtil.convertToImperial(ingredient.quantity, ingredient.measurement)
                    ingre.name = ingredient.name
                    ingre.quantity = convertedValue.quantity
                    ingre.measurement = convertedValue.measurement
                    iSection.ingredients.push(ingre)
                }
                ingSection.push(iSection)
                if (index == ingredientSectionToChange.length-1) {
                    resolve(ingSection)
                }
            }
        })
    }

    function setTables() {
        convertMetricToImperial(ingredientSection).then((response) => {
            setIngredientSectionsMetric(ingredientSection)
            setIngredientSectionsImperial(response)
        })
    }

    useEffect(() => {
        setTables()
    },[ingredientSection])

    return (
        <View>
            <View className="flex items-center justify-center pb-4">
                <View className="relative flex flex-row space-x-2">
                    <Text>Imperial</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isMetric ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isMetric}
                    />
                    <Text>Metric</Text>
                </View>
                <Text>{
                    !isMetric ? 'NOTE: conversions are approximate' : ''
                }</Text>
            </View>
            <FlatList
                data={ isMetric ? ingredientSectionsMetric : ingredientSectionsImperial }
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
        </View>
    )
}

export default IngredientBox