import { connectDb } from "./connection";
import { IngredientDAO } from "./DAO/IngredientDAO";

export async function databaseConnectionFunction() {
  return connectDb();
}

export default {
  ingredientDAO: new IngredientDAO(),
}