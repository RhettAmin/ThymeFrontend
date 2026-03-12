'use client'
import { motion } from 'framer-motion'
import { useState } from "react"
import { Recipe } from "@/app/models/recipe"
import Image from "next/image"
import { Button } from '@/app/components/button'
import Link from 'next/link'

interface heroProps {
    heroRecipes: Recipe[]
}

const Heroes = ({ heroRecipes }: heroProps) => {

    const [isAnimationComplete, setIsAnimationComplete] = useState(false)
    const [spotlightIndex, setSpotlightIndex] = useState(0)

    const positions = [
        { x: 380, y: -220, scale: 1.3, opacity: 1 },    // Spotlight
        { x: 200, y: 40, scale: 0.7, opacity: 0.7 },     // 2nd
        { x: 550, y: 110, scale: 0.5, opacity: 0.5 },    // 3rd
    ]

    const getSlotForIndex = (itemIndex: number, spotlightIndex: number) => {
        // Spotlight is always in slot 0 (top)
        if (itemIndex === spotlightIndex) return 0
        
        // Other items fill remaining slots
        const diff = (itemIndex - spotlightIndex + 3) % 3
        return diff === 1 ? 1 : 2  // Next item goes right, previous goes left
    }

    return (
            <div className="relative h-[600px] flex items-center justify-center">
                {
                    heroRecipes && heroRecipes.length === 3 &&
                        heroRecipes.map((item, index) => {
                            const slot = getSlotForIndex(index, spotlightIndex)
                            const position = positions[slot]
                            const isSpotlight = slot === 0
                            
                            return (
                                <motion.div
                                    key={`hero-${index}`}
                                    animate={{
                                        x: position.x,
                                        y: position.y,
                                        scale: position.scale,
                                        opacity: position.opacity,
                                        width: isSpotlight ? '550px' : '150px'
                                    }}
                                    transition={{ 
                                        x: { duration: 0.5, ease: "easeIn" },
                                        y: { duration: 0.5, ease: "easeIn" },
                                        opacity: { duration: 0.8, ease: "easeInOut" },

                                        scale: { 
                                            duration: 0.5, 
                                            delay: slot === 0 ? 0.5 : 0,
                                            ease: "easeInOut" 
                                        },
                                        width: { 
                                            duration: 0.3, 
                                            delay: isSpotlight ? 0.5 : 0,  // Width expands AFTER position changes
                                            ease: "easeInOut" 
                                        }
                                    }}
                                    onAnimationStart={ () => setIsAnimationComplete(false) }
                                    onAnimationComplete={ () => {
                                        setTimeout(() => setIsAnimationComplete(true), 1) 
                                    }}
                                    onClick={() => {
                                        console.log(`Clicked item ${index}`)
                                        setSpotlightIndex(index)
                                    }}
                                    className={`absolute cursor-pointer hover:opacity-100! flex flex-row items-center
                                                ${ isSpotlight ? '' : ''} `} // 
                                    style={{ zIndex: isSpotlight ? 10 : 5 }}
                                >
                                    <Image 
                                        src={item.mainImage} 
                                        alt={item.name}
                                        width={200}
                                        height={250}
                                        className={` ${ isSpotlight ? 'rounded-l-lg shadow-lg' : 'rounded-lg'}`}
                                    />
                                
                                    {
                                        isSpotlight && isAnimationComplete && (
                                            <motion.div
                                                key={`text-${index}`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ 
                                                    delay: 0.10,  
                                                    duration: 0.3,
                                                    ease: "anticipate"
                                                }}
                                                className="px-2 py-4 -ml-1 h-[200px] flex flex-col rounded-r-lg 
                                                justify-center items-center text-center space-y-2 
                                                border-t-1 border-r-1 border-b-1 bg-card"
                                            >
                                                <h3 className="text-lg font-bold">{item.name}</h3>
                                                <p className="text-sm h-full text-thymeGray">{item.description}</p>
                                                <div className="px-8 w-full">
                                                    <Link href={`/recipe?recipeId=${ item.recipeId }`}>
                                                        <Button message={"Make it!"}/>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )
                                    }

                                </motion.div>
                            )
                        })
                }
            </div>
    )

}   

export default Heroes