'use client'
import { useEffect, useRef, useState } from "react"
import { Recipe } from "@/app/models/recipe"
import Image from "next/image"
import Link from "next/link"
import { HourRoundingToString } from '@/app/utilities/utils'

interface HeroesMobileProps {
    heroRecipes: Recipe[]
}

/**
 * Small-screen counterpart to Heroes. Heroes lays its collage out with
 * absolute positioning at percentages of its own box (itself sized off
 * viewport-width ancestors) - that math doesn't degrade gracefully at
 * narrow widths, so this is a separate, plainly-flowed stacked layout
 * rather than a responsive variant of the same markup.
 */
const HeroesMobile = ({ heroRecipes }: HeroesMobileProps) => {

    const [spotlightIndex, setSpotlightIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (isPaused || !heroRecipes || heroRecipes.length < 2) return

        timerRef.current = setInterval(() => {
            setSpotlightIndex((prev) => (prev + 1) % heroRecipes.length)
        }, 3000)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isPaused, heroRecipes])

    const recipe = heroRecipes?.[spotlightIndex]
    if (!recipe || !recipe.recipeId) return null

    return (
        <div className="w-full max-w-[480px] mx-auto px-4">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-md bg-brand-wash">
                {
                    recipe.mainImage && (
                        <Image
                            src={recipe.mainImage}
                            alt={recipe.name}
                            fill
                            sizes="(max-width: 768px) 90vw, 480px"
                            className="object-cover"
                        />
                    )
                }
            </div>

            <div className="mt-6 space-y-4">
                <h6 className="font-bold text-sm text-text-secondary uppercase">Freshly Cooked</h6>
                <h3 className="font-bold text-3xl">{ recipe.name }</h3>
                <p className="text-base">{ recipe.description }</p>
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        recipe.tags.map((tag, index) => (
                            <p key={index} className="px-3 py-1 bg-brand-wash font-bold text-brand-dark text-sm rounded-full">{tag}</p>
                        ))
                    }
                </div>
                <div className="flex flex-row space-x-8 border-t border-b border-border-subtle py-4">
                    <div className="text-center">
                        <p className="text-text-muted text-xs uppercase">Time to Plate</p>
                        <p className="font-bold">{ HourRoundingToString(recipe.totalTime) }</p>
                    </div>
                    <div className="text-center">
                        <p className="text-text-muted text-xs uppercase">Serves</p>
                        <p className="font-bold">{ recipe.totalServings }</p>
                    </div>
                </div>
                <Link href={`/recipe?recipeId=${recipe.recipeId}`}>
                    <button className="w-full bg-accent-mid hover:bg-accent-light cursor-pointer rounded-lg shadow-md py-3 font-bold uppercase transition-colors">
                        Cook it
                    </button>
                </Link>
            </div>

            {
                heroRecipes.length > 1 && (
                    <div className="flex flex-row justify-center items-center space-x-4 mt-6">
                        <button
                            className="rounded-full bg-accent-mid hover:bg-accent-light px-4 py-2 cursor-pointer transition-colors"
                            aria-label="Previous recipe"
                            onClick={() => setSpotlightIndex((i) => (i <= 0 ? heroRecipes.length - 1 : i - 1))}
                        >
                            <i className="fa-solid fa-chevron-left" />
                        </button>
                        <button
                            className="rounded-full bg-accent-mid hover:bg-accent-light px-4 py-2 cursor-pointer transition-colors"
                            aria-label={isPaused ? "Resume" : "Pause"}
                            onClick={() => setIsPaused((p) => !p)}
                        >
                            { isPaused ? <i className="fa-solid fa-play" /> : <i className="fa-solid fa-pause" /> }
                        </button>
                        <button
                            className="rounded-full bg-accent-mid hover:bg-accent-light px-4 py-2 cursor-pointer transition-colors"
                            aria-label="Next recipe"
                            onClick={() => setSpotlightIndex((i) => (i >= heroRecipes.length - 1 ? 0 : i + 1))}
                        >
                            <i className="fa-solid fa-chevron-right" />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default HeroesMobile
