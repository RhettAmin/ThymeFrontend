'use client'

import { useCallback, useEffect, useState } from "react"
import { Divider } from "../components/divider"
import ThymeAPI from "../api/thyme/thymeAPI"
import { Recipe } from "../models/recipe"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Heroes from "./components/heroes"
import CircleImage from "@/public/static/Circle_soup.webp"
import { Button } from "../components/button"
import Link from "next/link"
import AboutMe from "./components/about"

const Main = () => {

    const [heroRecipe, setHeroRecipe] = useState<Recipe>(new Recipe());
    const [recipes, setRecipes] = useState<Recipe[]>([new Recipe()])
    const [backendError, setBackendError] = useState<boolean>(false)
    const [focusedRecipe, setFocusRecipe] = useState<Recipe>(new Recipe)

    // Hero Logic
    const [heroDisplayOrder, setHeroDisplayOrder] = useState<number[]>([0,1,2])

    const router = useRouter()

    // API Calls
    const loadRecipes =  useCallback(async () => {
        ThymeAPI.getRecipes(undefined, 4).then((response) => {
            console.log("API DATA RECEIVED: ", response)
            setRecipes(response)  
            setFocusRecipe(response[1])
            // getRecipeImagesFromFirebase(response)
        }).catch((error) => {
            console.error(error)
            setBackendError(true)
        })
    }, [])

    useEffect(() => {
        loadRecipes()
    }, [loadRecipes])

    return (
        <div className="w-full h-full relative m-auto">
            {/* Soup Pot */}
            <div className="absolute left-[5vw] top-[10vh] w-[50vw] h-[50vw] rounded-full bg-steel shadow-mg flex items-center justify-center">
                <div className="w-[45vw] h-[45vw] rounded-full bg-accent-mid shadow-sm">
                    <Heroes heroRecipes={ recipes.slice(0,3) } />
                </div>
            </div>

            {/* Info */}
            

            {/* <Divider dividerText="Latest Recipes"/>
            <div className="relative w-full h-[52rem]">
                {/* Circle 
                <Image className="absolute inset-0 mx-auto flex justify-center -z-1 w-[55rem] h-[52rem]" 
                    src={ CircleImage } 
                    alt={ "" } 
                />
                <div className="absolute left-[30%] top-[30%]">
                    <Heroes heroRecipes={ recipes.slice(0,3) } />
                </div>
            </div>

            {/* Alll Recipes button
            <div className="w-1/4">
                <Link href={` /recipes `}>
                    <Button message="All Recipes"/>
                </Link>
            </div>

            <div className="mt-10">
                <AboutMe />
            </div> */}
        </div>
    )
}

export default Main