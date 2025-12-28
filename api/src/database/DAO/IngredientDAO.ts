import { IngredientDensityInsertOrUpdateRequest, IngredientDensityRecord, IngredientInsertOrUpdateRequest, IngredientPurchaseInsertOrUpdateRequest, IngredientPurchaseRecord, IngredientRecord, IngredientUXRecord } from "src/shared/types/ingredient";
import { Connection } from "../connection";
import { BaseDAO } from "../types";

export class IngredientDAO extends BaseDAO<IngredientRecord> {
    protected getTableName(): string {
        return "ingredient";
    }

    async findAll(db: Connection): Promise<IngredientRecord[]> {
        return await this.find(db, {});
    }

    async findIngredientById(db: Connection, id: number): Promise<IngredientRecord | null> {
        // get object with all related data
        return await this.findById(db, id);
    }

    async createNewIngredient(
        db: Connection,
        ingredient: IngredientInsertOrUpdateRequest
    ): Promise<IngredientRecord> {
        return await this.insert(db, ingredient);
    }

    async findIngredientUXById(db: Connection, id: number): Promise<IngredientUXRecord | null> {
        const result = await this.executeScript(db, 'getIngredientUX', { ingredientId: id });
        if (!result || result.length === 0) {
            return null;
        }
        return result[0];
    }
}

export class IngredientDensityDAO extends BaseDAO<IngredientDensityRecord> {
    protected getTableName(): string {
        return "ingredient_density";
    }
    async createNewIngredientDensity(
        db: Connection,
        ingredientDensity: IngredientDensityInsertOrUpdateRequest
    ): Promise<IngredientDensityRecord> {
        return await this.insert(db, ingredientDensity);
    }
}

export class IngredientPurchaseDAO extends BaseDAO<IngredientPurchaseRecord> {
    protected getTableName(): string {
        return "ingredient_purchase";
    }
    async createNewIngredientPurchase(
        db: Connection,
        ingredientPurchase: IngredientPurchaseInsertOrUpdateRequest
    ): Promise<IngredientPurchaseRecord> {
        return await this.insert(db, ingredientPurchase);
    }
}