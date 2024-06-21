import { Serving, IngredientSection, Ingredient } from 'app/model/recipe';
import { Text, View, FlatList, Switch } from 'react-native';
import { useState, useEffect, ChangeEvent } from 'react';
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

const IngredientBox = ({ ingredientSection, serving }: IngredientBoxProps) => {
    const [ingredientSectionsMetric, setIngredientSectionsMetric] = useState<IngredientSection[]>([])
    const [ingredientSectionsMetricBase, setIngredientSectionsMetricBase] = useState<IngredientSection[]>([])
    const [ingredientSectionsImperial, setIngredientSectionsImperial] = useState<IngredientSection[]>([])
    const [servingObj, setServingObj] = useState<Serving>(new Serving)
    const [baseServingSize, setBaseServingSize] = useState<number>(0)
    const keyExtractor = (item: IngredientSection, idx: any) => `${Object.keys(item)}-${idx}`
    const innerKeyExtractor = (item: Ingredient, idx: any) => `${Object.keys(item)}-${idx}`
    const [isMetric, setIsMetric] = useState(true);
    const toggleSwitch = () => setIsMetric(previousState => !previousState);

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

    function setViewTables(ingredientSectionObj: IngredientSection[]) {
        convertMetricToImperial(ingredientSectionObj).then((response) => {
            setIngredientSectionsMetric(ingredientSectionObj)
            setIngredientSectionsImperial(response)
        })
    }

    function setBaseMetricTable(ingredientSectionObj: IngredientSection[]) {
        setIngredientSectionsMetricBase(ingredientSectionObj)
    }

    function changeServing(event: any) {

        // Change Serving Object
        const newServing = JSON.parse(JSON.stringify(servingObj))
        newServing.totalServings = event.target.value
        setServingObj({...newServing})

        // Update ingredients Table Metric values
        const newIngredientsMetric = JSON.parse(JSON.stringify(ingredientSectionsMetricBase))
        const ratio = newServing.totalServings / baseServingSize

        for(const [index, section] of newIngredientsMetric.entries()) { 
            for(const [index, ingredient] of section.ingredients.entries()) { 
                ingredient.quantity = Math.ceil((ingredient.quantity * ratio) * 4) / 4
            }
        }
        setViewTables(newIngredientsMetric)
    }

    useEffect(() => {
        setServingObj(serving)
        setBaseServingSize(serving.totalServings)
        setViewTables(ingredientSection)
        setBaseMetricTable(ingredientSection)
    },[ingredientSection, serving])

    return (
        <View className="-mx-5 sm:mx-0">
            <Text className="uppercase text-2xl sm:text-xl font-bold text-primary pt-5 pb-4 ">Ingredients</Text>
            <View className="flex-row pb-5">
                <Text className="flex-1 font-bold text-primary">Total Servings</Text>
                <View className="flex-1 -mt-1 -ml-20 sm:-ml-2">
                    <input type="number" className="px-2 !mx-2" style={{ borderRadius: "10px", width: "50%" }} value={ servingObj?.totalServings } onChange={ e => changeServing(e) }/>
                </View>
            </View>
            
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