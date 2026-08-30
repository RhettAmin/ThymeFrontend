'use client'

import { useEffect, useRef, useState } from "react"
import ThymeAPI from "@/app/api/thyme/thymeAPI"
import { Recipe } from "@/app/models/recipe"
import RecipeListDisplay, { BookHandle, PAGE_SIZE } from './components/RecipeListDisplay'
import { PageControl } from "./components/pageControls"



const Recipes = () => {
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        ThymeAPI.getRecipes().then(setAllRecipes)
    }, [])

    // derived every render — cannot go stale
    const totalPages = Math.max(1, Math.ceil(allRecipes.length / PAGE_SIZE))
    const start = currentIndex * PAGE_SIZE
    // const recipePageWindow = allRecipes.slice(start, start + PAGE_SIZE)
    const bookRef = useRef<BookHandle>(null)

    const selectPage = (page: number) => {
        const delta = page - currentIndex
        if (delta === 0) return
        if (Math.abs(delta) === 1) bookRef.current?.flip(delta > 0 ? 1 : -1)
        else goToPage(page)          // non-adjacent jump — no animation
    }

    const goToPage = (page: number) => {
        setCurrentIndex(Math.min(Math.max(page, 0), totalPages - 1))
    }

    return (
        <div className="w-full h-full my-4 pb-4">
            <div className="flex flex-col space-y-8 w-full h-full items-center px-20">
                <RecipeListDisplay 
                    ref={bookRef} 
                    recipes={allRecipes} 
                    currentIndex={currentIndex} 
                    onCommit={goToPage} 
                />
                <PageControl 
                    currentIndex={currentIndex} 
                    totalPages={totalPages} 
                    onSelect={selectPage} 
                />
            </div>
        </div>
    )
}

export default Recipes