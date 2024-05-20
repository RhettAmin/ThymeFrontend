class conversion {
    static gramsToOz: number = 0.035336
    static mlToOz: number = 0.033818
    static ozToTsp: number = 0.166667
    static ozToTbsp: number = 0.521588
    static ozToCups: number = 8.11537
}

class ConvertedMeasurement {
    measurement: string = ''
    quantity: number = 0
}

function convertToImperial(quantity: number, measurement: string) {

    // First convert to ounces
    let ounceValue = measurement == "ml" ? 
        quantity * conversion.mlToOz : 
        quantity * conversion.gramsToOz

    // convert to tsp (< 0.5oz)
    const convertedMeasure = new ConvertedMeasurement
    if (ounceValue < 0.5) {

        let val = Math.ceil((ounceValue / conversion.ozToTsp) * 4) / 4
        convertedMeasure.quantity = val == 0 ? 1 : val
        convertedMeasure.measurement = "tsp"
    }
    // convert to tbsp (>= 0.5oz & < 2oz)
    else if (0.5 <= ounceValue && ounceValue < 2) {
        let val = Math.ceil((ounceValue / conversion.ozToTbsp) * 4) / 4
        convertedMeasure.quantity = val == 0 ? 1 : val
        convertedMeasure.measurement = "tbsp"
    }
    // anything more is cups (>= 2oz)
    else {
        let val = Math.ceil((ounceValue / conversion.ozToCups) * 4) / 4
        convertedMeasure.quantity = val == 0 ? 1 : val
        convertedMeasure.measurement = convertedMeasure.quantity > 1 ? "cups" : "cup"
    }
    
    return convertedMeasure
}

const conversionUtil = {
    convertToImperial
}

export default conversionUtil