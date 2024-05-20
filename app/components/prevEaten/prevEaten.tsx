import { View, Text, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import firebaseAPI from 'app/API/firebaseAPI'
import Divider from '@/components/divider';

const router = useRouter();

interface PrevProps {
    recipesProp: Recipe[]
}

type ImageListProps = {
  recipes: Recipe[],
  hasSetImages: Boolean
}

const routeToRecipe = (id: String) => {
  router.push({ pathname: "/recipe", params: { id }})
}

function ImageList({ recipes, hasSetImages }: ImageListProps){
  if (hasSetImages) {
    console.log(recipes)
    return <FlatList
      data={recipes.slice(0,3)}
      className=""
      renderItem={ ({item}) =>
        <View className="mx-2">
          <Pressable className={"items-center "} onPress={ () => routeToRecipe(item.recipeId) }>
                <Image 
                    source={URL.createObjectURL(item.mainImage!!)}
                    className=""
                    style={{ width: 300, height: 300 }}
                /> 
              <Text className="pt-2 text-lg text-primary font-bold">{ item.name }</Text>
          </Pressable>
       </View>
      }
      horizontal={true}
    />  
  }
}

const PrevEaten = ({recipesProp}: PrevProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [setImages, hasSetImages] = useState<Boolean>(false);

    const getRecipeImages = async () => {
        let finalRecipeList = []
        if (recipesProp) {
          if (!setImages) {
            for (const[index, value] of recipesProp.entries()) {
                firebaseAPI.getRecipeImages(value).then((response) => {
                    finalRecipeList.push(response)
                    if (index == recipesProp.length-1) {
                      setRecipes([...recipes, ...finalRecipeList])
                      hasSetImages(true)
                    }
                })
            } 
          }
        }
    }

    useEffect(() => {
        setRecipes([...recipes, ...recipesProp])
        getRecipeImages()
    }, [recipesProp])

    return (
        <View className="items-center">
          <Divider divider_text="Previously Eaten" />
          <View className="items-center">
            <ImageList recipes={recipes} hasSetImages={setImages} />
          </View>
        </View> 
    )
}

export default PrevEaten