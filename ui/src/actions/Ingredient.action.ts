import { makeGetRequest, makePostRequest, makePutRequest } from ".";
import type { IngredientInsertOrUpdateRequest, IngredientRecord, IngredientUXRecord } from "../shared/types/ingredient";

export const loadIngredients = async () => {
    const ingredients = await makeGetRequest<IngredientRecord[]>('/ingredient');
    console.log(ingredients);
    return ingredients;
};

export const loadIngredientUXById = async (id: number) => {
    const ingredient = await makeGetRequest<IngredientUXRecord>(`/ingredient/${id}`);
    console.log(ingredient);
    return ingredient;
};

export const loadRecentIngredients = async () => {
    const recentItems = await makeGetRequest<IngredientRecord[]>('/ingredient/recent');
    console.log(recentItems);
    return recentItems;
};

export const updateIngredient = async (id: number, ingredient: IngredientInsertOrUpdateRequest) => {
    const updatedIngredient = await makePutRequest<IngredientRecord>('/ingredient', {
        name: ingredient.name,
        category: ingredient.category,
        default_measurement_unit: ingredient.default_measurement_unit,
        created_by: ingredient.created_by,
    });
    console.log(id, "updatedIngredient", updatedIngredient);
    return updatedIngredient;
};

export const createIngredient = async (ingredient: IngredientInsertOrUpdateRequest) => {
    const newIngredient = await makePostRequest<IngredientRecord>('/ingredient', {
        name: ingredient.name,
        category: ingredient.category,
        default_measurement_unit: ingredient.default_measurement_unit,
        created_by: ingredient.created_by,
    });
    console.log(newIngredient);
    return newIngredient;
};