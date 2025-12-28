import {
    makeDeleteRequest,
    makeGetRequest,
    makePostRequest,
    makePutRequest,
} from ".";
import type {
    RecipeComponentInsertOrUpdateRequest,
    RecipeComponentRecord,
    RecipeInsertOrUpdateRequest,
    RecipeUXRecord
} from "../shared/types/recipe";

export const loadRecipe = async (recipeId: number) => {
    console.log('recipeId', recipeId)
    const response = await makeGetRequest<RecipeUXRecord>(`/recipe/${recipeId}`);
    console.log('response', response)
    return response;
}

export const loadRecipes = async () => {
    const response = await makeGetRequest<RecipeUXRecord[]>('/recipe');
    if (!response || response.length === 0) {
        return [];
    }
    return response;
}

export const createRecipe = async (recipe: RecipeInsertOrUpdateRequest) => {
    const response = await makePostRequest<RecipeUXRecord>('/recipe', {recipe});
    return response;
}

export const updateRecipe = async (recipeId: number, changes: RecipeInsertOrUpdateRequest) => {
    const response = await makePutRequest<RecipeUXRecord>(`/recipe/${recipeId}`, {changes});
    return response;
}

export const addRecipeComponent = async (ingredient: RecipeComponentInsertOrUpdateRequest | null) => {
    if (!ingredient) {
        return;
    }
    const data = {
        recipe_id: ingredient.recipe_id,
        ingredient_id: ingredient.ingredient_id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
    }
    const response = await makePostRequest<RecipeComponentRecord>(`/recipe/component`, data);
    return response;
}

export const deleteRecipeComponent = async (componentId: number) => {
    console.log('deleteRecipeComponent', componentId);
    const response = await makeDeleteRequest<RecipeComponentRecord>(`/recipe/component/${componentId}`);
    return response;
}