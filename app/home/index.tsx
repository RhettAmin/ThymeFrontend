import { View, Text, FlatList, StyleSheet, ImageSourcePropType, Pressable, Dimensions } from 'react-native';
import Divider from '@/components/divider';
import { Link, useRouter } from "expo-router";
import getRecipeList from '@/API/thymeHTTP';
import { Image } from 'expo-image';

var {width, height} = Dimensions.get('window');
const router = useRouter();

const LATEST_RECIPE_DATA = [
  {
      name: 'Shrimp Pad Thai',
      image: require('@/assets/pad_thai.jpg'),
  },
  {
      name: 'Spicy Burger',
      image: require('@/assets/Burger.jpg'),
  },
  {
      name: 'Beef Brisket Ramen',
      image: require('@/assets/Ramen.jpg'),
  }
];


type RecipeItemProps = {
  name: String,
  image_link: ImageSourcePropType,
  id: String
}

const routeToRecipe = (id: String) => {
  router.push({ pathname: "/recipe", params: { id }})
}


const RecipeItem = ( {name, image_link, id}: RecipeItemProps ) => (
  <View className="mx-2">
  <Pressable className="items-center w-48 h-40" onPress={ () => routeToRecipe(id) }>
      <Image 
          source={image_link}
          className="w-5/6 h-[90%] shadow-lg"
      />
      <Text className="pt-2 text-primary font-bold">{name}</Text>
  </Pressable>
</View>
);

/* Main  */
export default function Home() {

  let recipes = getRecipeList()

  // Creates a client
  // const storage = new Storage();

  // console.log(storage)

  // async function generateV4ReadSignedUrl() {
  //   // These options will allow temporary read access to the file
  //   const options = {
  //     version: 'v4',
  //     action: 'read',
  //     expires: Date.now() + 5 * 60 * 1000, // 15 minutes
  //   };
  
  //   // Get a v4 signed URL for reading the file
  //   const [url] = await storage
  //     .bucket("thyme_image_bucket")
  //     .file("apple_cake.jpg")
  //     .getSignedUrl(options);
  
  //   console.log('Generated GET signed URL:');
  //   console.log(url);
  //   console.log('You can use this URL with any user agent, for example:');
  //   console.log(`curl '${url}'`);
  // }
  
  //generateV4ReadSignedUrl().catch( error => console.log(error));

  return (
    <View className='items-center pb-5 bg-background'>

      {/* Hero Element */}
      <View className="basis-2/3 sm:w-[75%] md:w-[65%] lg:w-[50%] pt-5 items-center">
        <Divider divider_text="Hot and Fresh" />
        <Link href="/recipe" className="w-[100%]">
          <View className="w-[100%] items-center">
              <Image 
                source={ require('@/assets/Katsu.jpg') } 
                style={{ width: '100%', height: 350 }}
              />
              <Text className="uppercase py-2 font-bold text-primary">Chicken Katsu with Red cabbage Slaw</Text>
          </View>
        </Link>
      </View>

      {/* Latest Recipes */}
      <View className="pb-10 items-center ">
        <Divider divider_text="Previously Eaten" />
        <View className='items-center'>
          <FlatList
            data={recipes}
            className=""
            renderItem={ ({item}) => 
              <RecipeItem 
                name={item.name} 
                image_link={LATEST_RECIPE_DATA[1].image} 
                id={item.id}
              /> }
            horizontal={true}
          />
        </View>
      </View>

    </View>
  )
}
