import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Recipe } from 'app/model/recipe';
import Divider from '@/components/divider';
import ThymeAPI from '@/API/thymeAPI';
import Hero from '@/components/hero/hero';
import PrevEaten from '@/components/prevEaten/prevEaten';
import ErrorPage from '@/components/errorPage/errorPage';


/* Main  */
export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([new Recipe]);
  const [backendError, setBackendError] = useState<Boolean>(false);

  const loadRecipes = async () => {
      ThymeAPI.getRecipes(undefined, 4).then((response) => {
        setRecipes(response)
      }).catch((error) => {
        setBackendError(true)
      })
  }
  
  useEffect(() => {
      loadRecipes();
  }, []);

  return (
    
    <View>
      {
        backendError == true ?
          <ErrorPage errorCode={ 500 }/>
        :
          <View className='flex-1 items-center py-5 bg-background'>

            <Divider divider_text="Hot and Fresh" />

            <View>
              {/* Hero Element */}
              <View className="items-center">
                <Hero recipe={ recipes[0] }/>
              </View> 

              {/* Latest Recipes */}
              <View className="items-center">
                <PrevEaten recipesProp={ recipes.slice(1, recipes.length) }/>
              </View> 
            </View> 
            
          </View>
      }
    </View>
    
  )
  
}
