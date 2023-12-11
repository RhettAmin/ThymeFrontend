import { Text, Image, View, FlatList, ImageSourcePropType } from 'react-native';
import Divider from '@/components/divider';

const RECIPES_DATA = [
    {
        name: "Shrimp Pad Thai",
        image_link: require('@/assets/pad_thai.jpg')
    },
    {
        name: "Cheesy Gnocchi",
        image_link: require('@/assets/Gnocchi.jpg')
    },
    {
        name: "Pork Katsu and Slaw",
        image_link: require('@/assets/Katsu.jpg')
    },
    {
        name: "Beef Brisket Ramen",
        image_link: require('@/assets/Ramen.jpg')
    },
    {
        name: "Banana Bread",
        image_link: require('@/assets/banana_bread.jpg')
    },
    {
        name: "Butter Chicken Burger",
        image_link: require('@/assets/Burger.jpg')
    },
    {
        name: "Beef Brisket Ramen",
        image_link: require('@/assets/Ramen.jpg')
    },
    {
        name: "Butter Chicken Burger",
        image_link: require('@/assets/Burger.jpg')
    } ,
    {
        name: "Butter Chicken Burger",
        image_link: require('@/assets/Burger.jpg')
    }  
];

type RecipeItemProps = {
    name: string,
    image_link: ImageSourcePropType,
  }
  const RecipeItem = ( {name, image_link}: RecipeItemProps ) => (
    <View className='items-center justify-center box-content mb-4 w-52 h-40'>
      <Image 
        source={image_link}
        className="w-5/6 h-[90%]"
      />
      <Text className=' text-primary'>{name}</Text>
    </View>
  );

export default function Recipes() {
    return (
        <View className="flex-1 items-center bg-background">
            <View className="flex-1 my-5 items-center bg-background">
                {/** All Recipes title and dividers */}
                <View>
                    <Divider divider_text="All Recipes" />
                </View>
                <View className="flex-1"> 
                    <FlatList
                        data={RECIPES_DATA}
                        className='space-x-2'
                        renderItem={ ({item}) => 
                            <RecipeItem 
                                name={item.name} 
                                image_link={item.image_link} 
                            /> }
                        numColumns={3}
                        horizontal={false}
                    />
                </View>
            </View>
        </View>
    );
}