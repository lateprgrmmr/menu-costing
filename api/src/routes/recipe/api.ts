import { Connection } from "src/database/connection";
import daos from "../../database";
import { RecipeInsertOrUpdateRequest, RecipeUXRecord } from "src/shared/types/recipe";

export const getAllRecipeUX = async (db: Connection) => {
    const recipes = await daos.recipeDAO.findRecipeUX(db);
    console.log('recipes', JSON.stringify(recipes, null, 2))
    return recipes;
}

export const getRecipeUXById = async (db: Connection, id: number) => {
    return await daos.recipeDAO.findRecipeUXById(db, id);
}

export const deleteRecipeComponentById = async (db: Connection, id: number) => {
    return await daos.recipeComponentDAO.deleteRecipeComponentByIngredientId(db, id);
}

export const createNewRecipe = async (db: Connection, recipe: RecipeInsertOrUpdateRequest): Promise<RecipeUXRecord> => {
    return await daos.recipeDAO.createNewRecipe(db, recipe);
}

export const updateRecipe = async (db: Connection, id: number, recipe: RecipeInsertOrUpdateRequest): Promise<RecipeUXRecord> => {
    return await daos.recipeDAO.updateRecipeById(db, id, recipe);
}