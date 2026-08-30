import axios from "axios";
import { ThymeConfig } from "./thymeConfig";
import { Ingredient, IngredientSection, InstructionSection, Recipe } from "@/app/models/recipe";
import { RecipeDTO } from "@/app/models/recipeDTO";
import { Response } from "@/app/models/response";

const thymeAxios = axios.create({
    baseURL: ThymeConfig.recipesBaseURL,
})

async function getRecipes(id?: string, limit?: number) {
    return new Promise<Recipe[]>((resolve, reject) => {    
        const recipeEndpoint = ThymeConfig.recipesEndpoint
        thymeAxios.get(recipeEndpoint, {
            params: {
                recipeId: id,
                limit: limit
            }
        })
        .then((response) => {

            console.log('Response received: ', response)
            // handle success
            const responseObj: Response = response.data
            const recipesDTO: RecipeDTO[] = responseObj.recipes
            const recipes: Recipe[] = []

            recipesDTO.map((recipeDTO) => {
                convertRecipeDTOToRecipe(recipeDTO)
                .then((convertedRecipe) => {
                    recipes.push(convertedRecipe)
                }).catch((error) => {
                    console.error("[ERROR]: ", error)
                }).finally(() => {
                    resolve(recipes)
                })
            })
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

        // Images
        recipe.heroImage        = recipeDTO.hero_image_link
        recipe.mainImage        = recipeDTO.main_image_link

        // Serving
        recipe.servingForm      = recipeDTO.serving_form
        recipe.servingSize      = recipeDTO.serving_size
        recipe.totalServings    = recipeDTO.total_servings

        recipe.tags             = recipeDTO.tags
        recipe.totalTime        = recipeDTO.total_time
        recipe.cookTime         = recipeDTO.prep_time
        recipe.prepTime         = recipeDTO.cook_time
        recipe.images           = recipeDTO.images
        recipe.createdDate      = recipeDTO.created_date
        recipe.updatedDate      = recipeDTO.updated_date

        recipe.ingredientTotals = recipeDTO.ingredient_totals
        const ingSections: IngredientSection[] = []

        // Ingredient Section
        if (recipeDTO.ingredient_section) {
            recipeDTO.ingredient_section.forEach((section) => {
                const iSection = new IngredientSection()
                
                iSection.sectionName = section.section_name

                section.ingredients.forEach((ing) => {
                    const ingredient = new Ingredient()

                    ingredient.name = ing.name
                    ingredient.measurement = ing.measurement
                    ingredient.quantity = ing.quantity
                    ingredient.type = ing.type

                    iSection.ingredients.push(ingredient)
                })

                ingSections.push(iSection)
            })
            recipe.ingredientSection = ingSections
        }
        

        // Instruction Section
        if (recipeDTO.instruction_section) {
            const instrSection: InstructionSection[] = []
            
            recipeDTO.instruction_section.forEach((section) => {
                const iSection = new InstructionSection()
                
                iSection.sectionName = section.section_name
                iSection.metadata.altText = section.metadata.alt_text
                iSection.image = section.image_link

                const steps: string[] = []
                section.steps.forEach((step) => {
                    steps.push(step)
                })
                iSection.steps = steps
                instrSection.push(iSection)
            })
            recipe.instructionSection = instrSection
        }

        // NutritionFacts
        if (recipeDTO.nutrition_facts) {
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
        }

        resolve(recipe)

    })
}

const ThymeAPI = {
    getRecipes
}

export default ThymeAPI;