'use client'
import { motion, useMotionValue, useTransform, animate } from "motion/react"

type PageControlProps = {
    currentIndex: number
    totalPages: number
    onSelect: (page: number) => void
}

export const PageControl = ({ currentIndex, totalPages, onSelect }: PageControlProps) => {
    if (totalPages <= 1) return null

    return (
        <div className="flex flex-row items-center space-x-4">
            <button
                onClick={() => onSelect(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="bg-accent-mid hover:bg-accent-light disabled:opacity-0 disabled:cursor-default
                           text-black cursor-pointer border-1 transition-all duration-200
                           flex justify-center items-center font-semibold px-2 py-2 rounded-lg shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
            </button>

            <div className="flex flex-row space-x-4">
                {
                    Array.from({ length: totalPages }, (_, i) => (
                        <motion.div key={i}
                            onClick={() => onSelect(i)}
                            className={`cursor-pointer transition-all duration-200 rounded-lg shadow-md ${
                                currentIndex === i
                                    ? 'px-4 py-2 bg-accent-mid border font-bold'
                                    : 'px-4 py-2 bg-accent-tint border'
                            }`}
                        >
                            { i + 1 }
                        </motion.div>
                    ))
                }
            </div>

            <button
                onClick={() => onSelect(currentIndex + 1)}
                disabled={currentIndex === totalPages - 1}
                className="bg-accent-mid hover:bg-accent-light disabled:opacity-0 disabled:cursor-default
                           text-black cursor-pointer border-1 transition-all duration-200
                           flex justify-center items-center font-semibold px-2 py-2 rounded-lg shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
            </button>
        </div>
    )
}

