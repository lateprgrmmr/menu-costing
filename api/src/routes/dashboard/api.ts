import { Connection } from "src/database/connection";
import daos from "../../database";

export async function getDashboardData(db: Connection) {
    const recipeCount = await daos.recipeDAO.count(db);
    const ingredientCount = await daos.ingredientDAO.count(db);
    // const menuItemCount = await daos.menuItemDAO.findAll(db);
    const prepRecipeCount = await daos.recipeDAO.count(db);
    const recentIngredients = await daos.ingredientDAO.findRecent(db);
    const recentPrepRecipes = await daos.recipeDAO.findRecent(db);

    return {
        recipeCount,
        ingredientCount,
        // menuItemCount,
        prepRecipeCount,
        recentIngredients,
        recentPrepRecipes,
    }
}