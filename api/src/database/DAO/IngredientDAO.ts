import { IngredientInsertOrUpdateRequest, IngredientRecord } from "src/shared/types/ingredient";
import { Connection } from "../connection";
import { BaseDAO } from "../types";

export class IngredientDAO extends BaseDAO<IngredientRecord> {
    protected getTableName(): string {
        return "ingredient";
    }

    async findAll(db: Connection): Promise<IngredientRecord[]> {
        return await this.find(db, {});
    }

    async findById(db: Connection, id: number): Promise<IngredientRecord | null> {
        return await this.findById(db, id);
    }

    async create(db: Connection, ingredient: IngredientInsertOrUpdateRequest): Promise<IngredientRecord> {
        return await this.create(db, ingredient);
    }

}   
