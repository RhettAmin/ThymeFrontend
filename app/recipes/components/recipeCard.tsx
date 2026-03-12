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
            return `${time / 60} hours`
        } else if (time === 60) {
            return `${time / 60} hour`
        } else {
            return `${time} minutes`
        }
    }

    return (
        <div className="relative w-[25rem] min-h-[33rem] flex flex-col col-span-1 group bg-card rounded-lg shadow-md border-2 p-3 flex flex-col">
            <div className="h-[35rem] border-2 border-ThymePrimary h-full bg-background rounded-lg">
               
                {/* Name */}
                <div className="border-2 border-ThymePrimary bg-ThymePrimary h-8 -mx-2 -mt-2 px-2 rounded-[0.65vw]">
                        <p className={`font-bold justify-center text-center ${ getFontSize(recipeName) }`}>{ recipeName }</p>
                </div>

                {/* Image placeholder */}
                <div className="bg-red-200 h-60 flex items-center justify-center">
                    <Link className="w-full h-full" href={`/recipe?recipeId=${recipeId}`}>
                    {
                        mainImageLink ?
                        <Image className="w-full h-full object-fill" src={ mainImageLink } 
                            width={500} height={500} alt={ "Image of the Recipe, plated nicely" } 
                            loading="eager"
                        /> :
                        <p className="w-full h-full bg-red-200 flex items-center justify-center">Image</p>
                    }
                    </Link>
                </div>

                <div className="min-h-full flex flex-col flex-1 pt-2">
                    <div className="border-2 border-thymeButton -mx-2 -mt-2 px-2 rounded-[0.65vw] hover:border-thymeButtonHover">
                        <div className="bg-gradient-to-r from-thymeButton to-thymeButton hover:from-thymeButtonHover hover:to-thymeButton transition-all duration-250 -mx-2 px-2 text-center  hover:text-white rounded-md">
                            <Link href={`/recipe?recipeId=${recipeId}`}>
                                <p className="font-bold">Cook it!</p>
                            </Link>
                        </div>
                    </div>
                    <div className="min-h-[12.5rem] flex flex-col flex-1 space-y-2 px-2 bg-ThymebackgroundGreen rounded-b-lg">
                        <div className="border-b-1 pb-1 border-black">
                            <p>{ tags.join(", ") }</p>
                        </div>
                        
                        <div className="">
                            <p className="rounded-lg">{ description }</p>
                        </div>

                        <div className="absolute right-1 bottom-1 border-2 border-ThymeRootPurple px-2 
                            bg-ThymeRootPurple rounded-lg shadow-md">
                            <div className=" flex flex-row justify-between">
                                <p>{ convertTime(timeToPlate) }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}