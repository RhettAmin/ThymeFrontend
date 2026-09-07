'use client'

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveView } from "@/lib/features/view/viewSlice"

const socials = [
    { label: "ig", href: "#" },
]

const pages = [
    { label: "Home", viewIndex: 0 },
    { label: "All Recipes", viewIndex: 1 },
    { label: "About", viewIndex: 2 },
]

const Footer = () => {

    const dispatch = useAppDispatch()
    const views = useAppSelector(state => state.ViewController.views)

    return (
        <footer className="flex flex-col w-full bg-brand-dark rounded-t-3xl px-8 py-12 md:px-16 md:py-16">
            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">

                {/* Brand */}
                <div className=" flex flex-row justify-between">
                    <div className="flex items-center gap-2.5">
                        <p className="text-2xl font-black text-page cursor-pointer">Thyme to Dine</p>
                    </div>

                    <div className=" flex flex-col">
                        <p className="text-sm text-page/60 mt-4 max-w-[38ch] leading-relaxed">
                            Handmade recipes, yadda yadda lorum ipsum
                        </p>
                        <div className="flex gap-3 mt-6">
                            {
                                socials.map((social) => (
                                    <a key={social.label} href={social.href}
                                        className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-[0.65rem] font-bold uppercase text-page hover:bg-brand-soft transition-colors cursor-pointer"
                                    >
                                        { social.label }
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Site pages */}
                <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] text-page/40 uppercase mb-4">The Site</p>
                    <ul className="flex flex-col gap-y-3">
                        {
                            pages.map((page) => (
                                <li key={page.label}>
                                    <Link href={views[page.viewIndex].path}
                                        className="text-sm text-page/80 hover:text-page transition-colors cursor-pointer"
                                        onClick={() => dispatch(setActiveView(page.viewIndex))}
                                    >
                                        { page.label }
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className="w-full mx-auto mt-12 pt-6 border-t border-page/10">
                <p className="text-[0.6rem] tracking-[0.15em] uppercase text-page/30">
                    &copy; { new Date().getFullYear() } &middot; Thyme to Dine &middot; 
                </p>
            </div>
        </footer>
    )
}

export default Footer
