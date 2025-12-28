import { Connection } from "src/database/connection";
import { IngredientInsertOrUpdateRequest } from "src/shared/types/ingredient";
import daos from "../../database";

export function createNewIngredient(db: Connection, ingredient: IngredientInsertOrUpdateRequest) { 
    return daos.ingredientDAO.createNewIngredient(db, ingredient);
}

export function getIngredientUXById(db: Connection, id: number) {
    return daos.ingredientDAO.findIngredientUXById(db, id);
}