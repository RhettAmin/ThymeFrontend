'use client'

import Image from "next/image"

export type MastheadProps = {
    name: string
    description: string
    tags: string[]
    heroImage: string
}

const Masthead = ({ name, description, tags, heroImage }: MastheadProps) => {

    return (
        <div className="grid grid-cols-1 grid-cols-[1fr_minmax(0,560px)] gap-10 items-start mt-4">

            <div className="pt-2">
                {/* Tag - To be moved/Changed */}
                {/* { recipe.tags.length > 0 && (
                    <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
                        { recipe.tags[0] }
                    </p>
                )} */}

                <h1 className="text-4xl lg:text-6xl font-black text-brand-dark">
                    { name }
                </h1>

                <p className="text-lg text-text-secondary mt-5 max-w-[60ch] leading-relaxed">
                    { description }
                </p>

                <div className="flex flex-row flex-wrap border-t border-brand-deep pt-4 gap-2 mt-6">
                    {
                        tags.map((tag: string) => (
                            <span key={tag} className="bg-brand-wash text-brand-deep text-sm px-4 py-1.5 rounded-full">
                                { tag }
                            </span>
                        ))
                    }
                </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-brand-wash shadow-sm">
                {
                    heroImage
                        ? <Image className="object-cover" src={heroImage} fill
                            sizes="(max-width: 1024px) 100vw, 560px"
                            alt={`${name}, plated`} priority />
                        : <div className="w-full h-full flex items-center justify-center">
                            <p className="text-xs tracking-[0.3em] text-brand uppercase">{ name }</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default Masthead
