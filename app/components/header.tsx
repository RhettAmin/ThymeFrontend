'use client'

import { motion } from 'framer-motion'
import { setActiveView } from "@/lib/features/view/viewSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { useEffect, useState } from "react"

const Header = () => {

    

    const dispatch = useAppDispatch()
    const views = useAppSelector(state => state.ViewController.views)
    const setActiveViewInController = (value: number) => {
        dispatch(setActiveView(value))
    }

    // Used to shift the header
    // const [hasScrolled, setHasScrolled] = useState<boolean>(false)
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setHasScrolled(window.scrollY > 20)
    //     }

    //     window.addEventListener('scroll', handleScroll)
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [])

    return (
        <motion.header
            className={`
                fixed w-full top-0 z-50 pointer-events-none
                transition-all duration-300
            `}
        >

            <nav className="w-full max-w-[1600] mx-auto flex flex-row justify-between py-4 bg-page pointer-events-auto">
                {/* Brand */}
                <div className={`w-fullfont-bold pt-3 text-4xl`}
                >
                    <Link href={views[0].path}
                        className=" text-accent font-bold cursor-pointer hover:text-background" 
                        onClick={() => setActiveViewInController(0)}
                    >
                        Thyme to Dine

                    </Link>
                </div>

                {/* Routes */}
                <div className={`font-bold pt-6`}>
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