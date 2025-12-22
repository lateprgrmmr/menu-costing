import { makeGetRequest, makePostRequest, makePutRequest } from ".";
import type { IngredientInsertOrUpdateRequest, IngredientRecord } from "../shared/types/ingredient";

export const loadIngredients = async () => {
    const ingredients = await makeGetRequest<IngredientRecord[]>('/ingredient');
    console.log(ingredients);
    return ingredients;
};

export const loadRecentIngredients = async () => {
    const recentItems = await makeGetRequest<IngredientRecord[]>('/ingredient/recent');
    console.log(recentItems);
    return recentItems;
};

export const loadIngredientById = async (id: number) => {
    const ingredient = await makeGetRequest<IngredientRecord>(`/ingredient/${id}`);
    console.log(ingredient);
    return ingredient;
};

export const updateIngredient = async (id: number, ingredient: IngredientInsertOrUpdateRequest) => {
    const updatedIngredient = await makePutRequest<IngredientRecord>('/ingredient', {
        name: ingredient.name,
        category: ingredient.category,
        vendor: ingredient.vendor,
        purchase_unit: ingredient.purchase_unit,
        purchase_quantity: ingredient.purchase_quantity,
        purchase_cost: ingredient.purchase_cost,
        cost_per_oz: ingredient.cost_per_oz,
        created_by: ingredient.created_by,
    });
    console.log(id, "updatedIngredient", updatedIngredient);
    return updatedIngredient;
};

export const createIngredient = async (ingredient: IngredientInsertOrUpdateRequest) => {
    const newIngredient = await makePostRequest<IngredientRecord>('/ingredient', {
        name: ingredient.name,
        category: ingredient.category,
        vendor: ingredient.vendor,
        purchase_unit: ingredient.purchase_unit,
        purchase_quantity: ingredient.purchase_quantity,
        purchase_cost: ingredient.purchase_cost,
        cost_per_oz: ingredient.cost_per_oz,
        created_by: ingredient.created_by,
    });
    console.log(newIngredient);
    return newIngredient;
};