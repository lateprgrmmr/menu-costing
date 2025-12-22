import { connectDb } from "./connection";
import { IngredientDAO } from "./DAO/IngredientDAO";
import { RecipeDAO } from "./DAO/RecipeDAO";

export async function databaseConnectionFunction() {
  return connectDb();
}

export default {
  ingredientDAO: new IngredientDAO(),
  recipeDAO: new RecipeDAO(),
}