import Link from "next/link"
import Image from 'next/image'

type RecipeCardInput =  {
    recipeId: string
    recipeName: string
    mainImageLink: string | undefined
    tags: string[]
    description: string
    timeToPlate: number
}

export const RecipeCard = ({ recipeId, recipeName, mainImageLink, tags, description, timeToPlate } : RecipeCardInput) => {

    const getFontSize = (text: string) => {
        const length = text.length;
        if (length < 15) return 'text-lg'
        if (length < 30) return 'text-base'
        if (length < 50) return 'text-sm pt-1'
        return 'text-base'
    }

    const convertTime = (time: number): string => {
        if (time > 60) {
            return `${Math.round(time / 60)} hrs`
        } else if (time === 60) {
            return `${time / 60} hr`
        } else {
            return `${time} mins`
        }
    }

    return (
        <div className="relative w-full h-full min-h-0 flex flex-col group bg-black rounded-lg shadow-md border-2 p-3">
            <div className="flex flex-col flex-1 min-h-0 bg-brand-soft rounded-lg">
               
                {/* Name */}
                <div className="shrink-0 flex flex-row justify-between border-4 border-brand mx-1 mt-2 px-2 py-1 rounded-2xl bg-surface-sunken">
                    <p className={`font-bold justify-center text-center ${ getFontSize(recipeName) }`}>{ recipeName }</p>
                    <div className="flex flex-row justify-between gap-x-1">
                        {/* badges */}
                        <div className="rounded-full bg-brand px-1.5 w-6 h-6">
                            V
                        </div>
                        <p>{ convertTime(timeToPlate) }</p>
                    </div>
                </div>

                {/* Image placeholder */}
                <div className="relative flex-[2] min-h-0 border-4 border-brand -mt-1 mx-2 bg-red-200">
                    <Link className="relative block w-full h-full" href={`/recipe?recipeId=${recipeId}`}>
                    {
                        mainImageLink ?
                        <Image className="object-cover" src={mainImageLink} loading={"eager"} fill={true} sizes="(max-width: 1080px), 500px" alt={`${recipeName}, plated`} /> :
                        <p className="w-full h-full bg-red-200 flex items-center justify-center">Image</p>
                    }
                    </Link>
                </div>

                <div className="flex flex-col flex-[2] min-h-0 px-2">
                    <div className="border-4 border-brand -mx-1 -mt-4 z-5 px-2 py-1 rounded-2xl bg-surface-sunken">
                        <div className="bg-surface-sunken px-2">
                            <p>{ tags.join(", ") }</p>
                        </div>
                    </div>
                    <div className="relative flex flex-col flex-1 space-y-2 px-1 -mt-1 mb-1 rounded-b-lg">
                        <div className="flex flex-col flex-1 min-h-0 space-y-2 py-3 px-4 border-4 border-brand bg-page">
                            <p className="rounded-lg text-[0.92rem] overflow-hidden">{ description }</p>
                        </div>
                        <div className="absolute bottom-0.25 right-0.25 px-2 py-0.5 bg-accent-mid hover:bg-accent-light hover:scale-105 transition-all duration-150 text-center rounded-md">
                            <Link href={`/recipe?recipeId=${recipeId}`}>
                                <p className="font-bold">Cook it!</p>
                            </Link>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}