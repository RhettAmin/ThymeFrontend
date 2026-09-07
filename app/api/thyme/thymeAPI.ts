import axios from "axios";
import { ThymeConfig } from "./thymeConfig";
import { Ingredient, IngredientSection, InstructionSection, Note, Recipe } from "@/app/models/recipe";
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

/**
 * getRecipe
 * Fetches a SINGLE recipe with its full detail. The list endpoint (`getRecipes`)
 * returns summaries only — no ingredient sections, instruction sections or notes.
 */
async function getRecipe(id: string): Promise<Recipe> {
    const response = await thymeAxios.get(`${ThymeConfig.recipesEndpoint}/${id}`)
    return convertDetailToRecipe(response.data?.data)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const bySortOrder = (a: any, b: any) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0)

function convertDetailToRecipe(d: any): Recipe {
    const recipe = new Recipe()
    if (!d) return recipe

    recipe.recipeId      = d.recipe_id
    recipe.name          = d.name ?? ''
    recipe.description   = d.description ?? ''
    recipe.isActive      = d.is_active ?? true

    recipe.heroImage     = d.hero_image_link ?? ''
    recipe.mainImage     = d.main_image_link ?? ''

    recipe.servingForm   = d.serving_form ?? ''
    recipe.servingSize   = d.serving_size ?? 1
    recipe.totalServings = d.total_servings ?? 1

    recipe.tags          = d.tags ?? []
    recipe.totalTime     = d.total_time ?? 0
    recipe.prepTime      = d.prep_time ?? 0
    recipe.cookTime      = d.cook_time ?? 0
    recipe.createdDate   = d.created_date ?? ''
    recipe.updatedDate   = d.updated_date ?? ''

    // Nutrition is FLAT on the detail payload, not nested under nutrition_facts
    const n = recipe.nutritionFacts
    n.calories     = d.calories     ?? 0
    n.fat          = d.fat          ?? 0
    n.saturatedFat = d.saturated_fat?? 0
    n.transFat     = d.trans_fat    ?? 0
    n.carbohydrate = d.carbohydrate ?? 0
    n.fibre        = d.fibre        ?? 0
    n.sugars       = d.sugars       ?? 0
    n.protein      = d.protein      ?? 0
    n.cholesterol  = d.cholesterol  ?? 0
    n.sodium       = d.sodium       ?? 0
    n.vitaminD     = d.vitamin_d    ?? 0
    n.iron         = d.iron         ?? 0
    n.potassium    = d.potassium    ?? 0
    n.calcium      = d.calcium      ?? 0

    // Note the PLURAL keys — these differ from the list endpoint's DTO
    recipe.ingredientSection = [...(d.ingredient_sections ?? [])]
        .sort(bySortOrder)
        .map((section: any) => {
            const iSection = new IngredientSection()
            iSection.sectionName = section.section_name ?? ''
            iSection.ingredients = [...(section.ingredients ?? [])]
                .sort(bySortOrder)
                .map((ing: any) => {
                    console.log("ingredient: ", ing)
                    const ingredient = new Ingredient()
                    ingredient.name             = ing.name ?? ''
                    ingredient.quantity         = ing.quantity ?? 0
                    ingredient.measurement      = ing.measurement ?? ''
                    ingredient.type             = ing.type ?? 0
                    ingredient.conversionType   = ing.conversion_type ?? 'OTHER'
                    ingredient.gramWeight       = ing.gram_weight ?? 0
                    return ingredient
                })
            return iSection
        })

    recipe.instructionSection = [...(d.instruction_sections ?? [])]
        .sort(bySortOrder)
        .map((section: any) => {
            const iSection = new InstructionSection()
            iSection.sectionName      = section.section_name ?? ''
            iSection.image            = section.image_link ?? ''
            iSection.metadata.altText = section.alt_text ?? ''
            // steps arrive as objects, not strings
            iSection.steps = [...(section.steps ?? [])]
                .sort(bySortOrder)
                .map((step: any) => step.step_text ?? '')
            return iSection
        })

    recipe.notes = (d.notes ?? []).map((note: any) => {
        const n = new Note()
        n.id          = note.id ?? 0
        n.content     = note.content ?? ''
        n.placement   = note.placement ?? ''
        n.displayName = note.display_name ?? ''
        return n
    })

    return recipe
}

const ThymeAPI = {
    getRecipes,
    getRecipe
}

export default ThymeAPI;