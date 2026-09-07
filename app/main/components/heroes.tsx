'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import { Recipe } from "@/app/models/recipe"
import Image from "next/image"
import { Button } from '@/app/components/button'
import Link from 'next/link'
import { HourRoundingToString } from '@/app/utilities/utils'

interface heroProps {
    heroRecipes: Recipe[]
}

const Heroes = ({ heroRecipes }: heroProps) => {

    const [isAnimationComplete, setIsAnimationComplete] = useState(false)
    const [spotlightIndex, setSpotlightIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const wiggleControls = useAnimation()
    const positions = [
        { left: '75%', top: '50%', width: '42%', opacity: 1, size: 300 },    // Spotlight
        { left: '25%', top: '35%', width: '20%', opacity: 0.7, size: 200 },  // 2nd
        { left: '45%', top: '75%', width: '16%', opacity: 0.5, size: 200 }, // 3rd
    ]

    useEffect(() => {
        if (isPaused || !heroRecipes || heroRecipes.length !== 3) return

        timerRef.current = setInterval(() => {
            setSpotlightIndex((prev) => (prev + 1) % heroRecipes.length)
        }, 3000)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isPaused, heroRecipes])

    const getSlotForIndex = (itemIndex: number, spotlightIndex: number) => {
        // Spotlight is always in slot 0 (top)
        if (itemIndex === spotlightIndex) return 0
        
        // Other items fill remaining slots
        const diff = (itemIndex - spotlightIndex + 3) % 3
        return diff === 1 ? 1 : 2  // Next item goes right, previous goes left
    }

    return (
        <div className="w-full max-w-[1600] h-full max-w-[1080] mx-auto flex flex-row justify-center items-center aspect-[16/10]">
            
            {/* Soup Pot */}
            <div className="flex flex-col items-center space-y-6 space-x-12">
                {/* Outer pot shell */}
                <div className="w-[50vw] max-w-[800px] h-[50vw] max-h-[800px] rounded-full bg-steel shadow-mg flex items-center justify-center">
                    {/* Inner soup */}
                    <div className="w-[45vw] max-w-[700px] h-[45vw] max-h-[700px] relative rounded-full bg-accent-mid shadow-sm">
                        {
                            heroRecipes && heroRecipes.length >= 3 &&
                            heroRecipes.map((item, index) => {
                                const slot = getSlotForIndex(index, spotlightIndex)
                                const position = positions[slot]
                                const isSpotlight = slot === 0
                                return (
                                    <motion.div
                                        key={`hero-${index}`}
                                        animate={{
                                            left: position.left,
                                            top: position.top,
                                            width: position.width,
                                            opacity: position.opacity,
                                        }}
                                        transition={{
                                            left: { duration: 0.5, ease: "easeInOut" },
                                            top: { duration: 0.5, ease: "easeInOut" },
                                            opacity: { duration: 0.8, ease: "easeInOut" },
                                            width: {
                                                duration: 0.1,
                                                delay: isSpotlight ? 0.5 : 0,
                                                ease: "easeInOut"
                                            }
                                        }}
                                        onAnimationStart={() => setIsAnimationComplete(false)}
                                        onAnimationComplete={() => {
                                            setTimeout(() => setIsAnimationComplete(true), 1)
                                        }}
                                        onClick={() => setSpotlightIndex(index)}
                                        className="absolute cursor-pointer hover:opacity-100! rounded-full"
                                        style={{ x: '-50%', y: '-50%', zIndex: isSpotlight ? 10 : 5 }}
                                    >
                                        <div className={`relative w-full aspect-[4/4]  overflow-hidden `}>
                                            <Image
                                                src={item.mainImage}
                                                alt={item.name}
                                                width={position.size}
                                                height={position.size}
                                                className="object-cover rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Soup Rotater  */}
                <div className="flex flex-row space-x-4 z-1">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="rounded-full bg-accent-mid hover:bg-accent-light
                        hover:z-10 hover:shadow-md px-4 py-2 cursor-pointer border-1"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                            setSpotlightIndex(spotlightIndex <= 0 ? heroRecipes.length - 1 : spotlightIndex - 1)
                        }}
                    >
                        <i className="fa-solid fa-chevron-left"/>
                    </motion.button>
                    {/* {
                        heroRecipes.map((_, index) => {
                            const slot = getSlotForIndex(index, spotlightIndex)
                            const isSpotlight = slot === 0
                            
                        return (
                            <motion.button 
                                key={index}
                                whileTap={{ scale: 0.9 }} 
                                whileHover={{ scale: 1.1 }}
                                className={`flex items-center justify-center font-bold rounded-full 
                                    cursor-pointer self-stretch border-1 hover:bg-accent-light hover:z-10 
                                    hover:shadow-md
                                    ${isSpotlight ? 'bg-accent-mid w-10' : 'bg-accent-tint w-6'}`}
                                onClick={() => setSpotlightIndex(index)}
                            >
                                {index}
                            </motion.button>
                        )})
                    } */}
                    <motion.button 
                        whileTap={{ scale: 0.9 }} 
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full bg-accent-mid hover:bg-accent-light
                        hover:z-10 hover:shadow-md px-4 py-2 cursor-pointer border-1"
                        onClick={() => setIsPaused(!isPaused)}
                    >
                        {
                            isPaused ?
                            <i className="fa-solid fa-play w-[10px]"></i> :
                            <i className="fa-solid fa-pause"></i>
                        }
                    </motion.button>

                    <motion.button 
                        whileTap={{ scale: 0.9 }} 
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full bg-accent-mid hover:bg-accent-light
                        hover:z-10 hover:shadow-md px-4 py-2 cursor-pointer border-1"
                        onClick={() => setSpotlightIndex(spotlightIndex >= heroRecipes.length-1 ? 0 : spotlightIndex+1 )}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </motion.button>
                    
                </div>
            </div>
            
            {/* Recipe Descipion */}
            <div className="w-[50%] h-full flex items-center relative">
                <motion.div
                    key={spotlightIndex}
                    initial={{ x: "-20%", opacity: 0 }}
                    animate={{
                        left: "20%",
                        opacity: 1,
                    }}
                    transition={{
                        left: { duration: 0.75, ease: "easeInOut" },
                        opacity: { duration: 1.8, ease: "easeInOut" },
                    }}
                    className="absolute w-full max-w-[800px] h-full max-h-[1080px] flex flex-col justify-center"
                >
                    <h6 className="font-bold text-md text-text-secondary uppercase">Freshly Cooked</h6>
                    <div className="flex flex-col space-y-8 ">
                        <h3 className="font-bold text-5xl">{ heroRecipes[spotlightIndex].name }</h3>
                        <p className="text-lg">{ heroRecipes[spotlightIndex].description }</p>
                        <div className="flex flex-row space-x-4">
                            {
                                heroRecipes[spotlightIndex].tags.map((tag, index) => (
                                    <p key={index} className="px-4 py-1 bg-brand-wash font-bold text-brand-dark rounded-full">{tag}</p>
                                ))
                            }
                        </div>
                        <div className="flex flex-row space-x-10 border-t-1 border-b-1 border-border-subtle py-6 px-4">
                            <div className="text-center">
                                <p className="text-text-muted text-sm uppercase">Time to Plate</p>
                                <p className="font-bold text-lg">
                                    { HourRoundingToString(heroRecipes[spotlightIndex].totalTime) }
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-text-muted text-sm uppercase">Serves</p>
                                <p className="font-bold text-lg">{ heroRecipes[spotlightIndex].totalServings } </p>
                            </div>
                        </div>
                        <button className="bg-accent-mid hover:bg-accent-light cursor-pointer hover:scale-105 rounded-lg shadow-md px-12 py-4 font-bold uppercase">
                            Cook it
                        </button>
                    </div>
                </motion.div>
            </div>

            
        </div>
    )

}   

export default Heroes