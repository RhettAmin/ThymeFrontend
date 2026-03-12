'use client'

import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { aboutMe } from "../config"

const About = () => {

    const paragraph = <div className="prose-lg">
            <p>
                Welcome to Thyme to Dine! This is my recipe blog where you&apos;ll find a variety of recipes that I was interested in making, inspired to create
                or just really wanted to eat. All the recipes in this blog can be updated or improved upon at anytime so keep an eye out for changes.
            </p>
            <p>Thanks for checking out the blog!</p>
        </div>

    return (        
        // Outer Container
        <div className="flex w-[70%] mx-auto justify-center items-center ">

            {/* Main Content */}
            <div id="recipeCard" className="flex flex-col bg-card rounded-lg shadow-lg p-8">
                <div className="flex flex-row space-x-8">
                    <Image
                        src={'/static/Profile.webp'} 
                        className="rounded-2xl"
                        width={300}
                        height={300}
                        alt={"profile picture"}
                    />
                    <div className="flex flex-col h-full">
                        {/* Description */}
                        <div className="prose prose-lg">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                { aboutMe.content }
                            </ReactMarkdown>
                            <p className="font-bold text-accent pt-2">
                                Rhett   
                            </p>
                        </div>
                            
                        {/* Socials */}
                        <div className="flex-none flex flex-row space-x-4 justify-end items-center pt-2">
                            <Image  src={'/static/mail.png'} 
                                    width={25} height={25} 
                                    alt="email" 
                            />
                            <Image src={ '/static/Instagram_Logo.png' } 
                                width={23} height={23}
                                alt='Link to Instagram page'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About