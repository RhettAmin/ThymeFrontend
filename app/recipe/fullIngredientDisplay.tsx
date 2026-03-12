export type FullIngredientProps = {
    ingredientList: string[]
}
const IngredientSectionDisplay = ({ingredientList}: FullIngredientProps) => {

    return (
        <div>
            <ul className="grid grid-cols-3 flex justify-right p-4 mx-4 mt-4 ">
                { 
                    ingredientList.map((ingredient: string, index: number) => {
                        const ingredientSplit = ingredient.split(" ")
                        return (
                            <li key={ index } className="flex flex-row">
                                <p className="prose prose-lg text-black">{ ingredient }</p>
                            </li>
                        )
                    }
                    
                )
                }
            </ul>
        </div>
    )
}

export default IngredientSectionDisplay