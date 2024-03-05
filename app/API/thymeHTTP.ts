import { useState, useEffect } from 'react';
import { Recipe } from '@/model/recipe'
import axios from 'axios';


var RECIPE_ENDPOINT = 'http://localhost:8080/api/recipes'


const getRecipeList = (id?: String, name?:String): Recipe[] => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        axios.get(RECIPE_ENDPOINT, {
            params: {
                id: id,
                name: name
            }
        })
        .then(async (response) => {
            // handle success
            console.log(response.data);
            setRecipes(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }, [])

    return recipes
}

export default getRecipeList;