import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, Link } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import firebaseAPI from 'app/API/firebaseAPI'
import Divider from '@/components/divider';
import LoadingScreen from '../loadingScreen/loadingScreen';

const router = useRouter();

interface PrevProps {
    recipesProp: Recipe[]
}

type ImageListProps = {
  recipes: Recipe[],
  hasSetImages: Boolean
}

function ImageList({ recipes, hasSetImages }: ImageListProps){
  if (hasSetImages) {
    return <FlatList
      data={recipes.slice(0,3)}
      className=""
      renderItem={ ({item}) =>
        <View className="mx-2 items-center w-[300px]">
          <Link href={{ pathname:"/recipe" , params: {id: item.recipeId } }}>
            <Image 
                source={URL.createObjectURL(item.mainImage?.imageFileRef)}
                className=""
                style={{ width: 300, height: 300 }}
            /> 
          </Link>
          <Text className="pt-2 text-lg text-primary font-bold text-center">{ item.name }</Text>
       </View>
      }
      horizontal={true}
    />  
  }
}

const PrevEaten = ({recipesProp}: PrevProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [setImages, hasSetImages] = useState<Boolean>(false);

    const getRecipeImages = async (prop: Recipe[]) => {
        let finalRecipeList = []
        if (recipes && !setImages) {
          for (const[index, value] of prop.entries()) {
            firebaseAPI.getRecipeImages(value).then((response) => {
                finalRecipeList.push(response)
                if (finalRecipeList.length == prop.length) {
                  setRecipes(finalRecipeList)
                  hasSetImages(true)
                }
            })
          }
        }
      }
    

    useEffect(() => {
      getRecipeImages(recipesProp)
    }, [recipesProp])

    return (
        <View className="items-center mb-6">
          <Divider divider_text="Previously Eaten" />
          <View className="items-center">
            {
              recipes.length != 0 ? 
                <ImageList recipes={recipes} hasSetImages={setImages} /> :
                <LoadingScreen />
            }
          </View>
        </View> 
    )
}

export default PrevEaten