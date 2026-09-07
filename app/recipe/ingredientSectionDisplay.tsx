'use client'

import { Dispatch, SetStateAction } from "react"
import { Ingredient, IngredientSection, Note } from "../models/recipe"
import { convertForDisplay, UnitSystem } from "../utilities/unitConversion"
import QuantityDisplay from "./quantityDisplay"
import UnitSystemToggle from "./unitSystemToggle"

export type IngredientSectionDisplayProps = {
    ingredientSectionList: IngredientSection[]
    ingredientNotes: Note[]
    scale: number
    servings: number
    // The setter useState<number>() gives you - accepts either a plain value
    // or an updater `(prev) => next`, which is what the +/- buttons use below.
    // `(s: any) => number` isn't it: that describes a function that RETURNS a
    // number, not React's setter (which returns void and takes the union type).
    setServings: Dispatch<SetStateAction<number>>
    unitSystem: UnitSystem
    setUnitSystem: Dispatch<SetStateAction<UnitSystem>>
    checkedIngredients: Set<string>
    setCheckedIngredients: Dispatch<SetStateAction<Set<string>>>
}

const toggle = (set: Set<string>, key: string) => {
    const copy = new Set(set)
    if (copy.has(key)) copy.delete(key)
    else copy.add(key)
    return copy
}

const IngredientSectionDisplay = ({
    ingredientSectionList,
    ingredientNotes,
    scale,
    servings,
    setServings,
    unitSystem,
    setUnitSystem,
    checkedIngredients,
    setCheckedIngredients,
}: IngredientSectionDisplayProps) => {

    return (
        <aside className="bg-surface-sunken rounded-3xl p-8
                  sticky top-21 max-h-[80rem] flex flex-col">

            <div className="flex flex-row justify-between">
                {/* Title */}
                <div className="flex flex-col justify-center h-10">
                    <h2 className="text-3xl font-black text-brand-dark">Ingredients</h2>
                    <p className={`text-sm text-text-secondarytransition-all duration-500 ${scale === 1 ? 'opacity-0 -mt-10' : 'opacity-100 mt-1'}`}>
                        {
                            scale > 1 ?
                                `Scaled up to ${servings}` :
                                `Scaled down to ${servings}`
                        }
                    </p>
                </div>

                {/* Servings */}
                <div className="flex flex-row items-center">
                    <button
                        onClick={() => setServings((s) => Math.max(1, s - 1))}
                        aria-label="Fewer servings"
                        className="w-9 h-9 mt-3 rounded-full bg-accent-mid text-brand-dark hover:bg-accent-light border border-border-hairline
                                   text-brand-dark text-lg leading-none cursor-pointer transition-colors"
                    >
                        &minus;
                    </button>

                    <div className="text-center">
                        <p className="text-[0.65rem] font-bold tracking-[0.18em] text-brand-deep uppercase">Serves</p>
                        <p className="text-2xl font-black text-brand-dark mt-1">{servings}</p>
                    </div>

                    <button
                        onClick={() => setServings((s) => s + 1)}
                        aria-label="More servings"
                        className="w-9 h-9 mt-3 rounded-full bg-accent-mid text-brand-dark hover:bg-accent-light border border-border-hairline
                                   text-brand-dark text-lg leading-none cursor-pointer transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            <UnitSystemToggle unitSystem={unitSystem} onChange={setUnitSystem} />

            <div className="border-t border-border-subtle my-6" />

            <div className="flex flex-col gap-y-6 mt-6 overflow-y-scroll h-full ingredient-scrollbar">
                {
                    ingredientSectionList.map((section, sIndex) => (
                        <div key={sIndex}>
                            {section.sectionName && (
                                <p className="text-sm font-bold text-brand-deep mb-3">{section.sectionName}</p>
                            )}

                            <ul className="flex flex-col gap-y-3 pl-4">
                                {
                                    section.ingredients.map((ing: Ingredient, iIndex: number) => {
                                        const key = `${sIndex}-${iIndex}`
                                        const checked = checkedIngredients.has(key)
                                        const converted = convertForDisplay(ing.quantity * scale, ing.measurement, ing.conversionType, unitSystem, ing.gramWeight)
                                        return (
                                            <li key={key}>
                                                <div
                                                    className="w-full flex flex-row items-baseline items-center gap-x-3 text-left group"
                                                >
                                                    <span className={`shrink-0 w-5 h-5 cursor-pointer rounded-full border transition-colors ${
                                                            checked ? 'bg-brand border-brand' : 'border-border-subtle group-hover:border-brand'
                                                        }`}
                                                        onClick={() => setCheckedIngredients((prev) => toggle(prev, key))}
                                                    />
                                                    <p className={`w-24 shrink-0 font-bold text-brand-dark text-sm flex items-center gap-x-1 ${
                                                        checked ? 'line-through opacity-40' : ''
                                                    }`}>
                                                        <QuantityDisplay value={converted.parts} />
                                                        {converted.unit && <span>{converted.unit}</span>}
                                                    </p>
                                                    <p className={`text-sm text-text-primary ${
                                                        checked ? 'line-through opacity-40' : ''
                                                    }`}>
                                                        {ing.name}
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>

            {
                ingredientNotes.map((note) => (
                    <div key={note.id} className="bg-page rounded-xl px-4 py-3 mt-6">
                        {note.displayName && (
                            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-brand uppercase">
                                {note.displayName}
                            </p>
                        )}
                        <p className="text-sm text-text-secondary mt-1">{note.content}</p>
                    </div>
                ))
            }
        </aside>
    )
}

export default IngredientSectionDisplay
