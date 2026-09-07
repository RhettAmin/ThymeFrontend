class Recipe {
    recipeId: string = ''
    name: string = ''
    description: string = ''
    totalServings: number = 1
    servingSize: number = 1
    servingForm: string = ''
    tags: string[] = []
    totalTime: number = 0
    prepTime: number = 0
    cookTime: number = 0
    heroImage: string = ""
    mainImage: string = ""
    images: string = ''
    createdDate: string = ''
    updatedDate: string = ''
    ingredientSection: IngredientSection[] = []
    instructionSection: InstructionSection[] = []
    nutritionFacts: NutritionFacts = new NutritionFacts()
    ingredientTotals: string[] = []
    notes: Note[] = []
    isActive: boolean = true
}

class Note {
    id: number = 0
    content: string = ''
    placement: string = ''
    displayName: string = ''
}

class IngredientSection {
    sectionName: string = ''
    ingredients: Ingredient[] = []
}

class Ingredient {
    name: string = ''
    quantity: number = 0
    measurement: string = ''
    conversionType: string = ''
    gramWeight:  number = 0
    type: number = 0
}

class InstructionSection {
    sectionName: string = ''
    image: string = ""
    metadata: InstructionImageMetadata = new InstructionImageMetadata
    steps: string[] = []
}

class InstructionImageMetadata {
    altText: string = ''
}

class NutritionFacts {
    calories: number = 0
    fat: number = 0
    saturatedFat: number = 0
    transFat: number = 0
    carbohydrate: number = 0
    fibre: number = 0
    sugars: number = 0
    protein: number = 0
    cholesterol: number = 0
    sodium: number = 0
    vitaminD: number = 0
    iron: number = 0
    potassium: number = 0
    calcium: number = 0
}

class ImageRef {
    imageFileRef: any = null
    imageName: string = ""
    imageURLPreview: string = ""
}

class MainImageRef extends ImageRef {}

export { Recipe, IngredientSection, 
        Ingredient, InstructionSection, NutritionFacts, 
        MainImageRef, Note }