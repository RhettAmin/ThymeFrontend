import JSZip from 'jszip'
import { Recipe, MainImageRef, InstructionImageRef } from '@/model/recipe'

let zipper = new JSZip()

async function getRecipeImages(recipe: Recipe) {
    return await new Promise<Recipe> ( (resolve, reject) => {
        getImagefromFirebase(recipe).then((recipeResponse) => {
            resolve(recipeResponse)
        })
    })
}


async function getImagefromFirebase(recipe: Recipe) {
    return await new Promise<Recipe> ( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        try {
            xhr.onload = () => {
                const blob = xhr.response
                if (blob.size > 4000) {
                    zipper.loadAsync(blob).then( (zip) => {
                        
                        let zipContent = Object.keys(zip.files).filter(file => file.includes(recipe.recipeId))
                        let instructionImagesSize = zipContent.length-1

                        for (const [index, value] of zipContent.entries()) {
                            let file = value
                            
                            zip.files[file].async("base64").then(function (base64File) {
                                if (base64File != '') { 
                                    const imageFile = convertbase64toFile(base64File, file)
                                    if (file.includes("hero_")) {
                                        const heroImageRef: MainImageRef = new MainImageRef

                                        const nameMatch = value.match(".*\/hero_(.*)")
                                        if (nameMatch) {
                                            heroImageRef.imageFileRef = imageFile
                                            heroImageRef.imageName = nameMatch[1]
                                            recipe.heroImage = heroImageRef
                                        }   
                                    } else if (file.includes("main_")) {
                                        const mainImageRef: MainImageRef = new MainImageRef

                                        const nameMatch = value.match(".*\/main_(.*)")
                                        if (nameMatch) {
                                            mainImageRef.imageFileRef = imageFile
                                            mainImageRef.imageName = nameMatch[1]
                                            recipe.mainImage = mainImageRef
                                        }   
                                    } else {
                                        const matches = file.match(".*/(.d*)_(.*)")
                                        if (matches) {
                                            const capturedIndex: number = Number(matches[1])
                                            const name = matches[2]
                                            const instructionImageRef: InstructionImageRef = new InstructionImageRef
                                            
                                            instructionImageRef.imageFileRef = imageFile
                                            instructionImageRef.imageName = name
                                            instructionImageRef.index = capturedIndex
                                            recipe.instructionSection[capturedIndex].image = instructionImageRef
                                        }
                                    }
                                    instructionImagesSize--

                                    if (instructionImagesSize == 0) {
                                        resolve(recipe)
                                    }
                                }
                            })
                            
                        }
                    })
                }
            }
            xhr.open('GET', recipe.images);
            xhr.send();
        } catch {
            reject("failed to fetch Image" + recipe.images)
        }
    })
} 

function convertbase64toFile(string64: string, fileName: string): File {
    //console.log(string64)
    const imageContent = atob(string64);
    
    // image details
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }

    const imgType = fileName.split(".")[1]
    const type = 'image/'+imgType;

    const blob = new Blob([buffer], { type });
    return new File([blob], fileName, { lastModified: new Date().getTime(), type });
}


const firebaseAPI = {
    getRecipeImages
}

export default firebaseAPI