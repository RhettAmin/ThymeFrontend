import { Text, Image, View, FlatList, ImageSourcePropType, Pressable } from 'react-native';
import Divider from '@/components/divider';
import { useRouter } from 'expo-router';
import getRecipeList from '@/API/thymeHTTP';
import { useState, useEffect } from 'react';
import { Recipe } from '@/model/recipe'

const router = useRouter();

const RECIPES_DATA = 
    {
        name: "Shrimp Pad Thai",
        image_link: require('@/assets/pad_thai.jpg')
    }


type RecipeItemProps = {
    name: String,
    image_link: ImageSourcePropType,
    id: String
}

const routeToRecipe = (id: String) => {
    router.push({ pathname: "/recipe", params: { id }})
}

const RecipeItem = ( {name, image_link, id}: RecipeItemProps ) => (
    <View className="m-4">
        <Pressable className="items-center w-48 h-40" onPress={ () => routeToRecipe(id) }>
            <Image 
                source={image_link}
                className="w-5/6 h-[90%] shadow-lg"
            />
            <Text className="pt-2 text-primary">{name}</Text>
        </Pressable>
    </View>
);


export default function Recipes() {
    let recipes = getRecipeList()

    return (
        <View className="flex-grow items-center bg-background">
            <View className="my-5 items-center">
                {/** All Recipes title and dividers */}
                <View>
                    <Divider divider_text="All Recipes" />
                </View>
                <View className="p-2"> 
                    <FlatList
                        data={recipes}
                        className='p-2'
                        keyExtractor={(index) => index.toString()}
                        renderItem={ ({item}) => 
                            <RecipeItem 
                                name = {item.name} 
                                image_link = {RECIPES_DATA.image_link} 
                                id = {item.id}
                            /> }
                        numColumns={3}
                        horizontal={false}
                    />
                </View>
            </View>
        </View>
        
    );

}