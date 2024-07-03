import { Recipe, IngredientSection, Ingredient, InstructionSection } from '@/model/recipe'
import { RecipeDTO } from '@/model/recipeDTO'
import { Response } from '../model/response';
import ThymeConfig from 'app/API/config/backend'
import axios from 'axios';

const thymeAxios = axios.create({
    baseURL: ThymeConfig.RECIPE_ENDPOINT,
})

async function getRecipes(id?: String, limit?: number) {
    return new Promise<Recipe[]>((resolve, reject) => {    
        thymeAxios.get('/recipes', {
            params: {
                recipeId: id,
                limit: limit
            }
        })
        .then((response) => {
            // handle success
            let responseObj: Response = response.data
            let recipesDTO: RecipeDTO[] = responseObj.recipe_list
            let recipes: Recipe[] = []

            for (const [index, value] of recipesDTO.entries()) {
                convertRecipeDTOToRecipe(value).then((convertedRecipe) => {
                    recipes.push(convertedRecipe)
                })
                if (index == recipesDTO.length-1) {
                    resolve(recipes)
                }
            }
        })
        .catch(function (error) {
            reject(error)
        });
    })
}

async function convertRecipeDTOToRecipe(recipeDTO: RecipeDTO) {
    return await new Promise<Recipe>((resolve) => {
        const recipe = new Recipe

        recipe.recipeId = recipeDTO.recipe_id
        recipe.name = recipeDTO.name
        recipe.description = recipeDTO.description

        // Metadata
        recipe.metadata.mainImageAltText = recipeDTO.metadata.main_image_alt_text

        // Serving
        recipe.serving.amount = recipeDTO.serving.amount
        recipe.serving.servingSize = recipeDTO.serving.serving_size
        recipe.serving.totalServings = recipeDTO.serving.total_servings

        recipe.tags = recipeDTO.tags
        recipe.timeToPlate = recipeDTO.time_to_plate
        recipe.images = recipeDTO.images
        recipe.createdDate = recipeDTO.created_date
        recipe.updatedDate = recipeDTO.updated_date

        const ingSections: IngredientSection[] = []

        // Ingredient Section
        recipeDTO.ingredient_section.forEach((section) => {
            const iSection = new IngredientSection
            
            iSection.sectionName = section.section_name

            section.ingredients.forEach((ing) => {
                const ingredient = new Ingredient

                ingredient.name = ing.name
                ingredient.measurement = ing.measurement
                ingredient.quantity = ing.quantity
                ingredient.type = ing.type

                iSection.ingredients.push(ingredient)
            })

            ingSections.push(iSection)
        })
        recipe.ingredientSection = ingSections

        // Instruction Section

        const instrSection: InstructionSection[] = []
        
        recipeDTO.instruction_section.forEach((section) => {
            const iSection = new InstructionSection
            
            iSection.sectionName = section.section_name
            iSection.metadata.altText = section.metadata.alt_text

            const steps: string[] = []
            section.steps.forEach((step) => {
                steps.push(step)
            })
            iSection.steps = steps
            instrSection.push(iSection)
        })
        recipe.instructionSection = instrSection

        // NutritionFacts
        recipe.nutritionFacts.calcium = recipeDTO.nutrition_facts.calcium
        recipe.nutritionFacts.calories = recipeDTO.nutrition_facts.calories
        recipe.nutritionFacts.carbohydrate = recipeDTO.nutrition_facts.carbohydrate
        recipe.nutritionFacts.cholesterol = recipeDTO.nutrition_facts.cholesterol
        recipe.nutritionFacts.fat = recipeDTO.nutrition_facts.fat
        recipe.nutritionFacts.fibre = recipeDTO.nutrition_facts.fibre
        recipe.nutritionFacts.iron = recipeDTO.nutrition_facts.iron
        recipe.nutritionFacts.potassium = recipeDTO.nutrition_facts.potassium
        recipe.nutritionFacts.protein = recipeDTO.nutrition_facts.protein
        recipe.nutritionFacts.saturatedFat = recipeDTO.nutrition_facts.saturated_fat
        recipe.nutritionFacts.sodium = recipeDTO.nutrition_facts.sodium
        recipe.nutritionFacts.sugars = recipeDTO.nutrition_facts.sugars
        recipe.nutritionFacts.transFat = recipeDTO.nutrition_facts.trans_fat
        recipe.nutritionFacts.vitaminD = recipeDTO.nutrition_facts.vitamin_d

        resolve(recipe)

    })
}



const ThymeAPI = {
    getRecipes
}

export default ThymeAPI;