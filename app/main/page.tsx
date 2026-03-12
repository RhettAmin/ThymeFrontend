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

    // const [heroRecipe, setHeroRecipe] = useState<Recipe>(new Recipe());
    const [recipes, setRecipes] = useState<Recipe[]>([new Recipe()]);
    const [backendError, setBackendError] = useState<boolean>(false);

    // Hero Logic
    // const [heroDisplayOrder, setHeroDisplayOrder] = useState<number[]>([0,1,2])

    const router = useRouter()

    // CALLBACKS ============================================================================
    // const getRecipeImagesFromFirebase = useCallback( async (recipes: Recipe[]) => { 
    //     for (let i = 0; i < recipes.length; i++) {
    //         getRecipeImages(recipes[i]).then((response) => {
    //             setRecipes((prevState) => {
    //                 const newState = prevState
    //                 newState[i] = response
    //                 return newState
    //             })
    //             router.refresh()
    //         })
    //     }
    // }, [router])

    const loadRecipes =  useCallback(async () => {
        ThymeAPI.getRecipes(undefined, 7).then((response) => {
            setRecipes(response)  
            // getRecipeImagesFromFirebase(response)
        }).catch((error) => {
            console.error(error)
            setBackendError(true)
        })
    }, [])

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    // const DisplayTags = (props: {tags: string[]}) => {
    //     const tagList = []

    //     for (let i = 0; i < props.tags.length; i++) {
    //         tagList.push(
    //             <li key={i} className="bg-secondaryAccent px-2 py-1 rounded-xl text-xs">
    //                 { props.tags[i] }
    //             </li>
    //         )
    //     }

    //     return (
    //         <ul className="flex flex-row gap-x-2">
    //             { tagList }
    //         </ul>
    //     )
    // }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
            <Divider dividerText="Latest Recipes"/>
            <div className="relative w-full h-[52rem]">
                {/* Circle */}
                <Image className="absolute inset-0 mx-auto flex justify-center -z-1 w-[55rem] h-[52rem]" 
                    src={ CircleImage } 
                    alt={ "" } 
                />
                <div className="absolute left-[30%] top-[30%]">
                    <Heroes heroRecipes={ recipes.slice(0,3) } />
                </div>
            </div>

            {/* Alll Recipes button */}
            <div className="w-1/4">
                <Link href={` /recipes `}>
                    <Button message="All Recipes"/>
                </Link>
            </div>

            <div className="mt-10">
                <AboutMe />
            </div>
        </div>
    )
}

export default Main