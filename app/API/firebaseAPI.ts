import JSZip from 'jszip'
import { Recipe } from '@/model/recipe'

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

                        new Promise<Recipe>((resolve, reject) => {
                            for (const [index, value] of zipContent.entries()) {
                                let file = value
                                
                                zip.files[file].async("blob").then(function (blobFile) {
                                    if (blobFile.size != 0) { 
                                        if (file.includes("hero_")) {
                                            recipe.heroImage = blobFile
                                        } else if (file.includes("main_")) {
                                            recipe.mainImage = blobFile
                                        } else {
                                            const matches = file.match(".*\/(.d*)_.*")
                                            if (matches) {
                                                const capturedIndex: number = Number(matches[1])
                                                recipe.instructionSection[capturedIndex].image = blobFile
                                            }
                                        }
                                        instructionImagesSize--

                                        if (instructionImagesSize == 0) {
                                            resolve(recipe)
                                        }
                                    }
                                })
                                
                            }
                        }).then((response) => {
                            resolve(response)
                        }).catch((error) => {
                            reject(error)
                        })
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

const firebaseAPI = {
    getRecipeImages
}

export default firebaseAPI