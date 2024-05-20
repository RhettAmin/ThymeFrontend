import { View, Text, Image } from 'react-native';

type DividerProps = {
    divider_text: string,
}

export default function Divider({divider_text}: DividerProps) {
    return (
        <View className='flex flex-row space-x-2 px-4 pb-6'>
          <Image 
              source={ require('@/assets/thymeleaf_divider.png') } 
              style={{ width:130, height:40 }}
              className='scale-x-[-1] mt-4'
            />
            <Text className="text-2xl font-bold p-4 text-primary">{divider_text}</Text>
            <Image 
              source={ require('@/assets/thymeleaf_divider.png') } 
              style={{ width:130, height:40 }}
              className='mt-4'
            />
        </View>
    );
}