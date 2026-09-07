'use client'

import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import { InstructionSection, Note } from "../models/recipe"

export type InstructionSectionDisplayProps = {
    instructionSectionList: InstructionSection[]
    kitchenNotes: Note[]
    doneSteps: Set<string>
    setDoneSteps: Dispatch<SetStateAction<Set<string>>>
    totalSteps: number
    // Fallback alt text when a section has neither its own image caption nor a section name.
    recipeName: string
}

const toggle = (set: Set<string>, key: string) => {
    const copy = new Set(set)
    if (copy.has(key)) copy.delete(key)
    else copy.add(key)
    return copy
}

const InstructionSectionDisplay = ({
    instructionSectionList,
    kitchenNotes,
    doneSteps,
    setDoneSteps,
    totalSteps,
    recipeName,
}: InstructionSectionDisplayProps) => {

    let stepCounter = 0

    return (
        <section className="flex flex-col space-y-8 ">
            {/* header — never moves */}
            <div className="sticky top-21 z-10 pb-2 bg-page">
                <div className="bg-surface-sunken rounded-3xl p-8">
                    <h2 className="text-4xl font-black text-brand-dark">Instructions</h2>
                    <p className="text-text-muted mt-1">
                        Tap a step number to cross it off
                    </p>
                    <div className="h-2 rounded-full bg-brand-wash mt-5 overflow-hidden">
                        <div
                            className="h-full bg-brand-soft transition-all duration-300"
                            style={{ width: totalSteps ? `${(doneSteps.size / totalSteps) * 100}%` : '0%' }}
                        />
                    </div>
                </div>
            </div>


            <div className="flex flex-col no-scrollbar">
                <div className="flex flex-col gap-y-8">
                    {
                        instructionSectionList.map((section, sIndex) => (
                            <div key={sIndex}>
                                { section.sectionName && (
                                    <h3 className="text-xl font-black text-brand-deep mb-4">{ section.sectionName }</h3>
                                )}

                                { section.image && (
                                    <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden mb-5 bg-brand-wash">
                                        <Image className="object-cover" src={section.image} fill
                                            sizes="(max-width: 1024px) 100vw, 700px"
                                            alt={section.metadata.altText || section.sectionName || recipeName} />
                                    </div>
                                )}

                                <ol className="flex flex-col gap-y-5">
                                    {
                                        section.steps.map((step, stepIndex) => {
                                            const key = `${sIndex}-${stepIndex}`
                                            const done = doneSteps.has(key)
                                            stepCounter += 1
                                            const number = stepCounter
                                            return (
                                                <li key={key} className="w-full flex flex-row items-start gap-x-5 text-left group">
                                                    <button
                                                        onClick={() => setDoneSteps((prev) => toggle(prev, key))}
                                                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer
                                                                font-black text-sm transition-colors bg-accent-mid text-brand-dark hover:bg-accent-light`}>
                                                        { number }
                                                    </button>
                                                    <p className={`text-lg leading-relaxed pt-1 transition-opacity ${
                                                        done ? 'line-through opacity-40 text-text-muted' : 'text-text-secondary'
                                                    }`}>
                                                        { step }
                                                    </p>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                        ))
                    }
                </div>


                {
                    kitchenNotes.map((note) => (
                        <div key={note.id} className="bg-brand-wash rounded-2xl px-8 py-6 mt-10">
                            <p className="text-[0.65rem] font-bold tracking-[0.18em] text-brand uppercase">
                                { note.displayName || 'From my kitchen' }
                            </p>
                            <p className="text-lg text-text-secondary mt-2 leading-relaxed">{ note.content }</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default InstructionSectionDisplay
