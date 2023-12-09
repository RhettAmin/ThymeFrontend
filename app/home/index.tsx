import { View, Text, FlatList, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native';
import Divider from 'components/divider';
import { Link, useRouter } from "expo-router";
import { Image } from 'expo-image';
var {width, height} = Dimensions.get('window');
const router = useRouter();

const LATEST_RECIPE_DATA = [
  {
      name: 'Shrimp Pad Thai',
      image: require('assets/pad_thai.jpg'),
  },
  {
      name: 'Spicy Burger',
      image: require('assets/Burger.jpg'),
  },
  {
      name: 'Beef Brisket Ramen',
      image: require("assets/Ramen.jpg"),
  }
];


type LatestRecipeItemProps = {
  name: string,
  image: ImageSourcePropType,
}
const LatestRecipeItem = ( {name, image}: LatestRecipeItemProps ) => (
  <View className='items-center w-[100%] px-5'>
    <Image 
      source={image}
      style={{width:'100%', height:100}}
    />
    <Text className='uppercase text-primary'>{name}</Text>
  </View>
);

/* Main  */
export default function Home() {
  return (
    <View className='flex-1 items-center pb-5 bg-background '>

      {/* Hero Element */}
      <View className="basis-2/3 sm:w-[75%] md:w-[65%] lg:w-[50%] pt-5 items-center">
        <Divider divider_text="Hot and Fresh" />
        <Link href="/recipe" className="w-[100%]">
          <View className="w-[100%] items-center">
              <Image 
                source={ require('assets/Katsu.jpg') } 
                style={{ width: '100%', height: 350 }}
              />
              <Text className="uppercase py-2 font-bold text-primary">Chicken Katsu with Red cabbage Slaw</Text>
          </View>
        </Link>
      </View>

      {/* Latest Recipes */}
      <View className="basis-1/3 py-5 items-center ">
        <Divider divider_text="Previously Eaten" />
        <View className='flex items-center'>
          <FlatList
            data={LATEST_RECIPE_DATA}
            className="space-x-64"
            renderItem={ ({item}) => 
              <LatestRecipeItem 
                name={item.name} 
                image={item.image} 
              /> }
            horizontal={true}
          />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  heroImage: {
    flex:1,
    width: width * 0.9,
    height: height * 0.4
  }
})
