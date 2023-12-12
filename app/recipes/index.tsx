import { Text, Image, View, FlatList, ImageSourcePropType } from 'react-native';
import Divider from '@/components/divider';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    name: String,
    image_link: ImageSourcePropType,
}
const RecipeItem = ( {name, image_link}: RecipeItemProps ) => (
    <View className='items-center w-48 h-40 m-4'>
        <Image 
            source={image_link}
            className="w-5/6 h-[90%] shadow-lg"
        />
        <Text className='pt-2 text-primary'>{name}</Text>
    </View>
);

type Recipe = {
    id: String,
    name: String,
    description: String,
    tags: String[],
    image: String,
    servings: Number,
    ingredients: Ingredient[],
    instructions: Instruction[],
    nutritionFacts: NutritionFacts
}
type Ingredient = {
    name: String,
    quantity: Number,
    measurement: String
}
type Instruction = {
    step: String
}
type NutritionFacts = {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
}

export default function Recipes() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    var recipeList: Recipe[] = [];

    useEffect( () => {
        getRecipes()
    }, []);

    const getRecipes = async () => {
        axios.get('http://localhost:8080/api/recipes')
        .then(function (response) {
            // handle success
            setRecipes(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    return (
        <View className="flex h-[90vh] items-center bg-background">
            <View className="my-5 items-center">
                {/** All Recipes title and dividers */}
                <View>
                    <Divider divider_text="All Recipes" />
                </View>
                <View className="p-2"> 
                    <FlatList
                        data={recipes}
                        className='p-2'
                        renderItem={ ({item}) => 
                            <RecipeItem 
                                name={item.name} 
                                image_link={RECIPES_DATA[0].image_link} 
                            /> }
                        numColumns={3}
                        horizontal={false}
                    />

                    {/* <FlatList
                        data={RECIPES_DATA}
                        className='space-x-2'
                        renderItem={ ({item}) => 
                            <RecipeItem 
                                name={item.name} 
                                image_link={item.image_link} 
                            /> }
                        numColumns={3}
                        horizontal={false}
                    /> */}
                </View>
            </View>
        </View>
        
    );

}