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
        setISections(instructionSection)
    },[instructionSection])

    return (
        <FlatList
            data={ iSections }
            keyExtractor={ keyExtractor }
            renderItem={({ item }) => {
                return (
                    <View className="pb-4">
                        <Text className="text-primary text-lg font-bold pb-2">{ item.sectionName }</Text>
                        <View className="flex-row overflow-auto">
                            <View className="flex-initial">
                                {
                                    item.image ?
                                        <Image source={ URL.createObjectURL(item.image)} style={{ width: 200, height: 200 }}/>
                                        : undefined
                                }
                            </View>
                            <View className="flex-1">
                                <FlatList
                                    className=""
                                    data={ item.steps }
                                    keyExtractor={ innerKeyExtractor }
                                    renderItem={({item, index}) => {
                                        return (
                                            <View className="flex flex-row pl-2">
                                                <Text className="text-primary font-semibold">{ index + 1 }</Text>
                                                <Text className="pl-3 text-medium text-primary">{ item }</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                );
            }}
        />
    )
}

export default InstructionDisplay