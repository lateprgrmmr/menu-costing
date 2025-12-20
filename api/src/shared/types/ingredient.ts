import { validateRequestPayload } from "./utils";
import { UnitTypeEnum } from "./common";
import * as t from "io-ts";


export type IngredientRecord = {
    id: number;
    name: string;
    category: string | null;
    vendor: string;
    purchase_unit: UnitTypeEnum;
    purchase_quantity: number;
    purchase_cost: number;
    cost_per_oz: number;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

const IngredientInsertOrUpdateRequestTypeDefinition = {
    name: t.string,
    category: t.union([t.string, t.null]),
    vendor: t.string,
    purchase_unit: t.string,
    purchase_quantity: t.number,
    purchase_cost: t.number,
    cost_per_oz: t.number,
    created_by: t.number,
}

const IngredientInsertOrUpdateRequestType = t.type(IngredientInsertOrUpdateRequestTypeDefinition);

export interface IngredientInsertOrUpdateRequest extends t.TypeOf<typeof IngredientInsertOrUpdateRequestType > {
    name: string;
    category: string | null;
    vendor: string;
    purchase_unit: UnitTypeEnum;
    purchase_quantity: number;
    purchase_cost: number;
    cost_per_oz: number;
    created_by: number;
}

export class IngredientInsertOrUpdateRequest {
    public static fromRequest = validateRequestPayload<IngredientInsertOrUpdateRequest>(IngredientInsertOrUpdateRequestType);
}
