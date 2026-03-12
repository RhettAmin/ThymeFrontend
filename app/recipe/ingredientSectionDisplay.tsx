'use client'

import { Ingredient, IngredientSection } from "../models/recipe"

export type IngredientProps = {
    ingredientSectionList: IngredientSection[]
}
const IngredientSectionDisplay = ({ingredientSectionList}: IngredientProps) => {

    return (
        <ul className="w-full grid grid-cols-1 gap-2 justify-center">
            {
                ingredientSectionList.map((ingredientSection: IngredientSection, index: number) => (
                    <li key={ index } className="p-4 cols-span-1 mt-4">
                        <p className="font-bold text-lg">{ ingredientSection.sectionName }</p>
                        <ul className="ml-6">
                            {
                                ingredientSection.ingredients.map((ingredient: Ingredient, iIndex: number) => (
                                    <li key={iIndex} className={`flex flex-row space-x-2 w-full  py-1`}>
                                        <div className="flex flex-row w-30 space-x-1">
                                            <p>{ ingredient.quantity }</p>
                                            <p>{ ingredient.measurement }</p>
                                        </div>
                                        <div className="flex w-full">
                                            <p className="capitalize font-bold">{ ingredient.name }</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                ))
            }
        </ul>
    )
}

export default IngredientSectionDisplay


// OPtion A - Multiple groups
// Each group has it's ingredients listed in a 3 column grid
// {
//                 ingredientSectionList.map((ingredientSection: IngredientSection, index: number) => (
//                     <li key={ index } className="px-2">
//                         <p className="font-bold text-lg">{ ingredientSection.sectionName }</p>
//                         <ul className="grid grid-cols-3 ml-6">
//                             {
//                                 ingredientSection.ingredients.map((ingredient: Ingredient, iIndex: number) => (
//                                     <li key={iIndex} className={`col-span-1 flex flex-row space-x-2 w-full py-1`}>
//                                         <div className="flex flex-row w-30 space-x-1">
//                                             <p>{ ingredient.quantity }</p>
//                                             <p>{ ingredient.measurement }</p>
//                                         </div>
//                                         <div className="flex w-full">
//                                             <p className="capitalize">{ ingredient.name }</p>
//                                         </div>
//                                     </li>
//                                 ))
//                             }
//                         </ul>
//                     </li>
//                 ))
//             }