
// import JSZip from 'jszip'
import { Recipe, MainImageRef } from '@/app/models/recipe'
import { ZipReader, BlobReader, BlobWriter, Entry } from '@zip.js/zip.js';


// const zipper = new JSZip()

// export async function getRecipeImages(recipe: Recipe): Promise<Recipe> {
//     return await new Promise<Recipe> ( (resolve) => {
//         getImagesFromFirebase(recipe).then((recipeResponse) => {
//             resolve(recipeResponse)
//         })
//     })
// }

// async function getImagesFromFirebase(recipe: Recipe) {
//     return await new Promise<Recipe> ( (resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';

//         try {
//             xhr.onload = async () => {

//                 const blob = xhr.response

//                 // console.log("Blob details:", {
//                 //     size: blob.size,
//                 //     type: blob.type
//                 // });

//                 // Create zip reader
//                 const reader = new BlobReader(blob);
//                 const zipReader = new ZipReader(reader);

//                 try {
//                     // Get all entries
//                     const entries = await zipReader.getEntries();
//                     // console.log("Found entries:", entries.length);

//                     const recipeEntries = entries.filter((entry): entry is Entry => 
//                         entry != null && 
//                         !entry.directory && 
//                         entry.filename.includes(recipe.recipeId)
//                     );
//                     // console.log("Entries:", recipeEntries);
                    
//                     for (const entry of recipeEntries) {
//                         try {
//                             if (entry.getData) {
//                                 // console.log("Processing:", entry.filename);
                                
//                                 // Get the file data as a blob
//                                 const writer = new BlobWriter('image/webp');
//                                 const imageBlob = await entry.getData(writer);
//                                 const imageFile = new File(
//                                     [imageBlob], 
//                                     entry.filename.split('/').pop() || entry.filename,
//                                     { type: 'image/webp' }
//                                 );
//                                 // console.log("Image File:", imageFile);
        
//                                 if (entry.filename.includes("hero_")) {
//                                     const heroImageRef = new MainImageRef();
//                                     const nameMatch = entry.filename.match(".*\/hero_(.*)");
//                                     if (nameMatch) {
//                                         heroImageRef.imageFileRef = imageFile;
//                                         heroImageRef.imageName = nameMatch[1];
//                                         recipe.heroImage = heroImageRef;
//                                         // console.log("RECIPE HERO: ", recipe)
//                                     }
//                                 } else if (entry.filename.includes("main_")) {
//                                     const mainImageRef = new MainImageRef();
//                                     const nameMatch = entry.filename.match(".*\/main_(.*)");
//                                     if (nameMatch) {
//                                         mainImageRef.imageFileRef = imageFile;
//                                         mainImageRef.imageName = nameMatch[1];
//                                         recipe.mainImage = mainImageRef;
//                                         // console.log("RECIPE MAIN: ", recipe)
//                                     }
//                                 } else {
//                                     const matches = entry.filename.match(".*/(.d*)_(.*)");
//                                     if (matches) {
//                                         const capturedIndex = Number(matches[1]);
//                                         const name = matches[2];
//                                         const instructionImageRef = new InstructionImageRef();
                                        
//                                         instructionImageRef.imageFileRef = imageFile;
//                                         instructionImageRef.imageName = name;
//                                         instructionImageRef.index = capturedIndex;
//                                         recipe.instructionSection[capturedIndex].image = instructionImageRef;
//                                         // console.log("RECIPE INSTRUC: ", recipe)
//                                     }
//                                 }
//                             }
//                         } catch (entryError) {
//                             console.error(`Error processing entry ${entry.filename}:`, entryError);
//                         }
//                     }
                    
//                 } finally {
//                     // Always close the reader
//                     resolve(recipe)
//                     await zipReader.close();
//                 }
//             }

//             xhr.open('GET', recipe.images);
//             xhr.send();
//         } catch (e) {
//             console.error(e)
//             reject("failed to fetch Image" + recipe.images)
//         }
//     })
// }

// async function getImagefromFirebase(recipe: Recipe) {
//     return await new Promise<Recipe> ( (resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';
        
//         try {
//             xhr.onload = () => {
//                 try {

//                     const blob = xhr.response

//                     console.log("BLOB: ", blob)
//                     if (blob.size > 4000) {
//                         zipper.loadAsync(blob, {}).then( (zip) => {
//                             console.log('AFTER Async')
//                             const zipContent = Object.keys(zip.files).filter(file => file.includes(recipe.recipeId))
//                             let instructionImagesSize = zipContent.length-1

//                             for (const [index, value] of zipContent.entries()) {
//                                 const file = value
//                                 console.log('zip contents: ', file)
                                
