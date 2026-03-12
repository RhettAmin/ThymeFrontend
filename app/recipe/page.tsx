'use client'
import { InstructionProps } from "./instructionSectionDisplay"
import { FullIngredientProps } from "./fullIngredientDisplay"
import { ImageDisplayProps } from "./imageDisplay"
import { useSearchParams } from "next/navigation"
import ThymeAPI from "../api/thyme/thymeAPI"
import { useEffect, useState } from "react"
import { Recipe } from "../models/recipe"
import dynamic from 'next/dynamic'
import Image from 'next/image'

const RecipeView = () => {

    const searchParams = useSearchParams()
    const recipeId: string | null = searchParams.get('recipeId') 
    const [recipe, setRecipe] = useState<Recipe>(new Recipe())

    useEffect (() => {
        console.log("ID: ", recipeId)
        ThymeAPI.getRecipes(recipeId!).then((response: Recipe[]) => {
            console.log("RECIPES RECIEVED: ", response)
            const recipe = response[0]
            setRecipe(recipe)
        }) 
    }, [recipeId])

    const LoadingView = () => (
        <div className="w-full h-[81vh] flex justify-center items-center">
            <div className="bg-card w-[20%] h-[20%] rounded-lg shadow-lg p-6 flex justify-center items-center">
                <p className="font-bold text-xl">Cooking...</p>
            </div>
        </div>
    )

    const DynamicImageDisplay = dynamic<ImageDisplayProps>(
        () => import('./imageDisplay'),
        { 
            loading: () => 
            <div className="mx-6 my-4 p-15 h-100 flex flex-col space-y-8 rounded-lg inset-shadow-sm bg-accent animate-pulse duration-100 transition-all">
                <Image className="rounded-2xl" src={ "/static/Stew.png" } 
                    width={300} height={300} alt={ "Image of the Recipe, plated nicely" } 
                    loading="eager"
                />
            </div>
        }
    )

    const DynamicFullIngredientDisplay = dynamic<FullIngredientProps>(
        () => import('./fullIngredientDisplay'),
        { 
            loading: () => 
            <div className="mx-6 my-4 p-15 h-100 flex flex-col space-y-8 rounded-lg inset-shadow-sm bg-accent animate-pulse duration-100 transition-all">
                <div className="w-[80%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[70%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[60%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[40%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[50%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[20%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
            </div>
        }
    )
    
    const DynamicInstructionDisplay = dynamic<InstructionProps>(
        () => import('./instructionSectionDisplay'),
        { 
            loading: () => 
            <div className="mx-6 my-4 p-15 h-100 flex flex-col space-y-8 rounded-lg inset-shadow-sm bg-accent animate-pulse duration-100 transition-all">
                <div className="w-[80%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[70%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[60%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[40%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[50%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
                <div className="w-[20%] h-5 rounded-2xl animate-pulse bg-gray-600"/>
            </div>
        }
    )
    
    const displayTime = (timeInMinutes: number): string => {
        if (timeInMinutes < 60) {
            return timeInMinutes + " minutes"
        }
        const converted: number = (timeInMinutes / 60)
        let responseStr = converted.toString()
        if (converted >= 1) {
            responseStr += " hour"
        }
        if (converted > 1) {
            responseStr += "s"
        }

        return responseStr
    }

    const MainView = () => (
        <div className="w-full h-full flex items-center justify-center py-4 px-[15%]">
            
            <div className="h-full flex flex-col items-center justify-center space-y-8">
                {/* Main Image */}
                <DynamicImageDisplay
                    imageLink={ recipe.heroImage }
                />
                {/* <div className="flex justify-center">
                    <Image className="rounded-2xl" src={ recipe.heroImage } 
                        width={500} height={500} alt={ "Image of the Recipe, plated nicely" } 
                        loading="eager"
                    />
                </div> */}


                {/* <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gradient-to-br from-amber-700 via-amber-900 to-amber-700">
                    <div className="absolute inset-0 bg-wood-grain mix-blend-multiply">
                        Test
                    </div>
                </div> */}

                {/* Descriptives box */}
                <div className="w-full flex flex-col items-center relative -mt-10">
                    {/* Name Badge */}
                    <div className="absolute -top-4 flex justify-center bg-ThymePrimary 
                        rounded-4xl shadow-md px-4 py-2 w-[40%]">
                        <p className="font-bold text-xl">{ recipe.name }</p>
                    </div>
                    <div className="w-full flex flex-col items-center bg-card text-center 
                        rounded-lg shadow-lg px-4 pt-12 pb-4">
                        <div>
                            { recipe.description }
                        </div>
                        <div className="flex flex-row justify-evenly border-t-1 border-black pt-6 mt-6 w-[90%]">
                            <div className="flex flex-row space-x-1">
                                <p className="font-bold">Serves:</p> 
                                <p>{ recipe.serving.totalServings }</p>
                            </div>
                            <div>
                                { recipe.tags.join(", ") }
                            </div>
                            <div className="flex flex-row space-x-1">
                                <p className="font-bold">Time:</p> 
                                <p>{ displayTime(recipe.timeToPlate) }</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ingredient Totals */}
                <div className="w-full flex flex-col bg-card text-center rounded-lg shadow-lg p-4">
                    <p className="text-2xl font-bold">Total Ingredients</p>
                    <div className="border-b-1 pb-4 mx-8"/>
                    <DynamicFullIngredientDisplay
                        ingredientList={ recipe.ingredientTotals }
                    />
                </div>
                
                {/* Instructions */}
                <div className="w-full flex flex-row relative space-x-6">

                    {/* Instruction Sections */}
                    <div className="w-full flex flex-col bg-card text-center rounded-lg shadow-lg p-4">
                        
                        <p className="text-2xl font-bold">Instructions</p>
                        <div className="border-b-1 pb-4 mx-8"/>
                        <DynamicInstructionDisplay 
                            instructionSectionList={ recipe.instructionSection } 
                            ingredientSectionList={ recipe.ingredientSection}
                        />
                    </div>
                </div>

            </div>
        </div>
    )

    return (
        recipe.name != "" ?
        <MainView/> :
        <LoadingView/>
    )

}

export default RecipeView