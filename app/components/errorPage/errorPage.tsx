import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';

type ErrorPageProps = {
    errorCode: number
}

export default function ErrorPage ({errorCode}: ErrorPageProps) {

    useEffect(() => {
        console.log(errorCode)
    }, [])

    return (
        <View className='flex-1 items-center py-5 bg-background'>
            <Text className="text-4xl text-primary font-bold">{errorCode}</Text>
            <Text className="text-3xl text-primary font-bold">Oh no! It looks like something went wrong</Text>
            <Image
                className=""
                source={ require('@/assets/Burner_Error.gif') } 
                style={{ width: 400, height: 350 }}
            />
        </View>
    )
}