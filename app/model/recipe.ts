class Recipe {
    recipeId: string = '';
    name: string = '';
    description: string = '';
    serving: Serving = new Serving;
    tags: string[] = [];
    timeToPlate: number = 0;
    heroImage: MainImageRef | undefined = undefined;
    mainImage: MainImageRef | undefined = undefined;
    metadata: Metadata = new Metadata;
    images: string = '';
    createdDate: string = '';
    updatedDate: string = '';
    ingredientSection: IngredientSection[] = [];
    instructionSection: InstructionSection[] = [];
    nutritionFacts: NutritionFacts = new NutritionFacts;
}

class Metadata {
    mainImageAltText: string = ''
}

class Serving {
    totalServings: number = 1;
    servingSize: number = 1;
    amount: string = '';
}

class IngredientSection {
    sectionName: string = '';
    ingredients: Ingredient[] = [];
}

class Ingredient {
    name: string = '';
    quantity: number = 0;
    measurement: string = '';
    type: number = 0;
}

class InstructionSection {
    sectionName: string = '';
    image: InstructionImageRef | undefined = undefined;
    metadata: InstructionImageMetadata = new InstructionImageMetadata;
    steps: string[] = [];
}

class InstructionImageMetadata {
    altText: string = ''
}

class NutritionFacts {
    calories: number = 0;
    fat: number = 0;
    saturatedFat: number = 0;
    transFat: number = 0;
    carbohydrate: number = 0;
    fibre: number = 0;
    sugars: number = 0;
    protein: number = 0;
    cholesterol: number = 0;
    sodium: number = 0;
    vitaminD: number = 0;
    iron: number = 0;
    potassium: number = 0;
    calcium: number = 0;
}

class ImageRef {
    imageFileRef: any = null
    imageName: string = ""
    imageURLPreview: string = ""
}

class MainImageRef extends ImageRef {}

class InstructionImageRef extends ImageRef {
    instructionSection: string = ""
    index = 0
}

export { Recipe, Serving, Metadata, IngredientSection, Ingredient, InstructionSection, NutritionFacts, MainImageRef, InstructionImageRef }