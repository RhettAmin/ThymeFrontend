import { RecipeDTO } from './recipeDTO'; 

class Response {
    message: string = "";
    recipes: RecipeDTO[] = [];
    status_code: string = "";
}

export { Response }