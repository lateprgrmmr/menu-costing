import { validateRequestPayload } from "./utils";
import { UnitMeasurementDefinition, UnitMeasurementEnum, UnitTypeDefinition, UnitTypeEnum } from "./common";
import * as t from "io-ts";

export type IngredientCategoryType =
    | "bread"
    | "dairy"
    | "grocery"
    | "meat"
    | "other"
    | "produce"
    | "recipe"
    | "spice";

export enum IngredientCategoryEnum {
    BREAD = "bread",
    DAIRY = "dairy",
    GROCERY = "grocery",
    MEAT = "meat",
    OTHER = "other",
    PRODUCE = "produce",
    RECIPE = "recipe",
    SPICE = "spice",
}

export const IngredientCategoryValueLookup = {
    [IngredientCategoryEnum.BREAD]: "Bread",
    [IngredientCategoryEnum.DAIRY]: "Dairy",
    [IngredientCategoryEnum.GROCERY]: "Grocery",
    [IngredientCategoryEnum.MEAT]: "Meat",
    [IngredientCategoryEnum.PRODUCE]: "Produce",
    [IngredientCategoryEnum.OTHER]: "Other",
    [IngredientCategoryEnum.RECIPE]: "Recipe",
    [IngredientCategoryEnum.SPICE]: "Spice",
}

const IngredientCategoryDefinition = t.keyof({
    bread: null,
    dairy: null,
    grocery: null,
    meat: null,
    produce: null,
    other: null,
    recipe: null,
    spice: null,
})


export type IngredientRecord = {
    id: number;
    name: string;
    category: IngredientCategoryEnum | null;
    default_measurement_unit: UnitMeasurementEnum | null;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

const IngredientInsertOrUpdateRequestTypeDefinition = {
    name: t.string,
    category: IngredientCategoryDefinition,
    default_measurement_unit: UnitMeasurementDefinition,
    created_by: t.number,
}

const IngredientInsertOrUpdateRequestType = t.type(IngredientInsertOrUpdateRequestTypeDefinition);

export interface IngredientInsertOrUpdateRequest extends t.TypeOf<typeof IngredientInsertOrUpdateRequestType > {
    category: IngredientCategoryEnum;
    default_measurement_unit: UnitMeasurementEnum;
}

export class IngredientInsertOrUpdateRequest {
    public static fromRequest = validateRequestPayload<IngredientInsertOrUpdateRequest>(IngredientInsertOrUpdateRequestType);
}


export interface RecipeIngredientRecord {
    recipe_id: number;
    recipe_name: string;
    quantity: number;
    unit: UnitTypeEnum;
}
export interface IngredientUXRecord extends IngredientRecord {
    oz_to_fl_oz: number;
    oz_to_tbsp: number;
    oz_to_cup: number;
    purchases: Partial<IngredientPurchaseRecord>[];
    recipes: RecipeIngredientRecord[];
}

export interface IngredientDensityRecord {
    ingredient_id: number;
    oz_to_fl_oz: number;
    oz_to_tbsp: number;
    oz_to_cup: number;
}

const IngredientDensityInsertOrUpdateRequestTypeDefinition = {
    ingredient_id: t.number,
    oz_to_fl_oz: t.number,
    oz_to_tbsp: t.number,
    oz_to_cup: t.number,
}

const IngredientDensityInsertOrUpdateRequestType = t.type(IngredientDensityInsertOrUpdateRequestTypeDefinition);

export class IngredientDensityInsertOrUpdateRequest {
    public static fromRequest = validateRequestPayload<IngredientDensityInsertOrUpdateRequest>(IngredientDensityInsertOrUpdateRequestType);
}
export interface IngredientPurchaseRecord {
    ingredient_id: number;
    vendor: string;
    vendor_item_number: string;
    price: number;
    purchase_unit: UnitTypeEnum;
    purchase_quantity: number;
    created_at: Date;
    updated_at: Date;
}

const IngredientPurchaseInsertOrUpdateRequestTypeDefinition = {
    ingredient_id: t.number,
    vendor: t.string,
    vendor_item_number: t.string,
    price: t.number,
    purchase_unit: UnitTypeDefinition,
    purchase_quantity: t.number,
}

const IngredientPurchaseInsertOrUpdateRequestType = t.type(IngredientPurchaseInsertOrUpdateRequestTypeDefinition);

export class IngredientPurchaseInsertOrUpdateRequest {
    public static fromRequest = validateRequestPayload<IngredientPurchaseInsertOrUpdateRequest>(IngredientPurchaseInsertOrUpdateRequestType);
}