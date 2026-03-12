'use client'

import { useEffect, useState } from "react"
import { Divider } from "../components/divider"
import { RecipeCard } from "./components/recipeCard"
import ThymeAPI from "@/app/api/thyme/thymeAPI"
import { Recipe } from "@/app/models/recipe"
import { motion } from "motion/react"
import dynamic from 'next/dynamic'
import { RecipeCardsProps } from './components/RecipeListDisplay'

const Recipes = () => {

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const [recipePageWindow, setRecipePageWindow] = useState<Recipe[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const pageSize = 3

    const determinePageSize = (recipes: Recipe[]) => {
        setAllRecipes(recipes)
        // Get total pages
        console.log("totalPages:" , Math.ceil(recipes.length/pageSize), "length of array:" , recipes.length, "pagesize: ", pageSize, "math: ", recipes.length/pageSize)
        setTotalPages(Math.ceil(recipes.length/pageSize))
        // Set new window for display
        setRecipePageWindow(recipes.slice(0, pageSize))
    }

    /**
     * setFirstPage
     * Sets the first page of elements
     */
    const setFirstPage = () => {
        setRecipePageWindow(allRecipes.slice(0, pageSize))
    }

    /**
     * setLastPage
     * Sets the last page of elements
     */
    const setLastPage = () => {
        const lastStartIndex = pageSize * (totalPages - 1)
        console.log("lastIndex: ", lastStartIndex, allRecipes.slice(lastStartIndex, allRecipes.length))
        setRecipePageWindow(allRecipes.slice(lastStartIndex, allRecipes.length))
    }

    /**
     * setPage
     * Sets the window to the next page.
     */
    const setPage = (pageNum: number) => {
        console.log("new Index: ", pageNum, totalPages)
        setCurrentIndex(pageNum)
        const newStartIndex = pageSize * (pageNum)

        setRecipePageWindow(allRecipes.slice(newStartIndex, newStartIndex+pageSize))
    }

    const flipForward = () => {
        // Check if moving forward will be at the last index
        console.log("current Index: ", currentIndex, totalPages-1)
        if (currentIndex == totalPages-2) { // To the last Page
            console.log("Reached")
            setCurrentIndex(totalPages-1)
            setLastPage()
        } else { // Inbetween Pages
            setCurrentIndex(currentIndex+1)
            setPage(currentIndex+1)
        }
        
    }

    const flipBackward = () => {
        // Check if moving forward will be at the last index
        console.log("BACK - current Index: ", currentIndex, totalPages-1)
        if (currentIndex-1 == 1) {
            setFirstPage()
            return
        } 
        setPage(currentIndex-1)
    }

    // Load up recipes
    useEffect(() => {
        ThymeAPI.getRecipes().then((response: Recipe[]) => {
            console.log("RECIPES RECIEVED: ", response)
            determinePageSize(response)
        }) 
    }, [])

    const PageControl = () => {
        const isSingularPage = totalPages == 1
        return (
            <div className="flex flex-row">
                {
                    !isSingularPage &&
                    <div className="flex flex-row space-x-4">
                        <div className={`bg-thymeButton text-black cursor-pointer border-1 border-primary
                                transition-all duration-200 flex justify-center items-center text-center 
                                font-semibold h-full w-full py-1 rounded-lg shadow-lg 
                                hover:bg-thymeButtonHover hover:text-white
                                ${ currentIndex == 0 ? 'opacity-0' : 'opacity-100' }
                            `} 
                            onClick={() => flipBackward()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
                        </div>
                        <div className="flex flex-row space-x-4">
                            {
                                Array.from({ length: totalPages }, (_,i) => (
                                    <motion.div key={i}
                                        className={` 
                                            cursor-pointer transition-all duration-200 
                                            ${currentIndex == i ? 
                                                'px-4 py-2 bg-thymeHighlight rounded-lg shadow-md' : 
                                                'px-2 py-1 bg-thymeCard rounded-lg shadow-md' 
                                            }
                                        `}
                                        onClick={ () => setPage(i) }
                                    >
                                        <p></p>{i + 1}
                                    </motion.div>
                                ))
                            }
                        </div>
                        
                        <div className={`bg-thymeButton text-black cursor-pointer border-1 border-primary 
                                flex justify-center items-center text-center font-semibold h-full w-full py-1 
                                rounded-lg shadow-lg hover:bg-thymeButtonHover hover:text-white
                                ${ currentIndex == totalPages - 1 ? 'hidden' : '' }
                            `}
                            onClick={() => flipForward()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
                        </div>
                    </div>
                }
            </div>
        )
    }

    const DynamicRecipeListDisplay = dynamic<RecipeCardsProps>(
        () => import('./components/RecipeListDisplay'),
        { 
            loading: () => 
            <div className="flex flex-row justify-center space-x-4 w-full h-100">
                {
                    Array.from({ length: 3 }, (_,i) => ( 
                        <div key={i} className="w-70 bg-accent animate-pulse duration-100 transition-all rounded-xl shadow-md">
                        </div>
                    ))
                }
            </div>
        }
    )

    return (
        <div className="w-full my-4 pb-4">
            <div className="flex flex-col w-full h-full items-center  space-y-8">
                <div>
                    <Divider dividerText="All Recipes" />
                </div>

                <div className="grid grid-cols-3 h-full items-center gap-8 px-4">
                    {
                        recipePageWindow.map((recipe: Recipe, index: number) =>  (
                            <RecipeCard 
                                key={index} 
                                recipeId={ recipe.recipeId }
                                recipeName={ recipe.name } 
                                mainImageLink= { recipe.mainImage ?? undefined }
                                tags={ recipe.tags } 
                                description={ recipe.description } 
                                timeToPlate={ recipe.timeToPlate } 
                            />
                        ))
                    }
                </div>
                <div>
                    { PageControl() }
                </div>
            </div>
        </div>
    )
}

export default Recipes