//                                 zip.files[file].async("base64").then(function (base64File) {
//                                     console.log("base64 file: ", base64File.length)
//                                     if (base64File.length > 0 ) { 
//                                         const imageFile = convertbase64toFile(base64File, file)
//                                         console.log("imageFile: ", imageFile)
//                                         if (file.includes("hero_")) {
//                                             const heroImageRef: MainImageRef = new MainImageRef

//                                             const nameMatch = value.match(".*\/hero_(.*)")
//                                             if (nameMatch) {
//                                                 heroImageRef.imageFileRef = imageFile
//                                                 heroImageRef.imageName = nameMatch[1]
//                                                 recipe.heroImage = heroImageRef
//                                             }   
//                                         } else if (file.includes("main_")) {
//                                             const mainImageRef: MainImageRef = new MainImageRef

//                                             const nameMatch = value.match(".*\/main_(.*)")
//                                             if (nameMatch) {
//                                                 mainImageRef.imageFileRef = imageFile
//                                                 mainImageRef.imageName = nameMatch[1]
//                                                 recipe.mainImage = mainImageRef
//                                             }   
//                                         } else {
//                                             const matches = file.match(".*/(.d*)_(.*)")
//                                             if (matches) {
//                                                 const capturedIndex: number = Number(matches[1])
//                                                 const name = matches[2]
//                                                 const instructionImageRef: InstructionImageRef = new InstructionImageRef
                                                
//                                                 instructionImageRef.imageFileRef = imageFile
//                                                 instructionImageRef.imageName = name
//                                                 instructionImageRef.index = capturedIndex
//                                                 recipe.instructionSection[capturedIndex].image = instructionImageRef
//                                             }
//                                         }
//                                         instructionImagesSize--

//                                         if (instructionImagesSize == 0) {
//                                             resolve(recipe)
//                                         }
//                                     }
//                                 })
                                
//                             }
//                         })
//                     }
//                 } catch (e) {
//                     console.error(e)
//                 }
//             }
//             xhr.open('GET', recipe.images);
            
//             xhr.send();
//         } catch (e) {
//             console.error(e)
//             reject("failed to fetch Image" + recipe.images)
//         }
//     })
// } 

// async function getImagefromFirebase(recipe: Recipe) {
//     return new Promise<Recipe>((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';
        
//         xhr.onload = async () => {
//             try {
//                 const blob = xhr.response;
//                 console.log("Blob type:", blob.type);
//                 console.log("Blob size:", blob.size);

//                 const zip = await zipper.loadAsync(blob, {
//                     // Add specific options for Next.js environment
//                     createFolders: true,
//                     checkCRC32: false  // Try this if you still get errors
//                 });

//                 const zipContent = Object.keys(zip.files).filter(file => 
//                     file.includes(recipe.recipeId)
//                 );
//                 console.log("ZIP CONTENTS: ", zipContent)

//                 for (const file of zipContent) {
//                     try {
//                         if (!zip.files[file].dir) {
//                             console.log("Processing file:", file);
                            
//                             // Get data as array
//                             const base64File = await zip.files[file].async("base64");
                            
//                             // // Convert array to base64
//                             // const base64File = btoa(String.fromCharCode.apply(null, arrayData));
                            
//                             if (base64File.length > 0) {
//                                  // For WebP images, we need to include the correct MIME type
//                                 const imageFile = convertbase64toFile(base64File, file, 'image/webp');
//                                 console.log("IMAGE FILE: ", imageFile)
                                
//                                 if (file.includes("hero_")) {
//                                     const heroImageRef = new MainImageRef();
//                                     const nameMatch = file.match(".*\/hero_(.*)");
//                                     if (nameMatch) {
//                                         heroImageRef.imageFileRef = imageFile;
//                                         heroImageRef.imageName = nameMatch[1];
//                                         recipe.heroImage = heroImageRef;
//                                     }
//                                 } else if (file.includes("main_")) {
//                                     const mainImageRef = new MainImageRef();
//                                     const nameMatch = file.match(".*\/main_(.*)");
//                                     if (nameMatch) {
//                                         mainImageRef.imageFileRef = imageFile;
//                                         mainImageRef.imageName = nameMatch[1];
//                                         recipe.mainImage = mainImageRef;
//                                     }
//                                 } else {
//                                     const matches = file.match(".*/(.d*)_(.*)");
//                                     if (matches) {
//                                         const capturedIndex = Number(matches[1]);
//                                         const name = matches[2];
//                                         const instructionImageRef = new InstructionImageRef();
                                        
//                                         instructionImageRef.imageFileRef = imageFile;
//                                         instructionImageRef.imageName = name;
//                                         instructionImageRef.index = capturedIndex;
//                                         recipe.instructionSection[capturedIndex].image = instructionImageRef;
//                                     }
//                                 }
//                             }
//                         }
//                     } catch (fileError) {
//                         console.error(`Error processing file ${file}:`, fileError);
//                         console.error("Error details:", fileError);
//                         continue;
//                     }
//                 }
        

