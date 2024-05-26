import {InstructionSection } from 'app/model/recipe';
import { Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';

interface InstructionBoxProps {
    instructionSection: InstructionSection[]
}

const InstructionDisplay = ({instructionSection}: InstructionBoxProps) => {
    const [iSections, setISections] = useState<InstructionSection[]>([])
    const keyExtractor = (item: InstructionSection, idx: any) => `${Object.keys(item)}-${idx}`
    const innerKeyExtractor = (item: string, idx: any) => `${Object.keys(item)}-${idx}`

    useEffect(() => {
        setISections([...iSections, ...instructionSection])
        console.log(iSections)
    },[instructionSection])

    return (
        console.log(iSections),
        <FlatList
            data={ iSections }
            keyExtractor={ keyExtractor }
            renderItem={({ item }) => {
                return (
                    <View className="pb-4">
                        <Text className="text-primary font-bold">{ item.sectionName }</Text>
                        <View>
                            {
                                item.image ?
                                    <Image source={ URL.createObjectURL(item.image)} style={{ width: 250, height: 250 }}/>
                                    : undefined
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
            }}
        />
    )
}

export default InstructionDisplay