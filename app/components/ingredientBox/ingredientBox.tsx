import { Serving, IngredientSection, Ingredient } from 'app/model/recipe';
import { Text, View, FlatList, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import conversionUtil from './convertUnits';



interface IngredientBoxProps {
    ingredientSection: IngredientSection[],
    serving: Serving
}

class ConvertedMeasurement {
    measurement: string = ''
    quantity: number = 0
}

class switchColours {
    static trackColour1 = '#e7f3dc'
    static trackColour2 = '#e7f3dc'
    static thumbColour1 = '#1a1a1a'
    static thumbColour2 = '#d17e7b'
}
const IngredientBox = ({ingredientSection}: IngredientBoxProps) => {
    const [ingredientSectionsMetric, setIngredientSectionsMetric] = useState<IngredientSection[]>([])
    const [ingredientSectionsImperial, setIngredientSectionsImperial] = useState<IngredientSection[]>([])
    const [serving, setServing] = useState<Serving>()
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

    function MeasurementSwitch() {
        return <View className="flex items-center justify-center pb-4">
            <View className="relative flex flex-row space-x-2">
                <Text className="text-primary font-semibold">Imperial</Text>
                <Switch
                    trackColor={{ false: switchColours.trackColour1, true: switchColours.trackColour2 }}
                    thumbColor={ isMetric ? switchColours.thumbColour1 : switchColours.thumbColour2 }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={ toggleSwitch }
                    value={ isMetric }
                />
                <Text className="text-primary font-semibold">Metric</Text>
            </View>
            <Text>{ !isMetric ? 'NOTE: conversions are approximate' : '' }</Text>
        </View>
    }

    function setTables() {
        convertMetricToImperial(ingredientSection).then((response) => {
            setIngredientSectionsMetric(ingredientSection)
            setIngredientSectionsImperial(response)
        })
    }

    useEffect(() => {
        setTables()
        setServing(serving)
    },[ingredientSection])

    return (
        <View>
            <View>
                <MeasurementSwitch/>
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
                                        <li className="pl-3 text-primary"> 
                                            { ` \u2022
                                                ${ item.quantity.toString() }
                                                ${ item.measurement }
                                                ${ item.name }  
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