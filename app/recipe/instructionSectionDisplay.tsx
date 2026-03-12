'use client'

import dynamic from "next/dynamic"
import { IngredientSection, InstructionSection } from "../models/recipe"
import Image from 'next/image'
import { IngredientProps } from "./ingredientSectionDisplay"
import { InstructionImageDisplayProps } from "./instructionImageDisplay"
import { useEffect, useState } from "react"

export type InstructionProps = {
    instructionSectionList: InstructionSection[]
    ingredientSectionList: IngredientSection[]
}
const InstructionSectionDisplay = ({ instructionSectionList, ingredientSectionList }: InstructionProps) => {

    const [hasImages, setHasImages] = useState<boolean>(false)

    const DynamicIngredientDisplay = dynamic<IngredientProps>(
        () => import('./ingredientSectionDisplay'),
        { loading: () => <div>Loading...</div> }
    )

    const DynamicImageDisplay = dynamic<InstructionImageDisplayProps>(
        () => import('./instructionImageDisplay'),
        { loading: () => <div>Loading...</div> }
    )

    useEffect(() => {
        instructionSectionList.map((section: InstructionSection) => {
            if (section.image) {
                setHasImages(true)
                return
            }
        })
    }, [instructionSectionList])

    return (
        <div className="relative flex flex-row w-full ">
            {/* Ingredient Sections  */}
            <div className={`w-[30%] absolute -top-12 -left-[32%] bg-card rounded-lg shadow-lg p-4 
                    ${ ingredientSectionList.length == 1 ? 'hidden' : ''}
                `}>
                <div>
                    <p className="text-2xl font-bold">Ingredients</p>
                </div>
                <div>
                    <DynamicIngredientDisplay ingredientSectionList={ ingredientSectionList } />
                </div>
            </div>
            <ul className="w-full flex flex-col px-4">
                {
                    instructionSectionList.map((instructionSection: InstructionSection, index: number) => (
                        <li key={ index } className="p-4 flex flex-row w-full">
                            <div className="p-4 bg-accent w-full rounded-lg">
                                <p className="font-bold text-lg">{ instructionSection.sectionName }</p>
                                <div>
                                    <ul className="ml-6">
                                        {
                                            instructionSection.steps.map((value: string, iIndex: number) => (
                                                <li key={iIndex} className={`flex flex-row space-x-2 w-full py-1`}>
                                                    <div className="flex flex-row space-x-6 items-center">
                                                        <p>{ iIndex + 1 }</p>
                                                        <p>{ value }</p>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
            
                        </li>
                    ))
                }
            </ul>
            <div className={`w-[30%] absolute -top-12 -right-[32%] bg-card rounded-lg p-4 ${ !hasImages ? 'hidden' : '' }`}>
                <DynamicImageDisplay instructionSections={ instructionSectionList }/>
                {/* {
                    instructionSectionList.map((instructionSection: InstructionSection, index: number) => (
                        
                        instructionSection.image &&
                        <div key={ index } className={`p-4 mt-4 bg-accent rounded-lg inset-shadow-sm inset-shadow-text `}>
                            <p className="font-bold">{ instructionSection.sectionName }</p>
                            <Image className={`rounded-2xl h-1/2 w-auto`} src={ instructionSection.image }
                                width={150} height={0} alt={ "Image of the Recipe, plated nicely" }
                            />
                        </div>
                        
                    ))
                } */}
            </div>
        </div>  
    )
}

export default InstructionSectionDisplay
