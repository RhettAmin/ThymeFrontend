import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import firebaseAPI from 'app/API/firebaseAPI';
import LoadingScreen from '../loadingScreen/loadingScreen';

interface HeroProps {
    recipe: Recipe
}

interface HeroDisplayProps {
    recipe: Recipe | undefined,
    hasSetImages: Boolean
}

function HeroDisplay({recipe, hasSetImages}: HeroDisplayProps){
    if (hasSetImages) {
        return <Link href={{pathname:"/recipe" , params: {id: recipe?.recipeId} }} className="">
            <View className="items-center">
                {
                    recipe && recipe.heroImage ?
                    <Image 
                        source={URL.createObjectURL(recipe.heroImage)}
                        className=""
                        style={{ width: 640, height: 320 }}
                    /> : undefined
                }
                <Text className="pt-2 text-lg text-primary font-bold">{ recipe?.name }</Text>
            </View>
        </Link>
    }
}

const Hero = ({recipe}: HeroProps) => {
    const [heroRecipe, setHeroRecipe] = useState<Recipe>();
    const [setImages, hasSetImages] = useState<Boolean>(false);

    const getRecipeImages = async () => {
        if (!setImages) {
            firebaseAPI.getRecipeImages(recipe).then((response) => {
                setHeroRecipe({...heroRecipe, ...response})
                hasSetImages(true)
            })
        }
    }

    useEffect(() => {
        getRecipeImages()
    }, [recipe])

    return (
        <View className="pb-5 items-center">
            {
                heroRecipe ? 
                    <HeroDisplay recipe={ heroRecipe } hasSetImages = { setImages }/> :
                    <LoadingScreen/>
            }
        </View>
    )
}

export default Hero