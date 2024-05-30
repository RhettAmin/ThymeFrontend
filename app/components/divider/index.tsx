import { View, Text, Image } from 'react-native';

type DividerProps = {
    divider_text: string,
    width?: number,
    height?: number
}

export default function Divider({divider_text, width, height}: DividerProps) {

    let dWidth = width ? width : 108
    let dHeight = height ? height : 36

    return (
        <View className='flex-row pb-5'>
          <Image 
            source={ require('@/assets/divider.webp') } 
            style={{ width:dWidth, height:dHeight }}
            className='scale-x-[-1] mt-4'
          />
          <Text className="text-2xl font-bold p-4 text-primary">{divider_text}</Text>
          <Image 
            source={ require('@/assets/divider.webp') } 
            style={{ width:dWidth, height:dHeight }}
            className='mt-4'
          />
        </View>
    );
}