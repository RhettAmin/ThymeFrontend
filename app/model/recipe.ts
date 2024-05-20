class Recipe {
    recipeId: string = '';
    name: string = '';
    description: string = '';
    serving: Serving = new Serving;
    tags: string[] = [];
    timeToPlate: number = 0;
    mainImage: Blob | undefined = undefined;
    images: string = '';
    createdDate: string = '';
    updatedDate: string = '';
    ingredientSection: IngredientSection[] = [];
    instructionSection: InstructionSection[] = [];
    nutritionFacts: NutritionFacts = new NutritionFacts;
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
}

class InstructionSection {
    sectionName: string = '';
    image: Blob | undefined = undefined;
    steps: string[] = [];
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

    // getValue(value: string): number {
    //     switch(value as any) {
    //         case "Calories": {
    //             return this.calories;
    //         }
    //         case "Fat": {
    //             return this.fat;
    //         }
    //         case "Saturated": {
    //             return this.saturatedFat;
    //         }
    //         case "Trans": {
    //             return this.transFat;
    //         }
    //         case "Carbohydrate": {
    //             return this.carbohydrate;
    //         }
    //         case "Fibre": {
    //             return this.fibre;
    //         }
    //         case "Sugars": {
    //             return this.sugars;
    //         }
    //         case "Protein": {
    //             return this.protein;
    //         }
    //         case "Cholesterol": {
    //             return this.cholesterol;
    //         }
    //         case "Sodium": {
    //             return this.sodium;
    //         }
    //         case "Vitamin D": {
    //             return this.vitaminD;
    //         }
    //         case "Iron": {
    //             return this.iron;
    //         }
    //         case "Potassium": {
    //             return this.potassium;
    //         }
    //         case "Calcium": {
    //             return this.calcium;
    //         }
    //     }
    //     return -1
    // }
}

export { Recipe, Serving, IngredientSection, Ingredient, InstructionSection, NutritionFacts }