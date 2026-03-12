
import { Recipe } from "@/app/models/recipe"
import { RecipeCard } from "./recipeCard"

export type RecipeCardsProps = {
    recipePageWindow: Recipe[]
}

const RecipeListDisplay = ({recipePageWindow}: RecipeCardsProps) => {

    return (
        <div className="grid grid-cols-3 w-3/5 h-full items-center gap-8 px-4">
            {
                recipePageWindow.map((recipe: Recipe, index: number) =>  (
                    <RecipeCard 
                        key={index} 
                        recipeId={ recipe.recipeId }
                        recipeName={ recipe.name } 
                        mainImageLink= { recipe.mainImage ?? undefined }
                        tags={ recipe.tags } 
                        description={ recipe.description } 
                        timeToPlate={ recipe.timeToPlate } 
                    />
                ))
            }
        </div>
    )
}

export default RecipeListDisplay