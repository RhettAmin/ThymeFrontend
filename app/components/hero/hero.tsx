import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from "expo-router";
import { Recipe } from 'app/model/recipe';
import { Image } from 'expo-image';
import firebaseAPI from 'app/API/firebaseAPI'

const router = useRouter();

const routeToRecipe = (id: String) => {
    router.push({ pathname: "/recipe", params: { id }})
}

interface HeroProps {
    recipe: Recipe
}
interface ImageItemProps {
    locationToGrabFrom: Blob | MediaSource
}

function ImageItem({locationToGrabFrom} : ImageItemProps) {
    if (locationToGrabFrom) {
        return <Image 
            source={URL.createObjectURL(locationToGrabFrom)}
            className=""
            style={{ width: 600, height: 300 }}
        /> 
    }
}

const Hero = ({recipe}: HeroProps) => {
    const [heroRecipe, setHeroRecipe] = useState<Recipe>();

    const getRecipeImages = async () => {
        firebaseAPI.getRecipeImages(recipe).then((response) => {
            setHeroRecipe({...heroRecipe, ...response})
        })
    }

    useEffect(() => {
        getRecipeImages()
    }, [recipe])

    return (
        <View className="pb-5 items-center">
            <Link href={{pathname:"/recipe" , params: {id: recipe.recipeId} }} className="">
                <View className="items-center">
                    <ImageItem 
                        locationToGrabFrom={heroRecipe?.mainImage!!}
                    />
                    <Text className="pt-2 text-lg text-primary font-bold">{ heroRecipe ? heroRecipe!.name : 'loading name' }</Text>
                </View>
            </Link>
        </View>
    )
}

export default Hero