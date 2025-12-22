import { UnitTypeEnum } from "./common";

export enum RecipeTypeEnum {
    INGREDIENT = "ingredient",
    PREP_RECIPE = "prep_recipe",
}

export interface RecipeRecord {
    id: number;
    name: string;
    type: RecipeTypeEnum;
    yield_oz: number;
    created_at: Date;
    updated_at: Date;
}

export interface RecipeIngredientRecord {
    ingredient_id: number;
    quantity: number;
    unit: UnitTypeEnum;
    ingredient_name: string;
}

export interface RecipeUXRecord {
    id: number;
    name: string;
    // type: RecipeTypeEnum;
    yield_oz: number;
    created_at: Date;
    updated_at: Date;
    ingredients: RecipeIngredientRecord[];
}