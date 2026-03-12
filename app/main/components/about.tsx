import { aboutMe } from "@/app/config"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import Image from "next/image"
import { Button } from "@/app/components/button"
import Link from "next/link"

const AboutMe = () => {

    return (
        <div className="w-full h-full flex justify-center bg-card p-8 rounded-lg">
                
                    <Image
                        src={'/static/Profile.webp'} 
                        className="rounded-2xl"
                        width={250}
                        height={200}
                        alt={"profile picture"}
                    />

                    {/* Content */}
                    <div className="flex flex-col h-full ml-10">
                        {/* Description */}
                        <div className="prose prose-lg">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{ aboutMe.blurb }</ReactMarkdown>
                            <Link href={`/about`} className="no-underline">
                                <Button message={"Learn more"} />
                            </Link>
                        </div>
                    </div>
            </div>
    )
}

export default AboutMe