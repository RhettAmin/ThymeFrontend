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
                        <View className="flex-col sm:flex-row">
                            <View className="items-center py-2">
                                {
                                    item.image ?
                                        <Image source={ URL.createObjectURL(item.image.imageFileRef)} 
                                            style={{ width: 200, height: 200 }}
                                            accessibilityLabel={ item.metadata.altText }    
                                        />
                                        : undefined
                                }
                            </View>
                            <View className="flex-auto">
                                <FlatList
                                    className=""
                                    data={ item.steps }
                                    keyExtractor={ innerKeyExtractor }
                                    renderItem={({item, index}) => {
                                        return (
                                            <View className="flex flex-row sm:pl-2">
                                                <Text className="text-primary font-semibold text-lg sm:text-base">{ index + 1 }</Text>
                                                <Text className="pl-3 text-medium text-primary text-lg sm:text-base">{ item }</Text>
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