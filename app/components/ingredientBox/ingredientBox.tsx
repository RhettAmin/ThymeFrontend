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
                    let convertedValue: ConvertedMeasurement
                    conversionUtil.convertToImperial(ingredient).then((response) => {
                        convertedValue = response

                        ingre.name = ingredient.name
                        ingre.quantity = convertedValue.quantity
                        ingre.measurement = convertedValue.measurement
                        iSection.ingredients.push(ingre)
                    })                    
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
            console.log(ingredientSectionsMetric)
            console.log(ingredientSectionsImperial)
        })
    }

    useEffect(() => {
        setServing(serving)
        setTables()
    },[ingredientSection])

    return (
        <View className="-mx-5 sm:mx-0">
            <View>
                <MeasurementSwitch/>
            </View>
            <FlatList
                data={ isMetric ? ingredientSectionsMetric : ingredientSectionsImperial }
                keyExtractor={ keyExtractor }
                className="text"
                renderItem={({ item }) => {
                    return (
                        <View className="pb-4">
                            <Text className="text-primary font-bold text-lg sm:text-base sm:text-left">{ item.sectionName }</Text>
                            <FlatList
                                data={ item.ingredients }
                                keyExtractor={ innerKeyExtractor }
                                renderItem={({ item }) => {
                                    return (
                                        <Text className="text-primary text-lg sm:text-base"> 
                                            { ` \u2022 ${ item.quantity.toString() } ${ item.measurement } ${ item.name } ` }
                                        </Text>
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