//                 // for (const file of zipContent) {
//                 //     try {
//                 //         console.log("Processing file:", file);
//                 //         console.log("File info:", zip.files[file]);
                        
//                 //         // Check if file is actually a file (not a directory)
//                 //         if (!zip.files[file].dir) {
//                 //             console.log("Before uintConversion")
//                 //             // Try getting the raw data first
//                 //             const uint8Array = await zip.files[file].async("uint8array");
//                 //             console.log("Raw data size:", uint8Array.length);
                            
//                 //             // Then convert to base64
//                 //             const base64File = await zip.files[file].async("base64");
//                 //             console.log("Base64 length:", base64File.length);
        
//                 //             // Rest of your processing code...
//                 //             if (base64File.length > 0) {
//                 //                 const imageFile = convertbase64toFile(base64File, file);
//                 //                 // ... rest of your code for handling different image types ...
//                 //                 if (file.includes("hero_")) {
//                 //                     const nameMatch = file.match(".*\/hero_(.*)");
//                 //                     if (nameMatch) {
//                 //                         const heroImageRef = new MainImageRef();
//                 //                         heroImageRef.imageFileRef = imageFile;
//                 //                         heroImageRef.imageName = nameMatch[1];
//                 //                         recipe.heroImage = heroImageRef;
//                 //                     }
//                 //                 } else if (file.includes("main_")) {
//                 //                     const nameMatch = file.match(".*\/main_(.*)");
//                 //                     if (nameMatch) {
//                 //                         const mainImageRef = new MainImageRef();
//                 //                         mainImageRef.imageFileRef = imageFile;
//                 //                         mainImageRef.imageName = nameMatch[1];
//                 //                         recipe.mainImage = mainImageRef;
//                 //                     }
//                 //                 } else {
//                 //                     const matches = file.match(".*/(.d*)_(.*)");
//                 //                     if (matches) {
//                 //                         const capturedIndex = Number(matches[1]);
//                 //                         const name = matches[2];
//                 //                         const instructionImageRef = new InstructionImageRef();
                                        
//                 //                         instructionImageRef.imageFileRef = imageFile;
//                 //                         instructionImageRef.imageName = name;
//                 //                         instructionImageRef.index = capturedIndex;
//                 //                         recipe.instructionSection[capturedIndex].image = instructionImageRef;
//                 //                     }
//                 //                 }
//                 //             }
//                 //         }
//                 //     } catch (fileError) {
//                 //         console.error(`Error processing file ${file}:`, fileError);
//                 //         // Continue with next file instead of failing completely
//                 //         continue;
//                 //     }
//                 // }


//                 // // Use Promise.all to handle all conversions
//                 // const conversions = zipContent.map(async (file) => {
//                 //     try {
//                 //         const base64File = await zip.files[file].async("base64");
//                 //         console.log("base64File", base64File)
//                 //         //if (base64File.length === 0) return;

//                 //         const imageFile = convertbase64toFile(base64File, file);
//                 //         console.log("imageFile", imageFile)

                        
//                 //     } catch (error) {
//                 //         console.error(`Error processing file ${file}:`, error);
//                 //     }
//                 // });

//                 // await Promise.all(conversions);
//                 resolve(recipe);

//             } catch (error) {
//                 reject(`Error processing zip: ${error}`);
//             }
//         };

//         xhr.onerror = () => reject(`Failed to fetch image: ${recipe.images}`);
        
//         xhr.open('GET', recipe.images);
//         xhr.send();
//     });
// }

// Updated convertbase64toFile function to handle WebP

// function convertbase64toFile(base64: string, filename: string, mimeType: string = 'image/webp'): File {
//     const byteString = atob(base64);
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
    
//     for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
    
//     return new File([ab], filename, { type: mimeType });
// }

// function convertbase64toFile(string64: string, fileName: string): File {
//     console.log("CONVERSION INPUTS: ", string64, fileName)
//     const imageContent = atob(string64);
    
//     // image details
//     const buffer = new ArrayBuffer(imageContent.length);
//     const view = new Uint8Array(buffer);

//     for (let n = 0; n < imageContent.length; n++) {
//       view[n] = imageContent.charCodeAt(n);
//     }

//     const imgType = fileName.split(".")[1]
//     const type = 'image/'+imgType;

//     const blob = new Blob([buffer], { type });
//     return new File([blob], fileName, { lastModified: new Date().getTime(), type });
// }


// const firebaseAPI = {
//     getRecipeImages
// }

// export default firebaseAPI