import { uploadBytesResumable, getDownloadURL, ref as storageRef, type StorageReference, getBlob } from 'firebase/storage'
import ThymeFirebaseConn from './config/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
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
        //console.log(recipe)
        const referenceName = recipe.name.replace(/ /g, '-') + "_" + recipe.recipeId

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        try {
            xhr.onload = () => {
                const blob = xhr.response;
                if (blob.size > 4000) {
                    zipper.loadAsync(blob).then( (zip) => {    
                        // boolean to determine if we're setting the main Image or instructionImages
                        let isMainImage = true
                        let counter = 0
                        let zipContent = Object.keys(zip.files)
                        for (const [index, value] of zipContent.entries()) {
                            let file = value
                            if (file.startsWith(recipe.recipeId)) {
                                zip.files[file].async("blob").then(function (blobFile) {
                                    if (blobFile.size != 0) {
                                        if (isMainImage) {
                                            recipe.mainImage = blobFile
                                            isMainImage = false
                                            if (index == zipContent.length-1) {
                                                resolve(recipe)
                                            }
                                        } else {
                                            recipe.instructionSection[counter].image = blobFile
                                            counter++
                                            if (index == zipContent.length-1) {
                                                resolve(recipe)
                                            }
                                        }
                                    }
                                })
                            }
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

const firebaseAPI = {
    getRecipeImages
}

export default firebaseAPI