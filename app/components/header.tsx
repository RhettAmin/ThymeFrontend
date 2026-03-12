'use client'

import { motion } from 'framer-motion'
import { setActiveView } from "@/lib/features/view/viewSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { useEffect, useState } from "react"

const Header = () => {

    const [hasScrolled, setHasScrolled] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const views = useAppSelector(state => state.ViewController.views)
    const setActiveViewInController = (value: number) => {
        dispatch(setActiveView(value))
    }

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 20)
            console.log("scroll: ", window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            className={`
                fixed top-0 left-0 right-0 z-50
                transition-all duration-300 bg-ThymePrimary rounded-b-3xl px-24
                ${ hasScrolled ? 
                    'h-12' :
                    'shadow-md h-18'
                }
            `}
        >
            
            <nav className="flex flex-row justify-between">
                {/* Brand */}
                <motion.div
                    className={`font-bold transition-all duration-300
                        ${ hasScrolled ? 
                            'pt-1.5 text-3xl' :
                            'pt-3 text-5xl'
                        }
                    `}
                >
                    <Link href={views[0].path}
                        className=" text-accent font-bold cursor-pointer hover:text-background" 
                        onClick={() => setActiveViewInController(0)}
                    >
                        THYME TO DINE

                    </Link>
                </motion.div>

                {/* Routes */}
                <div className={`font-bold transition-all duration-300
                        ${ hasScrolled ? 
                            'pt-2.5' :
                            'pt-6'
                        }
                    `}>
                    <ul className="flex flex-row space-x-4 text-accent font-bold justify-center text-xl">
                        <Link href={views[1].path} className="cursor-pointer hover:text-thymeChive" onClick={() => setActiveViewInController(1)}>All Recipes</Link>
                        <Link href={views[2].path} className="cursor-pointer hover:text-thymeChive" onClick={() => setActiveViewInController(2)}>About</Link>
                    </ul>
                </div>
            </nav>

        </motion.header>
    )
}

export default Header