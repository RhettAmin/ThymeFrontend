'use client'

import Image from "next/image"

const Footer = () => {


    return (
        <footer className="h-full flex flex-row justify-evenly items-center bg-ThymeRootBrown rounded-t-3xl p-8">

            {/* Brand */}
            <div>
                <p className="cursor-pointer">Thyme to Dine</p>
            </div>

            {/* Site Map */}
            <div>
                <ul>
                    <li className="cursor-pointer">All Recipes</li>
                    <li className="cursor-pointer">About</li>
                </ul>
            </div>

            {/* Socials */}
            <div>
                <ul>
                    <li className="cursor-pointer">Email</li>
                    <li className="flex flex-row cursor-pointer">Instagram 
                        <span className="pl-2">
                            <Image src="/static/Instagram_logo.png" width={15} height={15} 
                                priority={true} alt={"Instagram logo"} />
                        </span>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer