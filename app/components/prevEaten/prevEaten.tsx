import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import firebaseAPI from 'app/API/firebaseAPI'
import Divider from '@/components/divider';
import LoadingScreen from '../loadingScreen/loadingScreen';
import { getPrevEatenWindowSize, isMobileSize } from '@/utils/windowSize';

interface PrevProps {
    recipesProp: Recipe[],
}

type ImageListProps = {
  recipes: Recipe[],
  hasSetImages: Boolean,
}

function ImageList({ recipes, hasSetImages }: ImageListProps) {
  const window = getPrevEatenWindowSize()
  if (hasSetImages) {
    return <FlatList
      data={recipes.slice(0,3)}
      className=""
      renderItem={ ({item}) =>
        <View className="mx-2 items-center pb-8 sm:pb-0" style={{ width: window.width + 25 }}>
          <Link href={{ pathname:"/recipe" , params: {id: item.recipeId } }}>
            <Image 
                source={ URL.createObjectURL(item.mainImage?.imageFileRef) }
                className=""
                style={{ width: window.width, height: window.height }}
                accessibilityLabel={ item.metadata.mainImageAltText }
            /> 
          </Link>
          <Text className="pt-2 text-lg text-primary font-bold text-center">{ item.name }</Text>
       </View>
      }
      horizontal={ isMobileSize() ? false : true }
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
          {
            isMobileSize() ?
            <Divider divider_text="Previously Eaten" width={75} height={22.5} /> :
            <Divider divider_text="Previously Eaten" />  
          }
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