class NutritionDailyValues {
    // Values are represented as mg (milligram)
    static fat: number = 75;  //grams
    static satFat: number = 20; // grams
    static transFat: number = -1; // grams
    static carbohydrate: number = 275; // grams
    static fibre: number = 28; // grams
    static sugars: number = 100; // grams
    static cholesterol: number = 300; // milligrams
    static sodium: number = 2300; // milligrams
    static protein: number = -1; // grams
    static vitaminD: number = 20; // micrograms
    static iron: number = 18; // milligrams
    static potassium: number = 3400; // milligrams
    static calcium: number = 1300; // milligrams
}

export default function calculateDV(nutrient: string, value: number): number {
    let convertingValue:number = 1
    switch(nutrient as any) {
        case "Fat": {
            convertingValue = NutritionDailyValues.fat;
            break;
        }
        case "Saturated": {
            convertingValue = NutritionDailyValues.satFat;
            break;
        }
        case "Trans": {
            convertingValue = NutritionDailyValues.transFat;
            break;
        }
        case "Carbohydrate": {
            convertingValue = NutritionDailyValues.carbohydrate;
            break;
        }
        case "Fibre": {
            convertingValue = NutritionDailyValues.fibre;
            break;
        }
        case "Sugars": {
            convertingValue = NutritionDailyValues.sugars;
            break;
        }
        case "Protein": {
            convertingValue = NutritionDailyValues.protein;
            break;
        }
        case "Cholesterol": {
            convertingValue = NutritionDailyValues.cholesterol;
            break;
        }
        case "Sodium": {
            convertingValue = NutritionDailyValues.sodium;
            break;
        }
        case "Vitamin D": {
            convertingValue = NutritionDailyValues.vitaminD;
            break;
        }
        case "Iron": {
            convertingValue = NutritionDailyValues.iron;
            break;
        }
        case "Potassium": {
            convertingValue = NutritionDailyValues.potassium;
            break;
        }
        case "Calcium": {
            convertingValue = NutritionDailyValues.calcium;
            break;
        }
    }
    return Math.round((value/convertingValue) * 100);
}

