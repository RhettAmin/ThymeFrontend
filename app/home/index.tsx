import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { Recipe } from 'app/model/recipe';
import Divider from '@/components/divider';
import ThymeAPI from '@/API/thymeAPI';
import Hero from '@/components/hero/hero';
import PrevEaten from '@/components/prevEaten/prevEaten';

/* Main  */
export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([new Recipe]);

  const loadRecipes = async () => {
      ThymeAPI.getRecipes(undefined, 4).then((response) => {
        setRecipes(response)
      })
  }
  
  useEffect(() => {
      loadRecipes();
  }, []);

  return (
      <View className='items-center pt-5 pb-5 bg-[#e7f3dc]'>

        <Divider divider_text="Hot and Fresh" />
        
        {/* Hero Element */}
        
       <View className="items-center">
          <Hero recipe={ recipes[0] }/>
        </View> 

        {/* Latest Recipes */}
        <View className="items-center">
           <PrevEaten recipesProp={ recipes.slice(1, recipes.length) }/> 
        </View> 
      </View>
    )
  
}
