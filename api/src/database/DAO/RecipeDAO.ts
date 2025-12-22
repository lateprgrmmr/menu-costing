import { RecipeRecord, RecipeUXRecord } from "src/shared/types/recipe";
import { Connection } from "../connection";
import { BaseDAO } from "../types";

export class RecipeDAO extends BaseDAO<RecipeRecord> {
    protected getTableName(): string {
        return "prep_recipe";
    }

    async findRecent(db: Connection): Promise<RecipeRecord[]> {
        return await this.executeScript(db, "findRecentRecipes", {});
    }

    async findAll(db: Connection): Promise<RecipeRecord[]> {
        return await this.find(db, {});
    }

    async findRecipeUX(db: Connection, id: number): Promise<RecipeUXRecord | null> {
        const results = await this.executeScript(db, "getRecipeUX", { id });
        console.log('results from dao', results)
        return results[0] || null;
    }
}