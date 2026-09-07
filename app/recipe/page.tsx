'use client'

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import ThymeAPI from "../api/thyme/thymeAPI"
import { Ingredient, Note, Recipe } from "../models/recipe"
import { convertForDisplay, UnitSystem } from "../utilities/unitConversion"
import IngredientSectionDisplay from "./ingredientSectionDisplay"
import Masthead from "./masthead"
import InstructionSectionDisplay from "./instructionSectionDisplay"

/** 90 -> "1 hr 30", 45 -> "45 min" */
const formatTime = (mins: number): string => {
    if (!mins) return '-'
    if (mins < 60) return `${mins} min`
    const hours = Math.floor(mins / 60)
    const rest = mins % 60
    return rest ? `${hours} hr ${rest}` : `${hours} hr`
}

const Cooking = () => (
    <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="bg-surface-raised rounded-2xl shadow-lg px-10 py-8 animate-pulse">
            <p className="font-bold text-xl text-brand-deep">Cooking...</p>
        </div>
    </div>
)

const RecipeView = () => {

    const searchParams = useSearchParams()
    const recipeId: string | null = searchParams.get('recipeId')

    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [failed, setFailed] = useState(false)
    const [servings, setServings] = useState<number>(0)
    const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set())
    const [doneSteps, setDoneSteps] = useState<Set<string>>(new Set())
    // Lazy-initialized (not via effect) so there's no race with the persist
    // effect below overwriting a stale default before restoration lands.
    const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
        if (typeof window === 'undefined') return 'metric'
        try {
            const saved = window.localStorage.getItem('thyme:unitSystem')
            return saved === 'metric' || saved === 'imperial' ? saved : 'metric'
        } catch {
            return 'metric'
        }
    })

    useEffect(() => {
        if (!recipeId) return
        ThymeAPI.getRecipe(recipeId)
            .then((response: Recipe) => {
                console.debug("Recieved recipe: ", response)
                setRecipe(response)
                setServings(response.totalServings || 1)
            })
            .catch((error) => {
                console.error("[ERROR] failed to load recipe: ", error)
                setFailed(true)
            })
    }, [recipeId])

    // Persist the metric/imperial preference (not recipe-specific)
    useEffect(() => {
        try {
            window.localStorage.setItem('thyme:unitSystem', unitSystem)
        } catch {
            // preference simply will not persist
        }
    }, [unitSystem])

    // Restore step progress for this recipe
    useEffect(() => {
        if (!recipeId) return
        try {
            const saved = window.localStorage.getItem(`thyme:steps:${recipeId}`)
            if (saved) setDoneSteps(new Set(JSON.parse(saved)))
        } catch {
            // private mode or cleared storage - just start fresh
        }
    }, [recipeId])

    useEffect(() => {
        if (!recipeId || !recipe) return
        try {
            window.localStorage.setItem(`thyme:steps:${recipeId}`, JSON.stringify([...doneSteps]))
        } catch {
            // progress simply will not persist
        }
    }, [doneSteps, recipeId, recipe])

    const scale = useMemo(() => {
        if (!recipe || !recipe.totalServings) return 1
        return servings / recipe.totalServings
    }, [recipe, servings])

    const totalSteps = useMemo(
        () => recipe?.instructionSection.reduce((sum, s) => sum + s.steps.length, 0) ?? 0,
        [recipe]
    )

    if (failed) {
        return (
            <div className="w-full h-[60vh] flex flex-col gap-y-4 justify-center items-center">
                <p className="text-2xl font-bold text-brand-deep">That recipe went missing.</p>
                <Link href="/recipes" className="text-accent-strong font-semibold hover:underline">
                    &larr; Back to the book
                </Link>
            </div>
        )
    }

    if (!recipe) return <Cooking />

    const ingredientNotes = recipe.notes.filter((n: Note) => n.placement === 'ingredients')
    const kitchenNotes = recipe.notes.filter((n: Note) => n.placement !== 'ingredients')

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">

            <Link href="/recipes" className="inline-block text-accent-strong font-semibold hover:underline">
                &larr; Back to the book
            </Link>

            {/* Masthead */}
            <Masthead
                name={recipe.name}
                description={recipe.description}
                tags={recipe.tags}
                heroImage={recipe.heroImage}
            />

            {/* Body */}
            <div className="grid lg:grid-cols-[minmax(0,400px)_1fr] p-2 gap-12 mt-14 items-start">

                {/* Left rail */}
                <IngredientSectionDisplay
                    ingredientSectionList={recipe.ingredientSection}
                    ingredientNotes={ingredientNotes}
                    scale={scale}
                    servings={servings}
                    setServings={setServings}
                    unitSystem={unitSystem}
                    setUnitSystem={setUnitSystem}
                    checkedIngredients={checkedIngredients}
                    setCheckedIngredients={setCheckedIngredients}
                />

                {/* Instructions */}
                <InstructionSectionDisplay
                    instructionSectionList={recipe.instructionSection}
                    kitchenNotes={kitchenNotes}
                    doneSteps={doneSteps}
                    setDoneSteps={setDoneSteps}
                    totalSteps={totalSteps}
                    recipeName={recipe.name}
                />

            </div>
            <div className="mt-8 grid col-span-1 border-b-1 border-brand-deep self-stretch w-10/12 mx-auto"/>
        </div>
    )
}

const RecipePage = () => (
    <Suspense fallback={<Cooking />}>
        <RecipeView />
    </Suspense>
)

export default RecipePage
