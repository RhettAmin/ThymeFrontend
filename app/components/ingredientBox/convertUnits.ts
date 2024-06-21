import { Ingredient } from "@/model/recipe"

class conversion {
    static gramsToOz: number = 0.035336
    static mlToOz: number = 0.033818
    static ozToLbs: number = 0.0625
    static ozToTsp: number = 0.166667
    static ozToTbsp: number = 0.521588
    static ozToCups: number = 8.11537
}

class ConvertedMeasurement {
    measurement: string = ''
    quantity: number = 0
}

async function convertToImperial(ingredient: Ingredient) {
    return await new Promise<ConvertedMeasurement>((resolve) => {
        /** conversionTypes
         *  0 - none, no conversion - These are things like cloves, or 1 whole thing like a shallot
         *  1 - weight (oz, lbs) - mostly for Meats or fish
         *  2 - volume (tsp, tbsp, cups) - liquids, powders, etc
         **/
        let conversionType = ingredient.type;
        const convertedMeasure = new ConvertedMeasurement
        let ounceValue = 0
        // No conversion needed
        if (conversionType == 0) {
            convertedMeasure.measurement = ingredient.measurement
            convertedMeasure.quantity = ingredient.quantity
            resolve(convertedMeasure)
        } else if (conversionType == 1) {
            ounceValue = convertToOunces(ingredient.quantity, ingredient.measurement)
            convertedMeasure.measurement = "oz"
            convertedMeasure.quantity = Math.ceil((ounceValue) * 4) / 4
            if (ounceValue > 8) {
                convertedMeasure.measurement = "lbs"
                convertedMeasure.quantity = Math.ceil((ounceValue * conversion.ozToLbs))
            }
            resolve(convertedMeasure)
        } else {
            ounceValue = convertToOunces(ingredient.quantity, ingredient.measurement)
            convertedMeasure.measurement = "tsp"
            convertedMeasure.quantity = Math.ceil((ounceValue / conversion.ozToTsp) * 4) / 4

            // convert to tbsp (>= 0.5oz & < 2oz)
            if (0.5 < ounceValue && ounceValue < 2) {
                let val = Math.ceil((ounceValue / conversion.ozToTbsp) * 4) / 4
                convertedMeasure.quantity =  val
                convertedMeasure.measurement = "tbsp"
            }
            // anything more is cups (>= 2oz)
            if (ounceValue > 2) {
                let val = Math.ceil((ounceValue / conversion.ozToCups) * 4) / 4
                convertedMeasure.quantity = val == 0 ? 1 : val
                convertedMeasure.measurement = convertedMeasure.quantity > 1 ? "cups" : "cup"
            }
            resolve(convertedMeasure)
        }
    })
}

function convertIngredientAmounts() {
    
}

function convertToOunces(value: number, measurement: string): number {
    // console.log(`${value} -- ${measurement}`)
    // console.log(value * conversion.gramsToOz)
    return measurement == "ml" ? 
        value * conversion.mlToOz : 
        value * conversion.gramsToOz
}

const conversionUtil = {
    convertToImperial
}

export default conversionUtil