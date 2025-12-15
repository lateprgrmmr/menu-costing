import { makeGetRequest } from ".";
import type { IngredientRecord } from "../shared/types/ingredient";

export const loadIngredients = async () => { 
    const ingredients = await makeGetRequest<IngredientRecord[]>('/ingredient');
    console.log(ingredients);
    return ingredients;
};