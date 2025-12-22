import { makeGetRequest } from ".";
import type { RecipeUXRecord } from "../shared/types/recipe";

export const getRecipe = async (recipeId: number) => { 
    console.log('recipeId', recipeId)
    const response = await makeGetRequest<RecipeUXRecord>(`/recipe/${recipeId}`);
    console.log('response', response)
    return response;
}