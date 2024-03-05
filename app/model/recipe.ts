import { Double } from "react-native/Libraries/Types/CodegenTypes"

type Recipe = {
    id: String,
    name: String,
    description: String,
    tags: String[],
    image: String,
    servings: Number,
    timeToPlate: Double,
    ingredientSection: IngredientSection[],
    instructionSection: InstructionSection[],
    nutritionFacts: NutritionFacts
}
type IngredientSection = {
    sectionName: String | undefined,
    ingredients: Ingredient[]
}
type Ingredient = {
    name: String,
    quantity: Double,
    measurement: String | undefined
}

type InstructionSection = {
    sectionName: String,
    steps: String[]
}

type NutritionFacts = {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
}

export { Recipe, IngredientSection, Ingredient, InstructionSection, NutritionFacts }